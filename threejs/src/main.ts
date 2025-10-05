import { OrbitControls } from "three/examples/jsm/Addons.js";
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
  }

  private async setupModels() {
    // 좌표계 표시
    const axisHelper = new THREE.AxesHelper(10);
    this.scene.add(axisHelper);

    const geometry = new THREE.SphereGeometry();
    geometry.deleteAttribute("uv");

    const texture = new THREE.TextureLoader().load("./circle.png"); // 이미지 url을 이용해서 텍스처 객체 생성
    const material = new THREE.PointsMaterial({
      color: "green",
      size: 0.1,
      sizeAttenuation: true, // 카메라에서 가까울수록 크게 표현
      map: texture,
      alphaTest: 0.5, // 이미지 픽셀 값의 알파 값이 이 값을 넘어야 렌더링
    });
    material.color = new THREE.Color("yellow"); // 생성 후 색상 변경
    const points = new THREE.Points(geometry, material);
    this.scene.add(points);

    const gui = new GUI();
    gui.add(material, "size", 0.1, 10, 0.01);
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
