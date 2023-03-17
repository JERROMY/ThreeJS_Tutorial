import * as THREE from 'three';
import { GrassShaderMaterial } from '../materials/MaterialsGrass.js';
import { shadersMap, loadShader } from '../ShaderGrass.js';

// Step 1: Create a Grass Class
class GrassField extends THREE.Group {

    constructor() {
        super();
        console.log("Grass");

        this.axesHelper = new THREE.AxesHelper( 1 );
        this.add( this.axesHelper );

        this.instances = 2;
        this.w = 10;
        this.d = 10;
        this.h = 0;

        this.terrPosis = [];
        this.terrNorms = [];

        this.grassGeo;
        this.grassParticles;
        this.createParticles();


    }

    createParticles() {

        // 1 Way
        const prototype_shape = new THREE.PlaneGeometry(1, 1);
        const data = prototype_shape.attributes;
        //console.log( data );

        for ( let i = 0; i < this.instances; i++ ) {

            const positionX = Math.random() * this.w - this.w/2;
            const positionY = this.h;
            const positionZ = Math.random() * this.d - this.d/2;

            this.terrPosis.push( positionX, positionY, positionZ );
        }

        this.grassGeo = new THREE.InstancedBufferGeometry();
        this.grassGeo.instanceCount = this.instances;

        //Prototype Instance Setting

        this.grassGeo.setAttribute( 'position', new THREE.Float32BufferAttribute( data.position.array, 3 ) );
        this.grassGeo.setAttribute( 'normal', new THREE.Float32BufferAttribute( data.normal.array, 3 ) );
        this.grassGeo.setAttribute( 'uv', new THREE.Float32BufferAttribute( data.uv.array, 2 ) );

        this.grassGeo.setIndex(new THREE.BufferAttribute(new Uint16Array( prototype_shape.index.array ), 1));

        console.log(this.grassGeo.index);
        console.log(this.grassGeo.attributes);

        this.grassGeo.setAttribute( 'terrPosi', new THREE.InstancedBufferAttribute( new Float32Array( this.terrPosis ), 3 ) );

        const grassMat = GrassShaderMaterial( shadersMap );

        this.grassParticles = new THREE.Mesh( this.grassGeo, grassMat );
        this.grassParticles.frustumCulled = false;
        this.add( this.grassParticles );



    }

    update( dt ){
        //console.log( dt );
    }

}

export { GrassField };