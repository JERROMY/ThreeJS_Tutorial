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

        this.instances = 50000;
        this.w = 10;
        this.d = 10;
        this.h = 0;

        this.terrPosis = [];
        this.terrNorms = [];
        this.angles = [];
        this.positions = [];
        this.indexs = [];
        this.uvs = [];

        this.grassGeo;
        this.grassParticles;
        this.createParticles();

        this.grassPlaneGeo = new THREE.PlaneGeometry( this.w, this.d );
        this.grassPlaneMat = new THREE.MeshBasicMaterial( {color: 0x08731f, side: THREE.DoubleSide} );
        this.grassPlane = new THREE.Mesh( this.grassPlaneGeo, this.grassPlaneMat );
        this.add( this.grassPlane );
        this.grassPlane.rotation.x = Math.PI / 2;


    }

    createParticles() {

        // 1st Way
        const prototype_shape = new THREE.PlaneGeometry(1, 1);
        const data = prototype_shape.attributes;
        //console.log( data );

        // 2nd Way
        // this.positions.push( 1, -1, 0 );
        // this.positions.push( -1, -1, 0 );
        // this.positions.push( -1, 1, 0 );
        // this.positions.push( 1, 1, 0 );

        // this.indexs.push(0);
        // this.indexs.push(1);
        // this.indexs.push(2);
        // this.indexs.push(2);
        // this.indexs.push(3);
        // this.indexs.push(0);

        // this.uvs.push(0.0, 0.0);
        // this.uvs.push(1.0, 0.0);
        // this.uvs.push(1.0, 1.0);
        // this.uvs.push(0.0, 1.0);

        for ( let i = 0; i < this.instances; i++ ) {

            let positionX = Math.random() * this.w - this.w/2;
            let positionY = this.h;
            let positionZ = Math.random() * this.d - this.d/2;

            //positionX = positionY = positionZ = 0;

            this.terrPosis.push( positionX, positionY, positionZ );

            let rndAngle = (Math.random()*2-1) * 45;
            //rndAngle = 0;
            this.angles.push( rndAngle );

        }

        this.grassGeo = new THREE.InstancedBufferGeometry();
        this.grassGeo.instanceCount = this.instances;

        //Prototype Instance Setting

        // 1st Way
        this.grassGeo.setAttribute( 'position', new THREE.Float32BufferAttribute( data.position.array, 3 ) );
        //this.grassGeo.setAttribute( 'normal', new THREE.Float32BufferAttribute( data.normal.array, 3 ) );
        this.grassGeo.setAttribute( 'uv', new THREE.Float32BufferAttribute( data.uv.array, 2 ) );
        this.grassGeo.setIndex(new THREE.BufferAttribute(new Uint16Array( prototype_shape.index.array ), 1));

        // 2nd Way
        // this.grassGeo.setAttribute( 'position', new THREE.Float32BufferAttribute( this.positions, 3 ) );
        // this.grassGeo.setAttribute( 'uv', new THREE.Float32BufferAttribute( this.uvs, 2 ) );
        // this.grassGeo.setIndex(new THREE.BufferAttribute(new Uint16Array( this.indexs ), 1));

        console.log(this.grassGeo.index);
        console.log(this.grassGeo.attributes);

        this.grassGeo.setAttribute( 'angle', new THREE.InstancedBufferAttribute(  new Float32Array( this.angles ), 1 ).setUsage( THREE.DynamicDrawUsage ) );
        this.grassGeo.setAttribute( 'terrPosi', new THREE.InstancedBufferAttribute( new Float32Array( this.terrPosis ), 3 ) );

        const grassMat = GrassShaderMaterial( shadersMap );

        this.grassParticles = new THREE.Mesh( this.grassGeo, grassMat );
        this.grassParticles.frustumCulled = false;
        this.add( this.grassParticles );
        this.scale.y = 0.25;



    }

    update( dt ){

        let t = dt;
        this.grassParticles.material.uniforms.time.value = t;

        //console.log( dt );
    }

}

export { GrassField };