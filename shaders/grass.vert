uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute vec3 terrPosi;
attribute vec2 uv;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;



void main()
{
    
    vUv = uv;

    vec3 upDir = vec3(0.0, 1.0, 0.0);

    vec3 finalPosi = position;
    finalPosi.y += 0.5;
    //finalPosi.x *= 0.1;

    
    
    finalPosi = terrPosi + finalPosi;

    vec4 posi = vec4( finalPosi, 1.0 );
    vec4 mPosi = modelViewMatrix * posi;
    
    
    gl_Position = projectionMatrix * mPosi;

}