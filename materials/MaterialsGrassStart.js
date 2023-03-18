import * as THREE from 'three';

function GrassShaderMaterial( shaders ){

    
    
    const uniforms = {
    };

    const Grass_VS = shaders.get('Grass_VS');
    const Grass_FS = shaders.get('Grass_FS');


    const basicShaderMaterial = new THREE.RawShaderMaterial( {

        uniforms: uniforms,
        vertexShader: Grass_VS,
        fragmentShader: Grass_FS,
        
        // blending: THREE.AdditiveBlending,
        side:THREE.DoubleSide,
        // depthTest : false,
        // depthWrite : false,
        // transparent: true,
        // vertexColors: true

    } );

    return basicShaderMaterial;
}

export { GrassShaderMaterial };