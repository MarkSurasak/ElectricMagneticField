import * as THREE from "three";
import { LineBasicMaterial } from "three";
//import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SoleniodCurve } from "./Curve/SoleniodCurve.js";

// initialize
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
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

// add geomatry
const parametric = new SolenoidCurve(10,4,1);

// add material
const red = new LineBasicMaterial({ color: "red"});

// add mesh
const curve = new THREE.Line(parametric.getPoints(100), red);

// set control poperties
controls.enableDamping = true;

// add mesh to the scene
scene.add(grid, axis);
scene.add(line);

camera.position.set(5, 5, 5);
controls.update();

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();
