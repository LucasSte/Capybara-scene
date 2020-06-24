import {ColladaLoader} from "./three_src/ColladaLoader.js";

class Panther
{
    modelsPath;
    fileName = "panter.dae";

    load(scene)
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
            })
            scene.add(dae);
        });
    }

    constructor(path) {
        this.modelsPath = path;
    }
}

export default Panther;