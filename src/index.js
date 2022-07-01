import * as THREE from "three";
import { MeshPhongMaterial } from "three";
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

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add helper
const grid = new THREE.GridHelper(10, 10);
const axis = new THREE.AxesHelper(5);

// add controler
const controls = new OrbitControls(camera, renderer.domElement);
//const transform = new TransformControls(camera, renderer.domElement);

//curves
const toriod = new Toriod(70, Math.PI * 1.9, 0.5, 3);
const soleniod = new Solenoid(10, 3, 3);

// add something
const vectorField = new MagneticField(toriod);

// add geomatry
const tube = new THREE.TubeGeometry(toriod, 1000, 0.05, 10, false);

// add material
const red = new MeshPhongMaterial({ color: "orange" });

// add mesh
const curve = new THREE.Mesh(tube, red);

//add lights
const ambiant = new THREE.AmbientLight(0x404040);
const light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(5, 5, 5);

// set control poperties
controls.enableDamping = true;

// add mesh to the scene
scene.add(grid);
scene.add(curve);
scene.add(ambiant);
scene.add(light);
scene.add(vectorField.generateVectorField());

camera.position.set(5, 5, 5);

window.addEventListener("resize", onResize);

const stats = Stats();
document.body.appendChild(stats.dom);

//add gui
const gui = new GUI();

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();
