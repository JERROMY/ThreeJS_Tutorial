import * as THREE from "three";
import { Pass } from "three/addons/postprocessing/Pass.js";


class CustomPass extends Pass {
    constructor(resolution, scene, camera) {
      
        super();

      this.renderScene = scene;
      this.renderCamera = camera;
      this.resolution = new THREE.Vector2(resolution.x, resolution.y);

      this.fsQuad = new Pass.FullScreenQuad(null);
      this.fsQuad.material = this.createOutlinePostProcessMaterial();

    }

    dispose() {
        this.normalTarget.dispose();
        this.fsQuad.dispose();
    }

    render(renderer, writeBuffer, readBuffer) {
        
        
    
    }
}