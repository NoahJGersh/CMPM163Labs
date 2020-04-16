// Lab 3 -- sineInterp.frag
/* Noah Gersh - ngersh - me@noahger.sh
 * 
 * Made for CMPM 163, Spring 2020
 * Fragment shader for linear interpolation
 * between sine-modified colors across depth
 * of mesh.
 * Adapted from depthInterp.frag
 * 
 * 2020-04-16
 */

#define PI 3.1415926535897932384626433832795

const vec3 white = vec3(1.0, 1.0, 1.0);

uniform vec3 colorA;
uniform vec3 colorB;

varying vec3 vUv;

void main() {
    float colorMod = max(0.0, sin(PI / (vUv.z * 0.1)));
    vec3 modA = min(white, colorA * colorMod);
    vec3 modB = min(white, colorB * colorMod);
    gl_FragColor = vec4(mix(modA, modB, vUv.z * 3.0), 1.0); // linear interpolation
}