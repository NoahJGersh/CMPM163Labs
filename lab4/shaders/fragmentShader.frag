// Lab 3 -- fragmentShader.frag
/* Noah Gersh - ngersh - me@noahger.sh
 * 
 * Made for CMPM 163, Spring 2020
 * Fragment shader for texture UVs.
 * Adapted from lab instructions.
 * 
 * 2020-04-25
 */

uniform sampler2D texture1;
varying vec2 vUv;

void main() {
    // sample from texture based on the uv coordinates
    gl_FragColor = texture2D(texture1, vUv);
}