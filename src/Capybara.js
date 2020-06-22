import {ColladaLoader} from "../three.js/examples/jsm/loaders/ColladaLoader.js";

class Capybara
{
    modelsPath;
    fileName = "capybara.dae";

    load(scene)
    {
        let scale = 0.05;
        let loader = new ColladaLoader();
        loader.setPath(this.modelsPath);
        loader.load(this.fileName, function (capybara) {
            let dae = capybara.scene;
            dae.rotateZ(-Math.PI/2);
            dae.scale.set(scale, scale, scale);
            dae.position.set(-1.7, 0, 4);
            scene.add(dae);
        });
    }

    constructor(path) {
        this.modelsPath = path;
    }
}

export default Capybara;