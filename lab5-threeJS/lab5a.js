// Lab 5a - lab5a.js
/* Noah Gersh - ngersh - me@noahger.sh
 *
 * Made for CMPM 163, Spring 2020
 * Does particle things
 * Adapted from lab instructions.
 *
 * 2020-05-02
 */

// Initialize scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,
                                         window.innerWidth/window.innerHeight,
                                         0.1,
                                         1000);

// Initialize renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 60;

// Initialize vertices
var vertices = [];
for (let i = 0; i < 1000; ++i) {
    const x = THREE.MathUtils.randFloatSpread(500);
    const y = THREE.MathUtils.randFloatSpread(500);
    const z = THREE.MathUtils.randFloatSpread(100);
    vertices.push(x, y, z);
}

// Initialize geometry
var geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

// Initialize material
var material = new THREE.PointsMaterial({color: 0xef983e});

// Initialize object
var points = new THREE.Points(geometry, material);
scene.add(points);

// Animate
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate();