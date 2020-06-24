import {ColladaLoader} from "../three.js/examples/jsm/loaders/ColladaLoader.js";

class SmallTree
{
    modelsPath;
    fileName = "Tree2.dae";

    load(scene)
    {
        let scale = 0.3;
        let loader = new ColladaLoader();
        loader.setPath(this.modelsPath + "Tree2/");
        loader.load(this.fileName, function (tree) {
            let dae = tree.scene;
            dae.scale.set(scale, scale, scale);
            dae.position.set(10, 0, 0);
            scene.add(dae);
            dae.traverse(function (child) {
                child.castShadow = true;
                child.receiveShadow = true;
            })
        });

        loader.load(this.fileName, function (tree) {
            let dae = tree.scene;
            dae.scale.set(scale, scale, scale);
            dae.rotateZ(-0.15);
            dae.position.set(-8, 0, -0.5);
            dae.traverse(function (child) {
                child.castShadow = true;
                child.receiveShadow = true;
            })
            scene.add(dae);
        });

        loader.load(this.fileName, function (tree) {
            let dae = tree.scene;
            dae.scale.set(scale, scale, scale);
            dae.rotateZ(-1.5);
            dae.position.set(-10, 0, 5);
            dae.traverse(function (child) {
                child.castShadow = true;
                child.receiveShadow = true;
            })
            scene.add(dae);
        });

        loader.load(this.fileName, function (tree) {
            let dae = tree.scene;
            dae.scale.set(scale, scale, scale);
            dae.rotateZ(1.7);
            dae.position.set(0, 0, -10);
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

export default SmallTree;