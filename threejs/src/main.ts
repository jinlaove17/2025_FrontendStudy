import { OrbitControls, RGBELoader } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

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
    this.camera.position.z = 2;

    new OrbitControls(this.camera, this.domApp as HTMLElement);
  }

  private setupLight() {
    // const color = 0xffffff;
    // const intensity = 1;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(-1, 2, 4);
    // this.scene.add(light);

    /// HDRI
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load("./qwantani_noon_puresky_4k.hdr", (envMap) => {
      envMap.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.background = envMap;
      this.scene.environment = envMap;
    });
  }

  private async setupModels() {
    // 광원의 영향을 받지 않는 재질
    // const material = new THREE.MeshBasicMaterial({
    //   color: 0xffffff,
    //   wireframe: false,

    //   visible: true,
    //   transparent: true,
    //   opacity: 0.2, // transparent가 true일 때 동작
    //   depthTest: true,
    //   depthWrite: true,
    //   side: THREE.FrontSide,
    // });

    // 정점에서 광원의 영향을 계산하는 재질
    // const material = new THREE.MeshLambertMaterial({
    //   color: 0xffffff,
    //   wireframe: false,

    //   visible: true,
    //   transparent: false,
    //   opacity: 0.2, // transparent가 true일 때 동작
    //   depthTest: true,
    //   depthWrite: true,
    //   side: THREE.FrontSide,
    // });

    // 픽셀 단위로 광원의 영향을 계산하는 재질
    // const material = new THREE.MeshPhongMaterial({
    //   color: 0xffffff,
    //   emissive: 0x00aa12,
    //   specular: 0xffffff,
    //   shininess: 24,
    //   flatShading: false,
    //   wireframe: false,

    //   visible: true,
    //   transparent: false,
    //   opacity: 0.2, // transparent가 true일 때 동작
    //   depthTest: true,
    //   depthWrite: true,
    //   side: THREE.FrontSide,
    // });

    // PRB(Physically Based Rendering) 재질
    // 거칠기와 금속성을 제공하는 재질
    // const material = new THREE.MeshStandardMaterial({
    //   color: "#0a10cd",
    //   emissive: 0x000000,
    //   roughness: 0,
    //   metalness: 0,
    //   flatShading: true,
    //   wireframe: false,

    //   visible: true,
    //   transparent: false,
    //   opacity: 0.2, // transparent가 true일 때 동작
    //   depthTest: true,
    //   depthWrite: true,
    //   side: THREE.FrontSide,
    // });

    // PRB(Physically Based Rendering) 재질
    // 코팅, 굴절율을 고려한 투명도, 옷감(페브릭), 비눗방울 효과 등을 제공하는 재질
    // 연산량이 많아 다른 재질에 비해 느림
    const material = new THREE.MeshPhysicalMaterial({
      color: "#0a10cd",
      emissive: 0x000000,
      roughness: 0,
      metalness: 0,
      flatShading: false,
      wireframe: false,

      // 표면 코팅 효과 관련
      clearcoat: 0,
      clearcoatRoughness: 0,

      // 유리 효과 관련
      transmission: 1,
      ior: 1.5,
      thickness: 0.1,

      // 옷감, 패브릭 관련
      sheen: 0,
      sheenRoughness: 0,
      sheenColor: 0xffffff,

      // 비눗방울 표면 관련
      iridescence: 0,
      iridescenceIOR: 0,
      iridescenceThicknessRange: [100, 800],

      visible: true,
      transparent: false,
      opacity: 1, // transparent가 true일 때 동작
      depthTest: true,
      depthWrite: true,
      side: THREE.FrontSide,
    });

    const gemoetryCylinder = new THREE.CylinderGeometry(0.6, 0.9, 1.2, 64, 1);
    const cylinder = new THREE.Mesh(gemoetryCylinder, material);
    cylinder.position.x = -1;
    this.scene.add(cylinder);

    const geometryTorusknot = new THREE.TorusKnotGeometry(0.4, 0.18, 128, 64);
    const torusknot = new THREE.Mesh(geometryTorusknot, material);
    torusknot.position.x = 1;
    this.scene.add(torusknot);

    const gui = new GUI();
    gui.addColor(material, "color").onChange((v) => (material.color = v));
    gui.addColor(material, "emissive").onChange((v) => (material.emissive = v));
    gui.add(material, "roughness", 0, 1, 0.01);
    gui.add(material, "metalness", 0, 1, 0.01);
    gui.add(material, "clearcoat", 0, 1, 0.01);
    gui.add(material, "clearcoatRoughness", 0, 1, 0.01);
    gui.add(material, "transmission", 0, 1, 0.01);
    gui.add(material, "ior", 1, 2.333, 0.01);
    gui.add(material, "thickness", 0, 10, 0.01);
    gui.add(material, "sheen", 0, 1, 0.01);
    gui.add(material, "sheenRoughness", 1, 2.333, 0.01);
    gui.add(material, "thickness", 0, 10, 0.01);
    gui
      .addColor(material, "sheenColor")
      .onChange((v) => (material.sheenColor = v));
    gui.add(material, "iridescence", 0, 10, 0.01);
    gui.add(material, "iridescenceIOR", 1, 2.333, 0.01);
    gui.add(material.iridescenceThicknessRange, "0", 1, 1000, 1);
    gui.add(material.iridescenceThicknessRange, "1", 1, 1000, 1);
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
  }

  private render(time: number) {
    this.update(time);

    // time: 첫 렌더링이 시작 된 이후 경과한 시간(단위: ms)
    this.renderer.render(this.scene, this.camera!);
  }
}

const app = new App();
