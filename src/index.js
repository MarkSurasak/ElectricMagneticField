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
camera.position.set(5, 5, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var setting = {
  grid_enable: true
}

var object = {
  grid: new GridHelper(10,10)
}

function initGUI() {
  const stats = Stats();
  document.body.appendChild(stats.dom);

  //add gui
  const gui = new GUI();
  gui
    .add(setting.grid, "enable")
    .name("grid enable")
    .onChange((value) => {
      if ( value ) {scene.add(object.grid)}
      else {scene.remove(object.grid)}
    });
}

function initialScene() {
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

  initialGUI();
  window.addEventListener("resize", onResize);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  stats.update();
  renderer.render(scene, camera);
}

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight

  camera.updateProjectionMetrix()
}
