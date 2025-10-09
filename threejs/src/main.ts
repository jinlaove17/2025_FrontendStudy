import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

class App {
  private domApp: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private mixer?: THREE.AnimationMixer;
  private clock = new THREE.Clock();
  private playingAnimation?: THREE.AnimationAction;

  constructor() {
    console.log("Hello three.js");

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
    this.camera.position.set(0, 1.6, 1.5);

    const orbits = new OrbitControls(this.camera, this.domApp as HTMLElement);
    orbits.target.set(0, 1, 0);
    this.camera.lookAt(orbits.target);
  }

  private setupLight() {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }

  private setupModels() {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("./SWAT.glb", (data) => {
      this.scene.add(data.scene);

      const animationNames = data.animations.map((item) => item.name);
      console.log(animationNames);

      const gui = new GUI();
      const prop = {
        animationName: animationNames[0],
      };

      gui.add(prop, "animationName", animationNames).onChange((v) => {
        animationPlayer(v);
      });

      this.mixer = new THREE.AnimationMixer(data.scene);

      const animationPlayer = (animationName: string) => {
        const i = animationNames.indexOf(animationName);
        const clip = data.animations[i];
        const action = this.mixer!.clipAction(clip);

        if (this.playingAnimation) {
          // this.playingAnimation.stop();

          // 애니메이션 블렌딩
          this.playingAnimation.fadeOut(0.5);
        }
        this.playingAnimation = action;
        // action.play();
        action.reset().fadeIn(0.5).play();
      };

      animationPlayer(prop.animationName);
    });
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
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height);
  }

  private update(time: number) {
    time *= 0.001; // ms -> s

    const delta = this.clock.getDelta();
    if (this.mixer) {
      this.mixer.update(delta);
    }
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
