// Lab 3 -- tFragmentShader.frag
/* Noah Gersh - ngersh - me@noahger.sh
 * 
 * Made for CMPM 163, Spring 2020
 * Fragment shader for texture UVs, tiled.
 * Adapted from lab instructions.
 * 
 * 2020-04-25
 */

uniform sampler2D texture1;
varying vec2 vUv;

void main() {
    // sample from texture based on the uv coordinates
    vec2 mapping = mod(vUv, 0.33333);
    gl_FragColor = texture2D(texture1, mapping);
}