// Lab 3 -- vertexShader.vert
/* Noah Gersh - ngersh - me@noahger.sh
 * 
 * Made for CMPM 163, Spring 2020
 * Basic vertex shader.
 * Adapted from lab instructions.
 * 
 * 2020-04-16
 */

varying vec3 vUv;

void main(){
    vUv = position;

    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
}