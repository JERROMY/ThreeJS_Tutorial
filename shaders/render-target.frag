
#include <packing>

precision mediump float;
varying vec2 vUv;
uniform sampler2D sceneColorBuffer;
uniform sampler2D normalBuffer;
uniform vec4 screenSize;

vec3 getPixelNormal(int x, int y) {
	return texture2D(normalBuffer, vUv + screenSize.zw * vec2(x, y)).rgb;
}

void main()
{
    vec4 sceneColor = texture2D(sceneColorBuffer, vUv);   
    
    gl_FragColor = sceneColor;

}