import * as THREE from 'three';
import { GrassShaderMaterial } from '../materials/MaterialsGrassStart.js';
import { shadersMap, loadShader } from '../ShaderGrassStart.js';

// Step 1: Create a Grass Class
class GrassField extends THREE.Group {

    constructor() {
        super();
        console.log("Grass");

        this.axesHelper = new THREE.AxesHelper( 1 );
        this.add( this.axesHelper );


    }

    createParticles() {




    }

    update( dt ){

    }

}

export { GrassField };