// Lab 5a - lab5a.js
/* Noah Gersh - ngersh - me@noahger.sh
 *
 * Made for CMPM 163, Spring 2020
 * Creates particles with animated
 * HSL coloring.
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
var sprite = new THREE.TextureLoader().load('textures/disc.png');
var material = new THREE.PointsMaterial({ map: sprite,
                                          alphaTest: 0.5,
                                          transparent: true });
material.color.setHSL( 1.0, 0.3, 0.7 );

// Initialize object
var points = new THREE.Points(geometry, material);
scene.add(points);

// Camera Controls
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
var mouseX = 0;
var mouseY = 0;

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
    if (event.touches.length == 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function onDocumentTouchMove(event) {
    if (event.touches.length == 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

document.addEventListener('mousemove',  onDocumentMouseMove,  false);
document.addEventListener('touchstart', onDocumentTouchStart, false);
document.addEventListener('touchmove',  onDocumentTouchMove,  false);

// Animate
function animate() {
    requestAnimationFrame(animate);

    // Edit material color
    const time = Date.now() * 0.00005;
    const h = (360 * (1.0 + time) % 360) / 360;
    material.color.setHSL(h, 0.5, 0.5);

    // Edit camera position
    camera.position.x += (mouseX - camera.position.x) * 0.0005;
    camera.position.y += (-mouseY - camera.position.y) * 0.0005;

    renderer.render(scene, camera);
}
animate();