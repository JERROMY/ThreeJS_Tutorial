import * as THREE from 'three';

function RenderTargetShaderMaterial( shaders ){

    const uniforms = {
        sceneColorBuffer: { value: null },
        normalBuffer: { value: null },
        screenSize: { value: null },
    };

    const RenderTarget_VS = shaders.get('RenderTarget_VS');
    const RenderTarget_FS = shaders.get('RenderTarget_FS');

    //console.log( Basic_VS )
    //console.log( Basic_FS )

    const randerTargetShaderMaterial = new THREE.ShaderMaterial( {

        uniforms: uniforms,
        vertexShader: RenderTarget_VS,
        fragmentShader: RenderTarget_FS,
        
        // blending: THREE.AdditiveBlending,
        //side:THREE.DoubleSide,
        // depthTest : false,
        // depthWrite : false,
        // transparent: true,
        // vertexColors: true

    } );

    return randerTargetShaderMaterial;
}


function createRenderTargetShader( shaders ){

    const RenderTarget_VS = shaders.get('RenderTarget_VS');
    const RenderTarget_FS = shaders.get('RenderTarget_FS');

    const RenderTargetShader = {
        uniforms : {
            tDiffuse: { value: null }
        },
        vertexShader : RenderTarget_VS,
        fragmentShader: RenderTarget_FS,

    }

    return RenderTargetShader;

}

export { RenderTargetShaderMaterial, createRenderTargetShader };