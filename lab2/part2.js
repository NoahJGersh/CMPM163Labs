// Lab 2, Part 2 -- part2.js
/* Noah Gersh - ngersh - me@noahger.sh
 *
 * Made for CMPM 163, Spring 2020
 * Adapted from lab instructions, which
 * is in turn sourced from the Three.js
 * documentation.
 *
 * 2020-04-12
 */

// Init scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,
                                         window.innerWidth/window.innerHeight,
                                         0.1, 1000);
camera.position.y = 100;
camera.position.z = 300;

// Init renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Init lighting
var coneLight = new THREE.PointLight(0xffa500, 1, 400);
coneLight.position.set(50, 50, 50);
var dragonLight = new THREE.PointLight(0xffffff, 1, 500);
dragonLight.position.set(-200, 200, -200);
var daLight = new THREE.PointLight(0x00ffff, 1, 200);
daLight.position.set(300, 200, -200);
var rearFillLight = new THREE.PointLight(0xffffa5, 0.33, 1000);
rearFillLight.position.set(0, 0, -500);
var leftFillLight = new THREE.PointLight(0xffffaa, 0.2, 1000);
leftFillLight.position.set(-500, 0, 0);
scene.add(coneLight);
scene.add(dragonLight);
scene.add(daLight);
scene.add(rearFillLight);
scene.add(leftFillLight);

// Init GLTFLoader
var loader = new THREE.GLTFLoader();

// Load models
loader.load('cone.glb', gltf => scene.add(gltf.scene),
                        xhr => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
                        error => console.error(error));
loader.load('dragon.glb', gltf => {
                            scene.add(gltf.scene);
                            gltf.scene.position.x = -100;
                            gltf.scene.position.z = -100;
                            gltf.scene.rotation.x = Math.PI / -2;
                            gltf.scene.rotation.z = Math.PI / 4;
                            gltf.scene.scale.x = 5;
                            gltf.scene.scale.y = 5;
                            gltf.scene.scale.z = 5;
                          },
                          xhr => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
                          error => console.error(error));
loader.load('da.glb', gltf => {
                        scene.add(gltf.scene);
                        gltf.scene.position.x = 150;
                        gltf.scene.position.y = 50;
                        gltf.scene.position.z = -150;
                        gltf.scene.rotation.y = 5 * Math.PI / 6;
                        gltf.scene.scale.x = 30;
                        gltf.scene.scale.y = 30;
                        gltf.scene.scale.z = 30;
                      },
                      xhr => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
                      error => console.error(error));

// Animate
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();