import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { RenderTargetShaderMaterial, createRenderTargetShader } from '../materials/MaterialsRenderTarget.js';
import { CustomPass } from './CustomPass.js';
import { shadersMap, loadShader } from '../shaders/ShaderRenderTarget.js';

console.log( "Three JS Ready " + THREE.REVISION )

let camera;
let scene;
let renderer;
let composer;
let res;

let box;

let customPass;

loadShader( start );

function init(){

    res = new THREE.Vector2();
    res.x = window.innerWidth;
    res.y = window.innerHeight;

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.set(0, 0, 4);

	scene = new THREE.Scene();

    const group = new THREE.Group();
	scene.add( group );
    scene.background = new THREE.Color( 0x222222 );

    //const helper = new THREE.GridHelper( 10, 10 );
	//helper.rotation.x = Math.PI / 2;
	//group.add( helper );
    //helper.visible = true;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);
    light.position.set(1.7, 1, -1);


    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
	const boxMat = new THREE.MeshStandardMaterial( { color: 0xFF0000 } );
    const boxMesh = new THREE.Mesh( boxGeo, boxMat );
    box = boxMesh;
	group.add( boxMesh );

    // const geometry = new THREE.TorusKnotGeometry( 1, 0.3, 128, 64 );
    // const material = new THREE.MeshBasicMaterial( { color: 'blue' } );

    // const count = 50;
    // const scale = 5;

    // for ( let i = 0; i < count; i ++ ) {

    //     const r = Math.random() * 2.0 * Math.PI;
    //     const z = ( Math.random() * 2.0 ) - 1.0;
    //     const zScale = Math.sqrt( 1.0 - z * z ) * scale;

    //     const mesh = new THREE.Mesh( geometry, material );
    //     mesh.position.set(
    //         Math.cos( r ) * zScale,
    //         Math.sin( r ) * zScale,
    //         z * scale
    //     );
    //     mesh.rotation.set( Math.random(), Math.random(), Math.random() );
    //     group.add( mesh );

    // }


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
    onWindowResize();
    
    

    window.addEventListener( 'resize', onWindowResize );

}

function initPostEffect(){

    //Post Processing
    const depthTexture = new THREE.DepthTexture();
    const renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
    renderTarget.texture.minFilter = THREE.NearestFilter;
    renderTarget.texture.magFilter = THREE.NearestFilter;
    renderTarget.stencilBuffer = false;
    renderTarget.depthTexture = new THREE.DepthTexture();
    renderTarget.depthTexture.format = THREE.DepthFormat;
    renderTarget.depthTexture.type = THREE.UnsignedShortType;

    customPass = new CustomPass( res, scene, camera, shadersMap );

    //const renderTargetShader = createRenderTargetShader( shadersMap );
    //const renderTargetPass = new ShaderPass( renderTargetShader );
    //composer.addPass( renderTargetPass );

    composer = new EffectComposer( renderer, renderTarget );
    const pass = new RenderPass(scene, camera);
    composer.addPass( pass );
    composer.addPass( customPass );
    

}

function start(){
    init();
    animate();
}

function onWindowResize() {

    res.x = window.innerWidth;
    res.y = window.innerHeight;

    //console.log( res );

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize(window.innerWidth, window.innerHeight);
    customPass.setSize( window.innerWidth, window.innerHeight );

}


function animate() {

    requestAnimationFrame( animate );
    render();

}

function render(){

    box.rotation.y += 0.01;




    //renderer.render( scene, camera );
    composer.render();
}
