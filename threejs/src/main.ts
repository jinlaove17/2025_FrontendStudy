import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

class App {
  private renderer: THREE.WebGLRenderer;
  private domApp: Element;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    // 현재 디바이스의 픽셀 비율을 가져온다.
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    this.domApp = document.querySelector("#app")!;
    this.domApp.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.setupCamera();
    this.setupLight();
    this.setupModels();
    this.setupEvents();
  }

  private setupCamera() {
    const width = this.domApp.clientWidth;
    const height = this.domApp.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.camera.position.z = 10;

    new OrbitControls(this.camera, this.domApp as HTMLElement);
  }

  private setupLight() {
    const lights = [];
    for (let i = 0; i < 3; i++) {
      lights[i] = new THREE.DirectionalLight(0xffffff, 3);
      this.scene.add(lights[i]);
    }

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
  }

  private async setupModels() {
    // 좌표계 표시
    const axisHelper = new THREE.AxesHelper(10);
    this.scene.add(axisHelper);

    // 바닥 평면
    const geometryGround = new THREE.PlaneGeometry(5, 5);
    const materialGround = new THREE.MeshStandardMaterial();
    const ground = new THREE.Mesh(geometryGround, materialGround);
    ground.rotation.x = -THREE.MathUtils.degToRad(90);
    this.scene.add(ground);

    // 반 구
    const geometryBigSphere = new THREE.SphereGeometry(
      1,
      32,
      16,
      0,
      THREE.MathUtils.degToRad(360),
      0,
      THREE.MathUtils.degToRad(90)
    );
    const materialBigSphere = new THREE.MeshStandardMaterial();
    const bigSphere = new THREE.Mesh(geometryBigSphere, materialBigSphere);
    this.scene.add(bigSphere);

    // 작은 구
    const geometrySmallSphere = new THREE.SphereGeometry(0.2);
    const materialSmallSphere = new THREE.MeshStandardMaterial();
    const smallSphere = new THREE.Mesh(
      geometrySmallSphere,
      materialSmallSphere
    );

    // 작은 구의 공전을 위한 피벗
    const smallSpherePivot = new THREE.Object3D();
    smallSphere.position.x = 2;
    smallSpherePivot.add(smallSphere);
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(-45);
    smallSpherePivot.position.y = 0.5;
    smallSpherePivot.name = "smallSpherePivot";
    bigSphere.add(smallSpherePivot);

    // 도넛
    const itemCount = 8;
    const geometryTorus = new THREE.TorusGeometry(0.3, 0.1);
    const materialTorus = new THREE.MeshStandardMaterial();
    for (let i = 0; i < itemCount; i++) {
      const torus = new THREE.Mesh(geometryTorus, materialTorus);
      const torusPivot = new THREE.Object3D();
      bigSphere.add(torusPivot);
      torus.position.x = 2;
      torusPivot.position.y = 0.5;
      torusPivot.rotation.y = THREE.MathUtils.degToRad((360 / itemCount) * i);
      torusPivot.add(torus);
    }
  }

  private setupEvents() {
    window.onresize = this.resize.bind(this);
    this.resize();

    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  private resize() {
    const width = this.domApp.clientWidth;
    const height = this.domApp.clientHeight;

    const camera = this.camera;
    if (camera) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height);
  }

  private update(time: number) {
    time *= 0.001; // ms -> s

    const smallSpherePivot = this.scene.getObjectByName("smallSpherePivot");
    if (smallSpherePivot) {
      // Using Euler
      // smallSpherePivot.rotation.y = 2 * time;

      // Using quaternion
      const euler = new THREE.Euler(0, 2 * time, 0);
      smallSpherePivot.quaternion.setFromEuler(euler);

      // const quaternion = new THREE.Quaternion().setFromEuler(euler);
      // smallSpherePivot.setRotationFromQuaternion(quaternion);
    }
  }

  private render(time: number) {
    this.update(time);

    // time: 첫 렌더링이 시작 된 이후 경과한 시간(단위: ms)
    this.renderer.render(this.scene, this.camera!);
  }
}

const app = new App();
