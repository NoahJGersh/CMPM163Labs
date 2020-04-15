// Lab 3 -- lab3.js
/* Noah Gersh - ngersh - me@noahger.sh
 *
 * Made for CMPM 163, Spring 2020
 * Adapted from lab instructions.
 *
 * 2020-04-12
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
 camera.position.z = 5;

 // Init geometry
 var geometry = new THREE.BoxGeometry();
 var material = new THREE.MeshPhongMaterial({ color: 0xdddddd,
                                              specular: 0x00ff00,
                                              shininess:30 });
 var cube = new THREE.Mesh(geometry, material);
 scene.add(cube);

 // Init lighting
 var light = new THREE.PointLight(0xffffff, 1, 1000);
 light.position.set(10, 10, 10);
 scene.add(light);

 // Animate
 function animate() {
    requestAnimationFrame(animate);
    geometry.rotateX(0.01)
    geometry.rotateY(0.01);
    renderer.render(scene, camera);
 }
 animate();
