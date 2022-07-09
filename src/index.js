import * as THREE from "three";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";
import { Solenoid } from "./curve/Solenoid.js";
import { Toroid } from "./curve/Toroid.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { MagneticField } from "./MagneticField.js";
import { Vector3 } from "three";

// initialize
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
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
    tubularSegments: 1000,
    radius: 0.1,
    radialSegments: 8,
    close: false
  }
};

const copper_material = new THREE.MeshPhongMaterial({ color: "orange" });

const curves = {solenoid: new Solenoid(),
                toroid: new Toroid(),
}

const grid = new THREE.GridHelper(10, 10);
const axis = new THREE.AxesHelper(5);

const tube = new THREE.Mesh(
  new THREE.TubeGeometry(
    curves[setting.curve.type],
    setting.curve.tubularSegments,
    setting.curve.radius,
    setting.curve.radialSegments,
    setting.curve.close
  ),
  copper_material
);

const gui = new GUI();

const solenoid_setting = gui.addFolder("Solenoid");
const toroid_setting = gui.addFolder("Toroid");

const magneticField = new MagneticField(curves[setting.curve.type]);

initialScene();

function initialGUI() {
  //add gui
  gui
    .add(setting.helper, "enable_grid")
    .name("enable grid")
    .onChange((isEnable) => { isEnable ? scene.add(axis) : scene.remove(axis)});
  gui
    .add(setting.helper, "enable_axis")
    .name("enable axis")
    .onChange((isEnable) => { isEnable ? scene.add(grid) : scene.remove(grid)});
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
  scene.add(magneticField);

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

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
}
