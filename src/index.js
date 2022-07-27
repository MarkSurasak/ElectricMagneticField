import * as THREE from "three";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";
import { Solenoid } from "./curve/Solenoid.js";
import { Toroid } from "./curve/Toroid.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { MagneticField } from "./MagneticField.js";
import { Group, Mesh, TubeGeometry } from "three";
import { Vertex } from "./VectorField";

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

//setup gui
const gui = new GUI();

const curve_names = ["solenoid", "toroid"];
const setting = {
  currentCurve: "solenoid",
  currentCurveIndex: 0,
  directional_sampleRate: 150,
  curveRadius: 0.05
};

const curve_menues = [gui.addFolder("solenoid"), gui.addFolder("toroid")];

//creating object geo material yada yada
const copper_material = new THREE.MeshPhongMaterial({ color: "orange" });

//curves
const curves = [new Solenoid(), new Toroid()];

//Curves Geometries
const curves_geometries = curves.map((curve) => {
  return new TubeGeometry(curve, 1000, 0.05, 8);
});

//Curves Mesh
const curves_meshes = curves_geometries.map((curve) => {
  return new Mesh(curve, copper_material);
});

const curves_group = new Group();
curves_meshes.forEach((mash) => {
  curves_group.add(mash);
});

//directional vectors
const directional_group = new Group();
curves.map((curve) => {
  return directional_group.add(
    curve.getDirectionals(setting.directional_sampleRate)
  );
});

//VecterFields
// const solenoid_vectorField = new MagneticField(solenoid);
// const toroid_vectorField = new MagneticField(toroid);

const vectorFields = new Group();
curves.map((curve) => {
  return vectorFields.add(new MagneticField(curve));
});

const grid = new THREE.GridHelper(10, 10);
const axis = new THREE.AxesHelper(5);

function getCurveIndexFromName(name) {
  return curve_names.indexOf(name);
}

function handledPropertyChange() {
  let curve = curves[setting.currentCurveIndex];

  directional_group.children[setting.currentCurveIndex] = curves[
    setting.currentCurveIndex
  ].getDirectionals(setting.directional_sampleRate);
  vectorFields.children[setting.currentCurveIndex] = new MagneticField(curve);
  curves_group.children[setting.currentCurveIndex].geometry = new TubeGeometry(
    curve,
    1000,
    setting.curveRadius,
    8
  );
}

function upadateCurve() {
  //hide all curve then show the corresponding
  for (let i = 0; i < curves.length; i++) {
    const curve = curves_group.children[i];
    const directional = directional_group.children[i];
    const vectorField = vectorFields.children[i];
    const menu = curve_menues[i];

    if (i !== setting.currentCurveIndex) {
      curve.visible = false;
      directional.visible = false;
      vectorField.visible = false;
      menu.hide();
    } else {
      curve.visible = true;
      directional.visible = true;
      vectorField.visible = true;
      menu.show();
      menu.open();
    }
  }
}

function initialGUI() {
  //add gui
  gui.add(grid, "visible").name("show grid");
  gui.add(axis, "visible").name("show axis");
  gui.add(curves_group, "visible").name("show curve");
  gui.add(directional_group, "visible").name("show directional");
  gui.add(vectorFields, "visible").name("show VectorField");

  gui
    .add(setting, "directional_sampleRate")
    .name("sampleRate")
    .onFinishChange((value) => {
      const curve = curves[setting.currentCurveIndex];

      directional_group.children[
        setting.currentCurveIndex
      ] = curve.getDirectionals(setting.directional_sampleRate);
    });

  //add option for changing curve type
  gui
    .add(setting, "currentCurve", curve_names)
    .name("curve")
    .onFinishChange((value) => {
      setting.currentCurveIndex = getCurveIndexFromName(value);
      upadateCurve();
    });

  //adding option for changing curve property
  curves.forEach((curve, index) => {
    curve
      .addController(curve_menues[index])
      .onFinishChange(handledPropertyChange);
  });
}

function initialScene() {
  //add lights
  const ambiant = new THREE.AmbientLight(0x404040);
  const light = new THREE.PointLight(0xff0000, 1, 100);
  light.position.set(5, 5, 5);

  // set control poperties
  controls.enableDamping = true;

  // add mesh to the scene
  scene.add(ambiant);
  scene.add(light);
  scene.add(grid, axis);
  // scene.add(directional_group);
  // scene.add(curves_group);
  // scene.add(vectorFields);

  //scene.add(vectorFields.children[0].getPath())

  const vertex = new Vertex({ maxLength: 50, minLength: 1 });
  vertex.generateVectorField();

  scene.add(vertex);
  scene.add(vertex.getPath());

  upadateCurve();
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

initialScene();
initialGUI();
animate();

window.addEventListener("resize", onResize);
