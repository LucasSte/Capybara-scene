import * as THREE from "../three.js/build/three.module.js";
import {OrbitControls} from "../three.js/examples/jsm/controls/OrbitControls.js";
import {MTLLoader} from "../three.js/examples/jsm/loaders/MTLLoader.js";
import {OBJLoader} from "../three.js/examples/jsm/loaders/OBJLoader.js";
import {ColladaLoader} from "../three.js/examples/jsm/loaders/ColladaLoader.js";
import Grass from "./Grass.js";

let scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x787e74, 0.1, 60);
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
//renderer.setClearColor(0x87CEEB, 1); -> This is the blue sky color
renderer.setClearColor(0x787e74, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let texture = THREE.ImageUtils.loadTexture("./src/grass.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(50, 50);
let planeGeometry = new THREE.PlaneBufferGeometry(100, 100, 8, 8);
let material = new THREE.MeshLambertMaterial({map: texture});
let plane = new THREE.Mesh(planeGeometry, material);
planeGeometry.rotateX( - Math.PI / 2);

scene.add(plane);

let light = new THREE.PointLight(0xffffff);
light.position.set(0, 20, 10);
scene.add(light);

let controls = new OrbitControls(camera, renderer.domElement);
camera.position.y = 10;
camera.position.x = 0;
camera.position.z = 15;

controls.update();

const modelsPath = "./src/models/";

let grass = new Grass(modelsPath);
grass.load(scene);

var treeOneLoader = new ColladaLoader();
treeOneLoader.setPath("./src/models/");
treeOneLoader.load("Trre1.dae", function (tree) {
   let dae = tree.scene;
   dae.scale.set(0.1, 0.1, 0.1);
   dae.position.set(-5, 0, -8);
   scene.add(dae);
});

treeOneLoader.load("Trre1.dae", function (tree) {
    let dae = tree.scene;
    dae.rotateZ(-1.15);
    dae.scale.set(0.1, 0.1, 0.1);
    dae.position.set(7, 0, -6);
    scene.add(dae);
});


var treeTwoLoader = new ColladaLoader();
treeTwoLoader.setPath("./src/models/Tree2/");
treeTwoLoader.load("Tree2.dae", function (tree) {
    let dae = tree.scene;
    dae.scale.set(0.3, 0.3, 0.3);
    dae.position.set(10, 0, 0);
    scene.add(dae);
});

treeTwoLoader.load("Tree2.dae", function (tree) {
    let dae = tree.scene;
    dae.scale.set(0.3, 0.3, 0.3);
    dae.rotateZ(-1.15);
    dae.position.set(-8, 0, 0);
    scene.add(dae);
});

treeTwoLoader.load("Tree2.dae", function (tree) {
    let dae = tree.scene;
    dae.scale.set(0.3, 0.3, 0.3);
    dae.rotateZ(-1.5);
    dae.position.set(-10, 0, 5);
    scene.add(dae);
});

treeTwoLoader.load("Tree2.dae", function (tree) {
    let dae = tree.scene;
    dae.scale.set(0.3, 0.3, 0.3);
    dae.rotateZ(-1.7);
    dae.position.set(0, 0, -10);
    scene.add(dae);
});

var pantherLoader = new ColladaLoader();
pantherLoader.setPath("./src/models/");
pantherLoader.load("panter.dae", function (daeScene) {
    let dae = daeScene.scene;
    dae.scale.set(0.05, 0.05, 0.05);
    dae.rotateZ(-Math.PI/4);
    dae.position.set(5, 0, -2);
    scene.add(dae);
});

var capybaraLoader = new ColladaLoader();
capybaraLoader.setPath("./src/models/");
capybaraLoader.load("capybara.dae", function (daeScene) {
    let dae = daeScene.scene;
    dae.rotateZ(-Math.PI/2);
    dae.scale.set(0.05, 0.05, 0.05);
    dae.position.set(-1.7, 0, 4);
    scene.add(dae);
});


var animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

animate();