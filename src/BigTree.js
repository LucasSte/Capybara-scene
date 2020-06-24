import {ColladaLoader} from "./three_src/ColladaLoader.js";

class BigTree
{
    modelsPath;
    fileName = "Trre1.dae";

    load(scene)
    {
        let scale = 0.1;
        let loader = new ColladaLoader();
        loader.load(this.modelsPath + this.fileName, function (tree) {
            let dae = tree.scene;
            dae.scale.set(scale, scale, scale);
            dae.position.set(-5, 0, -8);
            dae.traverse(function (child) {
                child.castShadow = true;
                child.receiveShadow = true;
            })
            scene.add(dae);
        });

        loader.load(this.modelsPath + this.fileName, function (tree) {
            let dae = tree.scene;
            dae.rotateZ(-1);
            dae.scale.set(scale, scale, scale);
            dae.position.set(7, 0, -6);
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

export default BigTree;