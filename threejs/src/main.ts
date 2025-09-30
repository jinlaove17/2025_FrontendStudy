import {
  Font,
  OrbitControls,
  TextGeometry,
  TTFLoader,
} from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

interface IGeometryHelper {
  createGeometry: () => THREE.BufferGeometry; // 지오메트리 객체를 생성해서 반환
  createGUI: (update: () => void) => void; // UI를 생성하는 함수
}

class BoxGeometryHelper implements IGeometryHelper {
  private args = {
    width: 1,
    height: 1,
    depth: 1,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
  };

  public createGeometry() {
    return new THREE.BoxGeometry(
      this.args.width,
      this.args.height,
      this.args.depth,
      this.args.widthSegments,
      this.args.heightSegments,
      this.args.depthSegments
    );
  }

  public createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "width", 0.1, 10, 0.01).onChange(update);
    gui.add(this.args, "height", 0.1, 10, 0.01).onChange(update);
    gui.add(this.args, "depth", 0.1, 10, 0.01).onChange(update);
    gui.add(this.args, "widthSegments", 0.1, 10, 0.01).onChange(update);
    gui.add(this.args, "heightSegments", 0.1, 10, 0.01).onChange(update);
    gui.add(this.args, "depthSegments", 0.1, 10, 0.01).onChange(update);
  }
}

class CircleGeometryHelper implements IGeometryHelper {
  private args = {
    radius: 1,
    segments: 32,
    thetaStart: 0,
    thetaLength: 360,
  };

  public createGeometry() {
    return new THREE.CircleGeometry(
      this.args.radius,
      this.args.segments,
      THREE.MathUtils.degToRad(this.args.thetaStart),
      THREE.MathUtils.degToRad(this.args.thetaLength)
    );
  }

  public createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "radius", 0.1, 1, 0.01).onChange(update);
    gui.add(this.args, "segments", 1, 64, 1).onChange(update);
    gui.add(this.args, "thetaStart", 0, 360, 0.1).onChange(update);
    gui.add(this.args, "thetaLength", 0, 360, 0.1).onChange(update);
  }
}

class TextGeometryHelper implements IGeometryHelper {
  // TextGeometry는 ExtrudeGeometry를 상속 받는 파생 클래스이다.
  private args = {
    text: "안녕하세요.",
    size: 0.5,
    height: 0.1,
    curveSegments: 2,
    bevelSegments: 3,
    bevelThickness: 0.1,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelEnabled: true,
  };

  private font: Font;

  constructor(font: Font) {
    this.font = font;
  }

  public createGeometry() {
    const geometry = new TextGeometry(this.args.text, {
      ...this.args,
      font: this.font,
    });

    geometry.center();
    geometry.scale(0.1, 0.1, 0.1);

    return geometry;
  }

  public createGUI(update: () => void) {
    const gui = new GUI();
    gui.add(this.args, "text").onChange(update);
    gui.add(this.args, "size", 0.1, 1, 0.01).onChange(update);
    gui.add(this.args, "height", 0.1, 1, 0.01).onChange(update);
    gui.add(this.args, "curveSegments", 1, 32, 1).onChange(update);
    gui.add(this.args, "bevelSegments", 1, 32, 1).onChange(update);
    gui.add(this.args, "bevelThickness", 0.01, 1, 0.001).onChange(update);
    gui.add(this.args, "bevelSize", 0.01, 1, 0.001).onChange(update);
    gui.add(this.args, "bevelOffset", -1, 1, 0.001).onChange(update);
    gui.add(this.args, "bevelEnabled").onChange(update);
  }
}

class App {
  private renderer: THREE.WebGLRenderer;
  private domApp: Element;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private cube?: THREE.Mesh;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    // 현재 디바이스의 픽셀 비율을 가져온다.
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

    this.domApp = document.querySelector("#app")!;
    this.domApp.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x00000000, 1, 3.5); // 씬에 안개를 추가한다.

    this.setupCamera();
    this.setupLight();
    this.setupHelper();
    this.setupModels();
    this.setupControl();
    this.setupEvents();
  }

  private setupCamera() {
    const width = this.domApp.clientWidth;
    const height = this.domApp.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.camera.position.z = 2;
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

  private setupHelper() {
    // 좌표축에 대한 헬퍼 객체
    const axes = new THREE.AxesHelper(10);
    this.scene.add(axes);

    const grid = new THREE.GridHelper(5, 20, 0xffffff, 0x444444);
    this.scene.add(grid);
  }

  private async setupModels() {
    const meshMaterial = new THREE.MeshPhongMaterial({
      color: 0x156289,
      flatShading: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });

    // const geometryHelper = new BoxGeometryHelper();
    // const geometryHelper = new CircleGeometryHelper();
    const json = await new TTFLoader().loadAsync("./GowunDodum-Regular.ttf");
    const font = new Font(json);
    const geometryHelper = new TextGeometryHelper(font);

    const createModel = () => {
      const geometry = geometryHelper.createGeometry();
      const mesh = new THREE.Mesh(geometry, meshMaterial);
      const line = new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry),
        lineMaterial
      );
      const group = new THREE.Group();
      group.name = "myModel";
      group.add(mesh, line);

      const oldGroup = this.scene.getObjectByName("myModel");
      if (oldGroup) {
        (oldGroup.children[0] as THREE.Mesh).geometry.dispose();
        (oldGroup.children[1] as THREE.LineSegments).geometry.dispose();
        this.scene.remove(oldGroup);
      }

      this.scene.add(group);
    };

    createModel();
    geometryHelper.createGUI(createModel);
  }

  private setupControl() {
    new OrbitControls(this.camera!, this.domApp! as HTMLElement);
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
