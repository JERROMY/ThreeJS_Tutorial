precision mediump float;


uniform sampler2D grassMaskTex;
uniform sampler2D grassDiffTex;

varying vec2 vUv;

void main()
{

    
    vec3 grassColor = texture2D( grassDiffTex, vUv ).rgb;
    gl_FragColor = vec4( grassColor, 1.0 );
    
    //gl_FragColor = vec4 ( 1.0, 0.0, 0.0, 1.0 );


}