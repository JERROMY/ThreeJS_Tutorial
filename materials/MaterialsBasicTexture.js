import * as THREE from 'three';

function BasicTextureShaderMaterial( shaders ){

    const diffTex = new THREE.TextureLoader().load( '../textures/aim.png' );

    const uniforms = {
        diffTex: { value: diffTex },
    };

    const Basic_VS = shaders.get('BasicTexture_VS');
    const Basic_FS = shaders.get('BasicTexture_FS');

    //console.log( Basic_VS )
    //console.log( Basic_FS )

    const basicTextureShaderMaterial = new THREE.RawShaderMaterial( {

        uniforms: uniforms,
        vertexShader: Basic_VS,
        fragmentShader: Basic_FS,
        
        // blending: THREE.AdditiveBlending,
        side:THREE.DoubleSide,
        // depthTest : false,
        // depthWrite : false,
        // transparent: true,
        // vertexColors: true

    } );

    return basicTextureShaderMaterial;
}

export { BasicTextureShaderMaterial };