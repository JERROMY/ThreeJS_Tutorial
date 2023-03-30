
#include <packing>

//precision highp float;
varying vec2 vUv;
uniform sampler2D sceneColorBuffer;
uniform sampler2D normalBuffer;
uniform sampler2D depthBuffer;
uniform float cameraNear;
uniform float cameraFar;
uniform vec4 screenSize;

float readDepth (sampler2D depthSampler, vec2 coord) {

    float fragCoordZ = texture2D(depthSampler, coord).x;
    float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
    return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

}

float getPixelDepth(float x, float y) {
    // screenSize.zw is pixel size 
    // vUv is current position
    return readDepth( depthBuffer, vUv + screenSize.zw * vec2(x, y) );
}

vec3 getPixelNormal(float x, float y) {
	return texture2D(normalBuffer, vUv + screenSize.zw * vec2(x, y)).rgb;
}

float saturate(float num) {
    return clamp(num, 0.0, 1.0);
}

void main()
{
    vec4 sceneColor = texture2D(sceneColorBuffer, vUv);
    
    float depth = getPixelDepth(0.0, 0.0);
    vec3 depthColor = vec3( depth );

    vec3 normalColor = getPixelNormal( 0.0, 0.0 );

    float thickness = 1.0;
    
    float depthDiff = 0.0;
    depthDiff += abs(depth - getPixelDepth(thickness, 0.0));
    depthDiff += abs(depth - getPixelDepth(-thickness, 0.0));
    depthDiff += abs(depth - getPixelDepth(0.0, thickness));
    depthDiff += abs(depth - getPixelDepth(0.0, -thickness));

    float normalDiff = 0.0;
    normalDiff += distance(normalColor, getPixelNormal(thickness, 0.0));
    normalDiff += distance(normalColor, getPixelNormal(0.0, thickness));
    normalDiff += distance(normalColor, getPixelNormal(0.0, thickness));
    normalDiff += distance(normalColor, getPixelNormal(0.0, -thickness));

    normalDiff += distance(normalColor, getPixelNormal(thickness, thickness));
    normalDiff += distance(normalColor, getPixelNormal(thickness, -thickness));
    normalDiff += distance(normalColor, getPixelNormal(-thickness, thickness));
    normalDiff += distance(normalColor, getPixelNormal(-thickness, -thickness));

    float depthBias = 1.0;
    float depthMultiplier = 20.0;
    float normalBias = 1.0;
    float normalMultiplier = 1.0;

    depthDiff = depthDiff * depthMultiplier;
    depthDiff = saturate(depthDiff);
    depthDiff = pow(depthDiff, depthBias);

    normalDiff = normalDiff * normalMultiplier;
    normalDiff = saturate(normalDiff);
    normalDiff = pow(normalDiff, normalBias);

    float outline = normalDiff + depthDiff;
    vec3 color = vec3(1.0, 1.0, 1.0);
    vec4 outlineColor = vec4(color, 1.0);

    gl_FragColor = vec4( mix( sceneColor, outlineColor, outline ) );
    
    //gl_FragColor = vec4( vec3( outline ), 1.0 );

}