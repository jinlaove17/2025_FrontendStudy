import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

class App {
  private domApp: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;

  constructor() {
    this.domApp = document.querySelector("#app")!;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.domApp.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();

    this.setupCamera();
    this.setupLight();
    this.setupModels();
    this.setupEvents();
  }

  private setupCamera() {
    const domApp = this.domApp;
    const width = domApp.clientWidth;
    const height = domApp.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.camera.position.set(2, 2, 3.5);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    // new OrbitControls(this.camera, this.domApp as HTMLElement);
  }

  private setupLight() {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    this.scene.add(light);
  }

  private setupModels() {
    const axisHelper = new THREE.AxesHelper(10);
    this.scene.add(axisHelper);

    const geomGround = new THREE.PlaneGeometry(5, 5);
    const matGround = new THREE.MeshStandardMaterial({
      color: "#2c3e50",
      roughness: 0.5,
      metalness: 0.5,
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(geomGround, matGround);
    ground.rotation.x = -THREE.MathUtils.degToRad(90);
    ground.position.y = -0.5;
    this.scene.add(ground);

    const geomBigSphere = new THREE.SphereGeometry(
      1,
      32,
      16,
      0,
      THREE.MathUtils.degToRad(360),
      0,
      THREE.MathUtils.degToRad(90)
    );
    const matBigSphere = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.1,
      metalness: 0.2,
    });
    const bigSphere = new THREE.Mesh(geomBigSphere, matBigSphere);
    bigSphere.position.y = -0.5;
    this.scene.add(bigSphere);

    const geomSmallSphere = new THREE.SphereGeometry(0.2);
    const matSmallSphere = new THREE.MeshStandardMaterial({
      color: "#e74c3c",
      roughness: 0.2,
      metalness: 0.5,
    });
    const smallSphere = new THREE.Mesh(geomSmallSphere, matSmallSphere);

    const smallSpherePivot = new THREE.Object3D();
    smallSpherePivot.add(smallSphere);
    bigSphere.add(smallSpherePivot);
    smallSphere.position.x = 2;
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(-45);
    smallSpherePivot.position.y = 0.5;
    smallSpherePivot.name = "smallSpherePivot";

    // 새로운 빨간색 구를 추가함
    const smallSphere2 = new THREE.Object3D();
    const smallSpherePivot2 = new THREE.Object3D();
    smallSpherePivot2.add(smallSphere2);
    bigSphere.add(smallSpherePivot2);
    smallSphere2.position.x = 2;
    smallSpherePivot2.rotation.y = THREE.MathUtils.degToRad(-45);
    smallSpherePivot2.position.y = 0.5;
    smallSpherePivot2.name = "targetPivot";

    const cntItems = 8;
    const geomTorus = new THREE.TorusGeometry(0.3, 0.1);
    const matTorus = new THREE.MeshStandardMaterial({
      color: "#9b59b6",
      roughness: 0.5,
      metalness: 0.9,
    });
    for (let i = 0; i < cntItems; i++) {
      const torus = new THREE.Mesh(geomTorus, matTorus);
      const torusPivot = new THREE.Object3D();

      bigSphere.add(torusPivot);
      torus.position.x = 2;
      torusPivot.position.y = 0.5;
      torusPivot.rotation.y = (THREE.MathUtils.degToRad(360) / cntItems) * i;
      torusPivot.add(torus);
    }
  }

  private setupEvents() {
    window.onresize = this.resize.bind(this);
    this.resize();
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  private resize() {
    const domApp = this.domApp;
    const width = domApp.clientWidth;
    const height = domApp.clientHeight;

    const camera = this.camera;
    if (camera) {
      camera.aspect = width / height;
      // const aspect = width / height;
      // camera.left = -aspect;
      // camera.right = aspect;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height);
  }

  private update(time: number) {
    time *= 0.001; // ms -> s

    const smallSpherePivot = this.scene.getObjectByName("smallSpherePivot");
    if (smallSpherePivot) {
      // smallSpherePivot.rotation.y = time;
      const euler = new THREE.Euler(0, time, 0);
      const quaterion = new THREE.Quaternion().setFromEuler(euler);
      smallSpherePivot.setRotationFromQuaternion(quaterion);

      const smallSphere = smallSpherePivot.children[0];
      const smallSpherePos = new THREE.Vector3();
      smallSphere.getWorldPosition(smallSpherePos);

      // 카메라가 공을 포커스하게 만들기
      // this.camera?.lookAt(smallSpherePos);

      // 공 시점으로 카메라 배치하기
      const smallSpherePivot2 = this.scene.getObjectByName("targetPivot");
      if (smallSpherePivot2) {
        const euler2 = new THREE.Euler(
          0,
          time + THREE.MathUtils.degToRad(10),
          0
        );
        const quaterinon2 = new THREE.Quaternion().setFromEuler(euler2);
        smallSpherePivot2.setRotationFromQuaternion(quaterinon2);

        const nextPos = smallSpherePivot2.children[0];
        const cameraTarget = new THREE.Vector3();
        nextPos.getWorldPosition(cameraTarget);
        this.camera?.lookAt(cameraTarget);
        this.camera?.position.copy(smallSpherePos);
      }
    }
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
