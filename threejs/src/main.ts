import { OrbitControls, RGBELoader } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

class App {
  private domApp: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;

  // private light?: THREE.DirectionalLight;
  // private lightHelper?: THREE.DirectionalLightHelper;

  // private light?: THREE.PointLight;
  // private lightHelper?: THREE.PointLightHelper;

  private light?: THREE.SpotLight;
  private lightHelper?: THREE.SpotLightHelper;

  constructor() {
    this.domApp = document.querySelector("#app")!;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
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
    new OrbitControls(this.camera, this.domApp as HTMLElement);
  }

  private setupLight() {
    // Directional Light
    // const light = new THREE.DirectionalLight(0xffffff, 5);
    // light.position.set(0, 3, 0);
    // light.target.position.set(0, 0, 0);
    // light.castShadow = true;
    // this.light = light;
    // this.scene.add(light);
    // // this.scene.add(light.target);

    // const helper = new THREE.DirectionalLightHelper(light);
    // this.lightHelper = helper;
    // this.scene.add(helper);

    // const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
    // light.shadow.camera.top = 5;
    // light.shadow.camera.bottom = -5;
    // light.shadow.camera.left = -5;
    // light.shadow.camera.right = 5;
    // light.shadow.camera.near = 0.5;
    // light.shadow.camera.far = 500;
    // light.shadow.mapSize.set(2048, 2048);
    // light.shadow.radius = 4;
    // this.scene.add(cameraHelper);

    // Point Light
    // const light = new THREE.PointLight(0xffffff, 5);
    // light.castShadow = true;
    // light.position.set(0, 5, 0);
    // light.distance = 10;
    // this.light = light;
    // this.scene.add(light);

    // const helper = new THREE.PointLightHelper(light);
    // this.lightHelper = helper;
    // this.scene.add(helper);

    // Spot Light
    const light = new THREE.SpotLight(0xffffff, 10);
    light.position.set(0, 2.5, 0);
    light.castShadow = true;
    light.target.position.set(0, 0, 0);
    light.angle = THREE.MathUtils.degToRad(30);
    light.penumbra = 0.1;
    this.light = light;
    this.scene.add(light);
    // this.scene.add(light.target);

    const helper = new THREE.SpotLightHelper(light);
    this.lightHelper = helper;
    this.scene.add(helper);

    const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
    light.shadow.mapSize.set(2048, 2048);
    light.shadow.radius = 4;
    this.scene.add(cameraHelper);
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
    ground.receiveShadow = true;
    this.scene.add(ground);

    // const geomBigSphere = new THREE.SphereGeometry(
    //   1,
    //   32,
    //   16,
    //   0,
    //   THREE.MathUtils.degToRad(360),
    //   0,
    //   THREE.MathUtils.degToRad(90)
    // );
    const geomBigTorusKnot = new THREE.TorusKnotGeometry(0.55, 0.15, 128, 64);
    geomBigTorusKnot.translate(0, 1, 0);
    const matBigSphere = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.1,
      metalness: 0.2,
    });
    const bigTorusKnot = new THREE.Mesh(geomBigTorusKnot, matBigSphere);
    bigTorusKnot.position.y = -0.5;
    bigTorusKnot.receiveShadow = true;
    bigTorusKnot.castShadow = true;
    this.scene.add(bigTorusKnot);

    const geomSmallSphere = new THREE.SphereGeometry(0.2);
    const matSmallSphere = new THREE.MeshStandardMaterial({
      color: "#e74c3c",
      roughness: 0.2,
      metalness: 0.5,
    });
    const smallSphere = new THREE.Mesh(geomSmallSphere, matSmallSphere);

    const smallSpherePivot = new THREE.Object3D();
    smallSpherePivot.add(smallSphere);
    bigTorusKnot.add(smallSpherePivot);
    smallSphere.position.x = 2;
    smallSphere.receiveShadow = true;
    smallSphere.castShadow = true;
    smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(-45);
    smallSpherePivot.position.y = 0.5;
    smallSpherePivot.name = "smallSpherePivot";

    // 새로운 빨간색 구를 추가함
    const smallSphere2 = new THREE.Object3D();
    const smallSpherePivot2 = new THREE.Object3D();
    smallSpherePivot2.add(smallSphere2);
    bigTorusKnot.add(smallSpherePivot2);
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

      bigTorusKnot.add(torusPivot);
      torus.position.x = 2;
      torus.receiveShadow = true;
      torus.castShadow = true;
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

      if (this.light! instanceof THREE.DirectionalLight) {
        smallSphere.getWorldPosition(this.light!.target.position);
        this.lightHelper!.update();
      } else if (this.light! instanceof THREE.PointLight) {
        smallSphere.getWorldPosition(this.light!.position);
        this.lightHelper!.update();
      } else if (this.light! instanceof THREE.SpotLight) {
        smallSphere.getWorldPosition(this.light!.target.position);
        this.lightHelper!.update();
      }
    }
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
