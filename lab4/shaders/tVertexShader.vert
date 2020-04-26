// Lab 3 -- tVertexShader.vert
/* Noah Gersh - ngersh - me@noahger.sh
 * 
 * Made for CMPM 163, Spring 2020
 * Basic vertex shader, for loading with
 * tiled fragment shader.
 * Adapted from lab instructions.
 * 
 * 2020-04-25
 */

varying vec2 vUv;

void main(){
    vUv = uv;

    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
}