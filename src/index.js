import * as THREE from "three";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";
import { Solenoid } from "./curve/Solenoid.js";
import { Toroid } from "./curve/Toroid.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { MagneticField } from "./MagneticField.js";

// initialize
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const stats = Stats();
document.body.appendChild(stats.dom);

var setting = {
  helper: {
    enable_grid: true,
    enable_axis: false
  },
  curve: {
    type: "soleniod",
    radius: 0.1
  }
};

const copper_material = new THREE.MeshPhongMaterial({ color: "orange" });

const solenoid = new Solenoid(10, 4, 2);
const toroid = new Toroid(70, Math.PI * 2, 0.5, 3);

const grid = new THREE.GridHelper(10, 10);
const axis = new THREE.AxesHelper(5);

const tube = new THREE.Mesh(
  new THREE.TubeGeometry(solenoid, 1000, 0.05, 10, false),
  copper_material
);

const gui = new GUI();

const solenoid_setting = gui.addFolder("Solenoid");
const toroid_setting = gui.addFolder("Toroid");

initialScene();

function initialGUI() {
  //add gui
  gui
    .add(setting.helper, "enable_grid")
    .name("enable grid")
    .onChange(updateScene);
  gui
    .add(setting.helper, "enable_axis")
    .name("enable axis")
    .onChange(updateScene);
  gui
    .add(setting.curve, "type", ["soleniod", "toriod"])
    .name("Curve type")
    .onChange(updateScene);

  solenoid_setting.add(solenoid, "period", 0, 50).onChange(updateScene);
  solenoid_setting.add(solenoid, "length", 0, 5).onChange(updateScene);
  solenoid_setting.add(solenoid, "radius", 0, 5).onChange(updateScene);

  toroid_setting.add(toroid, "period", 0, 100).onChange(updateScene);
  toroid_setting.add(toroid, "innerRadius", 0, 5).onChange(updateScene);
  toroid_setting.add(toroid, "outerRadius", 0, 5).onChange(updateScene);

}

function initialScene() {
  //add lights
  const ambiant = new THREE.AmbientLight(0x404040);
  const light = new THREE.PointLight(0xff0000, 1, 100);
  light.position.set(5, 5, 5);

  // set control poperties
  controls.enableDamping = true;

  // add mesh to the scene
  scene.add(tube);
  scene.add(ambiant);
  scene.add(light);

  initialGUI();
  window.addEventListener("resize", onResize);

  animate();
  updateScene();
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  stats.update();
  renderer.render(scene, camera);
}

function updateScene() {
  if (setting.helper.enable_grid) {
    scene.add(grid);
  } else {
    scene.remove(grid);
  }

  if (setting.helper.enable_axis) {
    scene.add(axis);
  } else {
    scene.remove(axis);
  }

  toroid_setting.hide();
  solenoid_setting.hide();

  switch (setting.curve.type) {
    case "soleniod":
      tube.geometry = new THREE.TubeGeometry(solenoid, 500, 0.05, 10, false);
      solenoid_setting.show();
      solenoid_setting.open();
      break;
    case "toriod":
      tube.geometry = new THREE.TubeGeometry(toroid, 1000, 0.05, 10, false);
      toroid_setting.show();
      toroid_setting.open();
      break;
    default:
  }
}

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
}
