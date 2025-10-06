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
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);

    /// HDRI
    // const rgbeLoader = new RGBELoader();
    // rgbeLoader.load("./qwantani_noon_puresky_4k.hdr", (envMap) => {
    //   envMap.mapping = THREE.EquirectangularReflectionMapping;
    //   this.scene.background = envMap;
    //   this.scene.environment = envMap;
    // });
  }

  private async setupModels() {
    const textureLoader = new THREE.TextureLoader();
    const toonTexture = textureLoader.load("./toon.png");
    toonTexture.minFilter = THREE.NearestFilter;
    toonTexture.magFilter = THREE.NearestFilter;

    const material = new THREE.MeshToonMaterial({
      gradientMap: toonTexture,
    });

    const gemoetryCylinder = new THREE.CylinderGeometry(0.6, 0.9, 1.2, 64, 1);
    const cylinder = new THREE.Mesh(gemoetryCylinder, material);
    cylinder.position.x = -1;
    this.scene.add(cylinder);

    const geometryTorusknot = new THREE.TorusKnotGeometry(0.4, 0.18, 128, 64);
    const torusknot = new THREE.Mesh(geometryTorusknot, material);
    torusknot.position.x = 1;
    this.scene.add(torusknot);
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
