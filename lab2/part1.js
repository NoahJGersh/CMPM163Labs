// Lab 2, Part 1 -- part1.js
/* Noah Gersh - ngersh - me@noahger.sh
 *
 * Made for CMPM 163, Spring 2020
 * Adapted from lab instructions, which
 * is in turn sourced from the Three.js
 * documentation.
 *
 * 2020-04-11
 */

// Init scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,
                                         window.innerWidth/window.innerHeight,
                                         0.1,
                                         1000);

// Init renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Init geometry
var geometries = [];
for (let i = 0; i < 3; ++i) geometries.push(new THREE.BoxGeometry());
var materials = [new THREE.MeshBasicMaterial( {color: 0xffff00} ),
                 new THREE.MeshBasicMaterial( {color: 0xff00ff} ),
                 new THREE.MeshBasicMaterial( {color: 0x00ffff} )];
var cubes = [];
for (let i = 0; i < 3; ++i) cubes.push(new THREE.Mesh(geometries[i], materials[i]));
cubes.forEach(cube => scene.add(cube));

// Adjust positioning
camera.position.z = 10; // Move camera towards viewer
geometries[1].translate(3, 0, 1.5);
geometries[2].translate(0, 0, -1.5);

// Tracking values
var orbitAngle = 0;

// Animate scene
function animate() {
    requestAnimationFrame(animate);

    geometries[0].rotateX(0.01);
    geometries[0].rotateY(0.01);

    const nextAngle = orbitAngle + Math.PI / 64;
    geometries[1].rotateY(0.01);
    geometries[1].rotateZ(0.01);
    geometries[1].translate(Math.cos(nextAngle) - Math.cos(orbitAngle),
                            Math.sin(nextAngle) - Math.sin(orbitAngle), 0);
    orbitAngle = nextAngle;

    geometries[2].rotateX(0.01);
    geometries[2].rotateZ(0.02);

    renderer.render(scene, camera);
}
animate();
