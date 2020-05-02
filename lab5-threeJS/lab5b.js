// Lab 5b - lab5b.js
/* Noah Gersh - ngersh - me@noahger.sh
 *
 * Made for CMPM 163, Spring 2020
 * Creates particles with animated
 * positions, as an explosive square.
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

// Initialize particles
var particles = [];
const geo = new THREE.Geometry();
for (let i = 0; i < 1000; ++i) {
    const particle = {
        position: new THREE.Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 3 - 3),
        velocity: new THREE.Vector3(
            Math.random() * 0.02 - 0.01,
            0.06,
            Math.random() * 0.02 - 0.01),
        acceleration: new THREE.Vector3(
            Math.random() * 0.002 - 0.001,
            Math.random() * 0.002 - 0.001,
            0),
    }
    particles.push(particle);
    geo.vertices.push(particle.position);
}

// Initialize Point Material
const mat = new THREE.PointsMaterial({color: 0xffffff, size: 0.5});
var mesh = new THREE.Points(geo, mat);
mesh.position.z = -4;
scene.add(mesh);

// Animate
function animate() {

    // Edit particle position
    particles.forEach(p => {
        p.velocity.add(p.acceleration);
        p.position.add(p.velocity);
    });
    mesh.geometry.verticesNeedUpdate = true;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();