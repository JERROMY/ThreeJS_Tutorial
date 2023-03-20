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

        this.instances = 10000;
        this.w = 10;
        this.d = 10;
        this.h = 0;

        this.positions = [];
        this.indexs = [];
        this.uvs = [];

        this.grassGeo;
        this.grassParticles;
        this.createParticles();



    }

    createParticles() {


        // 2nd Way
        this.positions.push( 1, -1, 0 );
        this.positions.push( -1, -1, 0 );
        this.positions.push( -1, 1, 0 );
        this.positions.push( 1, 1, 0 );

        this.indexs.push(0);
        this.indexs.push(1);
        this.indexs.push(2);
        this.indexs.push(2);
        this.indexs.push(3);
        this.indexs.push(0);

        this.uvs.push(1.0, 0.0);
        this.uvs.push(0.0, 0.0);
        this.uvs.push(0.0, 1.0);
        this.uvs.push(1.0, 1.0);

        for( let i = 0 ; i < this.instances ; i++ ){

            

        }

        this.grassGeo = new THREE.InstancedBufferGeometry();
        this.grassGeo.instanceCount = this.instances;

        this.grassGeo.setAttribute( 'position', new THREE.Float32BufferAttribute( this.positions, 3 ) );
        this.grassGeo.setAttribute( 'uv', new THREE.Float32BufferAttribute( this.uvs, 2 ) );
        this.grassGeo.setIndex(new THREE.BufferAttribute(new Uint16Array( this.indexs ), 1));

        const grassMat = GrassShaderMaterial( shadersMap );


        this.grassParticles = new THREE.Mesh( this.grassGeo, grassMat );
        this.grassParticles.frustumCulled = false;
        this.add( this.grassParticles );



    }

    update( dt ){

    }

}

export { GrassField };