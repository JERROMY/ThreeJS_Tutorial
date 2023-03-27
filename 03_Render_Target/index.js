import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { RenderTargetShaderMaterial, createRenderTargetShader } from '../materials/MaterialsRenderTarget.js';

import { shadersMap, loadShader } from '../shaders/ShaderRenderTarget.js';

console.log( "Three JS Ready " + THREE.REVISION )

let camera;
let scene;
let renderer;
let composer;

let box;

loadShader( start );

function init(){

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 5;
    camera.position.y = 5;

	scene = new THREE.Scene();

    const group = new THREE.Group();
	scene.add( group );
    scene.background = new THREE.Color( 0x222222 );

    const helper = new THREE.GridHelper( 10, 10 );
	//helper.rotation.x = Math.PI / 2;
	group.add( helper );
    helper.visible = true;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);
    light.position.set(1.7, 1, -1);


    const boxGeo = new THREE.BoxGeometry( 1, 1, 1 );
	const boxMat = new THREE.MeshStandardMaterial( { color: 0xFF0000 } );
    const boxMesh = new THREE.Mesh( boxGeo, boxMat );
    box = boxMesh;
	group.add( boxMesh );


    //const basicMat = RenderTargetShaderMaterial( shadersMap );
    //const planeGeo = new THREE.PlaneGeometry( 2, 2 );
    //const plane = new THREE.Mesh( planeGeo, basicMat );
    //scene.add( plane );
    //plane.rotation.x = Math.PI / 2;


    renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );
	controls.minDistance = 2;
	controls.maxDistance = 40;

    initPostEffect();

    window.addEventListener( 'resize', onWindowResize );

}

function initPostEffect(){

    //Post Processing
    const depthTexture = new THREE.DepthTexture();
    const renderTarget = new THREE.WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight,
        {
            depthTexture: depthTexture,
            depthBuffer: true,
        }
    );

    const renderTargetShader = createRenderTargetShader( shadersMap );
    const renderTargetPass = new ShaderPass( renderTargetShader );

    composer = new EffectComposer( renderer, renderTarget );
    const pass = new RenderPass(scene, camera);
    composer.addPass( pass );
    composer.addPass( renderTargetPass );

}

function start(){
    init();
    animate();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize(window.innerWidth, window.innerHeight);

}


function animate() {

    requestAnimationFrame( animate );
    render();

}

function render(){

    //box.rotation.y += 0.01;


    //renderer.render( scene, camera );
    composer.render();
}
