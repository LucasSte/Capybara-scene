import * as THREE from "../three.js/build/three.module.js";
import {OrbitControls} from "../three.js/examples/jsm/controls/OrbitControls.js";
import {MTLLoader} from "../three.js/examples/jsm/loaders/MTLLoader.js";
import {OBJLoader} from "../three.js/examples/jsm/loaders/OBJLoader.js";
import {ColladaLoader} from "../three.js/examples/jsm/loaders/ColladaLoader.js";

let scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x787e74, 0.1, 60);
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
//renderer.setClearColor(0x87CEEB, 1);
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


camera.position.z = 5;

let light = new THREE.PointLight(0xffffff);
light.position.set(0, 20, 10);
scene.add(light);

let controls = new OrbitControls(camera, renderer.domElement);
camera.position.y = 10;
camera.position.x = 0;
camera.position.z = 15;

controls.update();

var mtlLoader = new MTLLoader();
mtlLoader.setPath("./src/models/");
mtlLoader.load("tree03.mtl", function (materials) {
    materials.preload();

    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath("./src/models/");
    objLoader.load("tree02.obj", function (object) {
        object.scale.set(1, 1, 1);
        object.position.set(10, 0, 0);
        object.rotation.set(0, 0, 0);
        scene.add(object);
    });

    objLoader.load("tree02.obj", function (object) {
        object.scale.set(1, 1, 1);
        object.position.set(-10, 0, 0);
        object.rotation.set(0, 1.15, 0);
        scene.add(object);
    });

    objLoader.load("tree02.obj", function (object) {
        object.scale.set(1, 1, 1);
        object.position.set(0, 0, -8);
        object.rotation.set(0, 1.5, 0);
        scene.add(object);
    });
});



var mtlLoader3 = new MTLLoader();
mtlLoader3.setPath("./src/models/");
mtlLoader3.load("LowPolyGrass.mtl", function (materials) {
    materials.preload();

    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath("./src/models/");
    var i;
    let xPos = [-5, -4, 0, 1, 6, 10, -7, -2, 4, 5];
    let zPos = [5, 4, 0, 1, 6, 0, -3, -2, 3, 8];
    for(i=0; i<10; i++)
    {
        let x = xPos[i];
        let z = zPos[i];
        objLoader.load("LowPolyGrass.obj", function (object2) {
            object2.scale.set(0.5, 0.5, 0.5);
            object2.position.set(x, 0, z);
            object2.rotation.set(0, Math.PI/(x*z/3), 0);
            scene.add(object2);
        });
    }

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