
precision mediump float;
varying vec2 vUv;

void main()
{
    
    vec3 color = vec3( 0.0 );

    //每一個像素色彩為根據UV座標的Y值
    //color = vec3(  vUv.y );
    //color = vec3( step( 0.5, vUv.x ) );
    //smoothstep(step1, step2, x) x 為在這範圍內他所佔的百分比

    vec3 red = vec3(1.0, 0.0, 0.0);
    vec3 blue = vec3(0.0, 0.0, 1.0);
    vec3 white = vec3(1.0, 1.0, 1.0);

    //color = mix( red, blue, vUv.x );
    //color = mix( red, blue, smoothstep(0.0, 1.0, vUv.x) );
    //color = vec3( smoothstep(0.0, 1.0, vUv.x) );
    //color = vec3( vUv.x );

    float line = abs( vUv.y - 0.5 );  // 0.0 ~ 1.0 => 0.0 ~ 0.5 -0.5 ~ 1.0
    line = smoothstep(0.0, 0.005, abs(vUv.y - 0.5));
    color = vec3( line );

    if( vUv.y > 0.5 ){
        color = mix( red, blue, vUv.x );
    }else{
        color = mix( red, blue, vUv.x );
    }



    gl_FragColor = vec4(color, 1.0);
}