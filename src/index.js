import * as THREE from "three";
import { MeshPhongMaterial, TubeGeometry } from "three";
//import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Toriod } from "./curve/Toriod";
import { Solenoid } from "./curve/Solenoid";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";

import { MagneticField } from "./MagneticField";

// initialize
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var setting = {
  grid: {
    enable: false,
    id: []
  },
  curve: {
    type: "SOLENIOD",
    id: 0
  }
};

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add controler
const controls = new OrbitControls(camera, renderer.domElement);
//const transform = new TransformControls(camera, renderer.domElement);

//add lights
const ambiant = new THREE.AmbientLight(0x404040);
const light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(5, 5, 5);

// set control poperties
controls.enableDamping = true;

// add mesh to the scene
scene.add(ambiant);
scene.add(light);

camera.position.set(5, 5, 5);

window.addEventListener("resize", onResize);

const stats = Stats();
document.body.appendChild(stats.dom);

animate();
updateScene();

//add gui
const gui = new GUI();
gui
  .add(setting.grid, "enable")
  .name("grid enable")
  .onChange((value) => {
    setting.grid.enable = value;
    updateScene();
  });
gui.add(setting, "curve", ["SOLENIOD", "TORIOD"]).onChange((value) => {
  setting.curve = value;
  updateScene();
});

function updateScene() {
  if (setting.grid.enable) {
    const grid = new THREE.GridHelper(10, 10);
    const axis = new THREE.AxesHelper(5);

    setting.grid.id = [grid.id, axis.id];

    scene.add(grid);
    scene.add(axis);
  } else {
    scene.remove(scene.getObjectById(setting.grid.id[0]));
    scene.remove(scene.getObjectById(setting.grid.id[1]));
  }

  const material = new MeshPhongMaterial({ color: "red" });

  let curve;
  switch (setting.curve.type) {
    case "SOLENIOD":
      curve = new Solenoid(10, 4, 2);
      break;

    case "TORIOD":
      curve = new Toriod(10, Math.PI * 2, 2, 0.5);
      break;

    default:
  }
  const tube = new THREE.Mesh(new TubeGeometry(curve, 500, 0.1, 8), material);

  scene.remove(scene.getObjectById(setting.curve.id));
  scene.add(tube);
}

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  stats.update();
  renderer.render(scene, camera);
}
