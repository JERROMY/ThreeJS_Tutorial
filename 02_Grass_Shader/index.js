import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GrassShaderMaterial } from '../materials/MaterialsGrass.js';
import { shadersMap, loadShader } from '../ShaderGrass.js';
import { GrassField } from './grass.js';

console.log( "Three JS Ready " + THREE.REVISION )

let camera;
let scene;
let renderer;

let box;
let grassField;

loadShader( start );

function init(){

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 10000 );
	camera.position.z = 5;
    camera.position.y = 5;

	scene = new THREE.Scene();

    const group = new THREE.Group();
	scene.add( group );

    const helper = new THREE.GridHelper( 10, 10 );
	//helper.rotation.x = Math.PI / 2;
	group.add( helper );
    helper.visible = false;


    // const boxGeo = new THREE.BoxGeometry( 1, 1, 1 );
	// //const boxMat = new THREE.MeshBasicMaterial( { color: 0xCCCCCC, wireframe: true } );
    // const basicMat = GrassShaderMaterial( shadersMap );
	// const boxMesh = new THREE.Mesh( boxGeo, basicMat );
    // box = boxMesh;
	// group.add( boxMesh );
    // box.visible = false;

    grassField = new GrassField();
    scene.add( grassField );

    


    renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );
	controls.minDistance = 2;
	controls.maxDistance = 40;



    window.addEventListener( 'resize', onWindowResize );

}

function start(){
    init();
    animate();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate( deltaTime ) {

    requestAnimationFrame( animate );
    render( deltaTime );

}

function render( dt ){

   //box.rotation.y += 0.01;

    if( grassField ){
        grassField.update( dt )
    }
    renderer.render( scene, camera );
}
