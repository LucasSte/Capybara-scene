import {MTLLoader} from "./three_src/MTLLoader.js";
import {OBJLoader} from "./three_src/OBJLoader.js";

class Grass
{
    modelsPath;
    fileName = "LowPolyGrass";

    load(scene)
    {
        let mtlLoader = new MTLLoader();
        mtlLoader.setPath(this.modelsPath);
        let path = this.modelsPath;
        let file = this.fileName;
        let xPos = [-5, -4, 0, 1, 6, 10, -5, -2, 4, 5];
        let zPos = [5, 4, 0, 1, 6, 0, -2, -2, 3, 8];
        mtlLoader.load(file + ".mtl", function (materials) {
            materials.preload();

            let objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath(path);
            var i;
            for(i=0; i<10; i++)
            {
                let x = xPos[i];
                let z = zPos[i];
                objLoader.load(file + ".obj", function (obj) {
                    obj.scale.set(0.5, 0.5, 0.5);
                    obj.position.set(x, 0, z);
                    obj.rotation.set(0, Math.PI/(x*z/3), 0);
                    obj.traverse(function (child) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    })
                    scene.add(obj);
                })
            }
        })
    }

    constructor(path) {
        this.modelsPath = path;
    }
}

export default Grass;