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
var vertInit = false;
var diFragInit = false;
var siFragInit = false;
var loader = new THREE.FileLoader();
var difshader, sifshader, vshader;

// Vertex Shader
loader.load('shaders/vertexShader.vert',
    data => { // onLoad
        console.log(data); // output the text to the console
        vshader = data;
        vertInit = true;
        addDepthInterpCube();
        addSineInterpCube();
    },
    xhr => console.log((xhr.loaded/xhr.total * 100) + '% loaded'), // onProgress
    err => console.error('An error occurred')); // onError

// Depth Interpolation
loader.load('shaders/depthInterp.frag', // Frag shader
    data => { // onLoad
        console.log(data);
        difshader = data;
        diFragInit = true;
        addDepthInterpCube();
    },
    xhr => console.log((xhr.loaded/xhr.total * 100) + '% loaded'), //onProgress
    err => console.error('An error occurred')); // onError

// Sine Interpolation
loader.load('shaders/sineInterp.frag',
    data => {
        console.log(data);
        sifshader = data;
        siFragInit = true;
        addSineInterpCube();
    },
    xhr => console.log((xhr.loaded/xhr.total * 100) + '% loaded'),
    err => console.error('An error occurred'));

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

// Depth interpolation geometry
var diGeometry, diMaterial, diMesh;
function addDepthInterpCube() {
    if (vertInit && diFragInit) {
        let uniforms = {
            colorA: {type: 'vec3', value: new THREE.Color(0x112f52)},
            colorB: {type: 'vec3', value: new THREE.Color(0xcd385b)}
        }
        diGeometry = new THREE.BoxGeometry(1, 1, 1);
        diMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            fragmentShader: difshader,
            vertexShader: vshader,
            precision: "mediump"
        });
        diMesh = new THREE.Mesh(diGeometry, diMaterial);
        diMesh.position.y = 2;
        scene.add(diMesh);
    }
}

// Sine interpolation geometry
var siGeometry, siMaterial, siMesh;
function addSineInterpCube() {
    if (vertInit && siFragInit) {
        let uniforms = {
            colorA: {type: 'vec3', value: new THREE.Color(0xff0000)},
            colorB: {type: 'vec3', value: new THREE.Color(0x0000ff)}
        }
        siGeometry = new THREE.BoxGeometry(1, 1, 1);
        siMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            fragmentShader: sifshader,
            vertexShader: vshader,
            precision: "mediump"
        });
        siMesh = new THREE.Mesh(siGeometry, siMaterial);
        siMesh.position.y = -2;
        scene.add(siMesh);
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

    if (diGeometry) {
        diGeometry.rotateX(-0.01);
        diGeometry.rotateY(0.01);
    }

    if (siGeometry) {
        siGeometry.rotateX(0.01);
        siGeometry.rotateY(-0.01);
    }

    renderer.render(scene, camera);
}
animate();
