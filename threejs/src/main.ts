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
    const geometryBox = new THREE.BoxGeometry(1);
    const material = new THREE.MeshStandardMaterial();
    const box = new THREE.Mesh(geometryBox, material);

    box.position.y = 2;
    box.rotation.x = THREE.MathUtils.degToRad(45);
    box.scale.set(0.5, 0.5, 0.5);

    // 행렬로 구현해보기(적용 순서가 중요)
    // const matrixS = new THREE.Matrix4().makeScale(0.5, 0.5, 0.5);
    // const matrixR = new THREE.Matrix4().makeRotationX(
    //   THREE.MathUtils.radToDeg(45)
    // );
    // const maxtrixT = new THREE.Matrix4().makeTranslation(0, 2, 0);
    // box.applyMatrix4(matrixS);
    // box.applyMatrix4(matrixR);
    // box.applyMatrix4(maxtrixT);

    this.scene.add(box);

    const axesOfScene = new THREE.AxesHelper(10);
    this.scene.add(axesOfScene);

    const grid = new THREE.GridHelper(30, 30, 0xffffff, 0x444444);
    this.scene.add(grid);
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

    // const cube = this.scene.getObjectByName("myModel");
    // if (cube) {
    //   cube.rotation.x = time;
    //   cube.rotation.y = time;
    // }
  }

  private render(time: number) {
    this.update(time);

    // time: 첫 렌더링이 시작 된 이후 경과한 시간(단위: ms)
    this.renderer.render(this.scene, this.camera!);
  }
}

const app = new App();
