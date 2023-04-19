precision mediump float;

varying vec2 vUv;

uniform sampler2D diffTex;

void main()
{
    vec3 diffColor = texture2D( diffTex, vUv ).rgb;
    vec4 diffColorA = texture2D( diffTex, vUv );

    gl_FragColor = vec4( diffColor, 1.0 );

    //gl_FragColor = vec4 ( 1.0, 0.0, 0.0, 1.0 );

    if( diffColorA.a <= 0.1 ){
        discard;
    }
}