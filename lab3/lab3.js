// Lab 3 -- lab3.js
/* Noah Gersh - ngersh - me@noahger.sh
 *
 * Made for CMPM 163, Spring 2020
 * Renders rotating cubes with different materials/shaders.
 * Adapted from lab instructions.
 *
 * 2020-04-15
 */

// Init shaders
THREE.Cache.enabled = true;
var count = 0;
var loader = new THREE.FileLoader();
var fshader, vshader;

loader.load('shaders/vertexShader.vert', // Vert shader
    data => { // onLoad
        console.log(data); // output the text to the console
        vshader = data;
        ++count;
        addCoolCube();
    },
    xhr => console.log((xhr.loaded/xhr.total * 100) + '% loaded'), // onProgress
    err => console.error('An error occurred')); // onError

loader.load('shaders/fragmentShader.frag', // Frag shader
    data => { // onLoad
        console.log(data);
        fshader = data;
        ++count;
        addCoolCube();
    },
    xhr => console.log((xhr.loaded/xhr.total * 100) + '% loaded'), //onProgress
    err => console.error('An error occurred')); // onError

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
var geometries = [];
for (let i = 0; i < 3; ++i) geometries.push(new THREE.BoxGeometry());
var materials = [new THREE.MeshPhongMaterial({   color:     0xdddddd,
                                                 specular:  0x00ff00,
                                                 shininess: 30 }),
                 new THREE.MeshLambertMaterial({ color:     0xff00dd,
                                                 transparent: true,
                                                 opacity:   0.75 }),
                 new THREE.MeshPhongMaterial({   color:     0x0da4ee,
                                                 specular:  0x00ffff,
                                                 shininess: 40 })];
var cubes = [];
for (let i = 0; i < 3; ++i) cubes.push(new THREE.Mesh(geometries[i], materials[i]));
cubes.forEach(cube => scene.add(cube));

// Special geometry
var sGeometry, sMaterial, sMesh;
function addCoolCube() {
    if (count == 2) {
        sGeometry = new THREE.BoxGeometry(1, 1, 1);
        sMaterial = new THREE.ShaderMaterial({
            fragmentShader: fshader,
            vertexShader: vshader,
            precision: "mediump"
        });
        sMesh = new THREE.Mesh(sGeometry, sMaterial);
        sMesh.position.y = 2;
        scene.add(sMesh);
    }
}

// Init lighting
var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(10, 10, 10);
scene.add(light);

// Set positions
geometries[1].translate(-2, 0, 0);
geometries[2].translate(2, 0, 0);

// Material values
var thinning = false; // Determine whether animated material opacity is increasing or decreasing
var opacMin = 0.1;    // Minimum opacity
var opacMax = 1.0;    // Maximum opacity
var rate = 0.005;     // Rate of opacity change

// Animate
function animate() {
    requestAnimationFrame(animate);

    materials[1].opacity += thinning ? -rate : rate;
    thinning = (thinning && (materials[1].opacity <= opacMin)) || (!thinning && (materials[1].opacity >= opacMax)) ? !thinning : thinning;

    geometries[0].rotateX(0.01);
    geometries[0].rotateY(0.01);

    geometries[1].translate(2, 0, 0);
    geometries[1].rotateX(0.01);
    geometries[1].rotateZ(0.01);
    geometries[1].translate(-2, 0, 0);

    geometries[2].translate(-2, 0, 0);
    geometries[2].rotateY(0.01);
    geometries[2].rotateZ(-0.01);
    geometries[2].translate(2, 0, 0);

    if (sGeometry) {
        sGeometry.rotateX(-0.01);
        sGeometry.rotateY(0.01);
    }

    renderer.render(scene, camera);
}
animate();
