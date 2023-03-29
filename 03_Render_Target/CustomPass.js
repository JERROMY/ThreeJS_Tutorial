import * as THREE from "three";
import { Pass, FullScreenQuad } from "three/addons/postprocessing/Pass.js";
import { RenderTargetShaderMaterial, createRenderTargetShader } from '../materials/MaterialsRenderTarget.js';


class CustomPass extends Pass {
    constructor(resolution, scene, camera, shaders) {
      
        super();

      this.renderScene = scene;
      this.renderCamera = camera;
      this.resolution = new THREE.Vector2(resolution.x, resolution.y);
      this.shaders = shaders;

      this.fsQuad = new FullScreenQuad( null );
      this.fsQuad.material = RenderTargetShaderMaterial( this.shaders );
      this.fsQuad.material.uniforms.screenSize.value = new THREE.Vector4( resolution.x, resolution.y, 1/resolution.x, 1/resolution.y );
      //console.log( this.fsQuad.material );

      const normalTarget = new THREE.WebGLRenderTarget(
        this.resolution.x,
        this.resolution.y
      );
      normalTarget.texture.format = THREE.RGBAFormat;
      normalTarget.texture.minFilter = THREE.NearestFilter;
      normalTarget.texture.magFilter = THREE.NearestFilter;
      normalTarget.texture.generateMipmaps = false;
      normalTarget.stencilBuffer = false;
      this.normalTarget = normalTarget;

      this.normalOverrideMaterial = new THREE.MeshNormalMaterial();


    }

    dispose() {

        this.normalTarget.dispose();
        this.fsQuad.dispose();
    }

    setSize( width, height ){

        
        this.resolution.set(width, height);
        this.normalTarget.setSize(width, height);

    }

    render(renderer, writeBuffer, readBuffer) {
        
        //console.log( writeBuffer );
        //console.log( readBuffer );
        //console.log( "render" );
        //const overrideMaterialValue = this.renderScene.overrideMaterial;

        //const depthBufferValue = writeBuffer.depthBuffer;
        //writeBuffer.depthBuffer = false;

        renderer.setRenderTarget( this.normalTarget );


        renderer.render(this.renderScene, this.renderCamera);


        this.fsQuad.material.uniforms["sceneColorBuffer"].value = readBuffer.texture;


        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this.fsQuad.render(renderer);
        } else {
            //renderer.setRenderTarget(writeBuffer);
            //this.fsQuad.render(renderer);
        }


        
        //this.renderScene.overrideMaterial = overrideMaterialValue;
    
    }
}

export { CustomPass };