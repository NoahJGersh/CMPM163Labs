// Lab 3 -- depthInterp.frag
/* Noah Gersh - ngersh - me@noahger.sh
 * 
 * Made for CMPM 163, Spring 2020
 * Fragment shader for linear interpolation
 * between colors across depth of mesh.
 * Adapted from lab instructions.
 * 
 * 2020-04-16
 */

uniform vec3 colorA;
uniform vec3 colorB;

varying vec3 vUv;

void main() {
    gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0); // linear interpolation
}