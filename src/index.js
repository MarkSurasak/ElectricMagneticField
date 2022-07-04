import * as THREE from "three";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";

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
  helper: {
    enable_grid: true,
    enable_axis: false
  },
  curve: {
    type: 'soleniod',
    radius: 0.1
  }
}

const copper_material = new THREE.MeshPhongMaterial({color: 'orange'})

const soleniod = new Curve.Soleniod(10,4,2)
const toriod = new Curve.Toriod(70, Math.PI*2, 0.5, 3)

const grid = new THREE.GridHelper(10,10)
const axis = new THREE.AxesHelper()

const tube = new THREE.Mesh(new THREE.TubeGeometry(solenoid, 1000, 0.05, 10, false), copper_material)

function initGUI() {
  const stats = Stats();
  document.body.appendChild(stats.dom);

  //add gui
  const gui = new GUI();
  gui
    .add(setting.helper, "enable_grid")
    .name("enable grid")
    .onChange((value) => {
      if ( value ) { scene.add(grid) }
      else { scene.remove(grid) }
    });
  gui
    .add(setting.helper, "enable_axis")
    .name("enable axis")
    .onChange((value) => {
      if ( value ) { scene.add(axis) }
      else { scene.remove(axis) }
    });
  gui
    .add(setting.curve, 'type', ['soleniod','toriod'])
    .name('Curve type')
    .onChange((values) => {
      switch (values) {
        case 'soleniod': 
          tube.geometry = new THREE.TubeGeometry(soleniod, 500, 0.05, 10, false)
          break;
        case 'toriod': 
          tube.geometry = new THREE.TubeGeometry(toriod, 1000, 0.05, 10, false)
          break;
      }
    })
}

function initialScene() {
  // add controler
  const controls = new OrbitControls(camera, renderer.domElement)
  
  //add lights
  const ambiant = new THREE.AmbientLight(0x404040)
  const light = new THREE.PointLight(0xff0000, 1, 100)
  light.position.set(5, 5, 5)

  // set control poperties
  controls.enableDamping = true

  // add mesh to the scene
  scene.add(tube)
  scene.add(ambiant)
  scene.add(light)

  initialGUI()
  window.addEventListener("resize", onResize)
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
