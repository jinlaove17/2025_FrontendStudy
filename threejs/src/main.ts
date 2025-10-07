import {
  OrbitControls,
  RGBELoader,
  VertexNormalsHelper,
} from "three/examples/jsm/Addons.js";
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
    this.camera.position.z = 4;

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
    const textureLoader = new THREE.TextureLoader();
    const mapBaseColor = textureLoader.load("./Glass_Window_002_basecolor.jpg");
    mapBaseColor.colorSpace = THREE.SRGBColorSpace;

    const mapAmbientOcclusion = textureLoader.load(
      "./Glass_Window_002_ambientOcclusion.jpg"
    );
    const mapHeight = textureLoader.load("./Glass_Window_002_height.png");
    const mapNormal = textureLoader.load("./Glass_Window_002_normal.jpg");
    const mapRoughness = textureLoader.load("./Glass_Window_002_roughness.jpg");
    const mapMetalic = textureLoader.load("./Glass_Window_002_metallic.jpg");
    const mapAlpha = textureLoader.load("./Glass_Window_002_opacity.jpg");

    const material = new THREE.MeshStandardMaterial({
      map: mapBaseColor,
      aoMap: mapAmbientOcclusion,
      aoMapIntensity: 1.5,
      displacementMap: mapHeight,
      displacementScale: 0.2,
      displacementBias: -0.15,
      normalMap: mapNormal,
      normalScale: new THREE.Vector2(1, 1),
      roughnessMap: mapRoughness,
      roughness: 0.8,
      metalnessMap: mapMetalic,
      metalness: 0.9,
      alphaMap: mapAlpha,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const geometryBox = new THREE.BoxGeometry(1, 1, 1, 256, 256, 256);
    const box = new THREE.Mesh(geometryBox, material);
    box.position.x = -1;
    this.scene.add(box);

    const geometrySphere = new THREE.SphereGeometry(0.6, 512, 256);
    const sphere = new THREE.Mesh(geometrySphere, material);
    sphere.position.x = 1;
    this.scene.add(sphere);

    // const boxHelper = new VertexNormalsHelper(box, 0.1, 0xffff00);
    // this.scene.add(boxHelper);

    // const sphereHelper = new VertexNormalsHelper(sphere, 0.1, 0xffff00);
    // this.scene.add(sphereHelper);
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
