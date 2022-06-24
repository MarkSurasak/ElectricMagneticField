import * as THREE from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
const transform = new TransformControls(camera, renderer.domElement);

// set control poperties
controls.enableDamping = true;

// add mesh to the scene
scene.add(grid, axis);

camera.position.set(5, 5, 5);
controls.update();

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();
