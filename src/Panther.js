import {ColladaLoader} from "../three.js/examples/jsm/loaders/ColladaLoader.js";
import * as THREE from "../three.js/build/three.module.js";

class Panther
{
    modelsPath;
    fileName = "panter.dae";

    load(scene, document)
    {
        let scale = 0.05;
        let loader = new ColladaLoader();
        loader.setPath(this.modelsPath);
        loader.load(this.fileName, function (panter) {
            let dae = panter.scene;
            dae.scale.set(scale, scale, scale);
            dae.rotateZ(-Math.PI/4);
            dae.position.set(5, 0, -2);
            dae.traverse(function (child) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material)
                {
                    let uniforms = {
                        mtexture: new THREE.Uniform(child.material.map)
                    };
                    child.material = new THREE.ShaderMaterial({
                        uniforms: uniforms,
                        vertexShader: document.getElementById( 'vertexShader' ).textContent,
                        fragmentShader: document.getElementById( 'fragmentShader' ).textContent
                    });
                }
            })
            scene.add(dae);
        });
    }

    constructor(path) {
        this.modelsPath = path;
    }
}

export default Panther;