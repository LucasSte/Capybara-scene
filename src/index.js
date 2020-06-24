import * as THREE from "../three.js/build/three.module.js";
import {OrbitControls} from "../three.js/examples/jsm/controls/OrbitControls.js";
import Grass from "./Grass.js";
import BigTree from "./BigTree.js";
import SmallTree from "./SmallTree.js";
import Panther from "./Panther.js";
import Capybara from "./Capybara.js";

let scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x787e74, 0.1, 60);
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer({antialias: true});
// renderer.setClearColor(0x87CEEB, 1); //-> This is the blue sky color
renderer.setClearColor(0x787e74, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// let texture = THREE.ImageUtils.loadTexture("./src/grass.jpg");
let texture = THREE.ImageUtils.loadTexture("./src/ground.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(10, 10);

// let textureNormal = THREE.ImageUtils.loadTexture("./src/grassNormal.jpg");
let textureNormal = THREE.ImageUtils.loadTexture("./src/groundNormal.jpg");
textureNormal.wrapS = THREE.RepeatWrapping;
textureNormal.wrapT = THREE.RepeatWrapping;
textureNormal.repeat.set(10, 10);

let textureBump = THREE.ImageUtils.loadTexture("./src/grassBump.jpg");
textureBump.wrapS = THREE.RepeatWrapping;
textureBump.wrapT = THREE.RepeatWrapping;
textureBump.repeat.set(10, 10);

// let textureSpecular = THREE.ImageUtils.loadTexture("./src/grassSpecular.jpg");
let textureSpecular = THREE.ImageUtils.loadTexture("./src/groundSpecular.jpg");
textureSpecular.wrapS = THREE.RepeatWrapping;
textureSpecular.wrapT = THREE.RepeatWrapping;
textureSpecular.repeat.set(10, 10);

let planeGeometry = new THREE.PlaneBufferGeometry(100, 100, 8, 8);
let material = new THREE.MeshPhongMaterial({
    map:texture,
    normalMap: textureNormal,
    // bumpMap: textureBump,
    specularMap: textureSpecular
});
let plane = new THREE.Mesh(planeGeometry, material);
plane.receiveShadow = true;
planeGeometry.rotateX( - Math.PI / 2);

scene.add(plane);

let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);
let light = new THREE.PointLight(0xffffff);
light.position.set(0, 20, 10);
light.castShadow = true;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 50;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
scene.add(light);

let controls = new OrbitControls(camera, renderer.domElement);
camera.position.y = 10;
camera.position.x = 0;
camera.position.z = 15;

controls.update();
const modelsPath = "./src/models/";

let grass = new Grass(modelsPath);
grass.load(scene);

let bigTree = new BigTree(modelsPath);
bigTree.load(scene);

let smallTree = new SmallTree(modelsPath);
smallTree.load(scene);

let panther = new Panther(modelsPath);
panther.load(scene);

let capybara = new Capybara(modelsPath);
capybara.load(scene);

var animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

animate();