// Lab 4 - lab4.js
/* Noah Gersh - ngersh - me@noahger.sh
 *
 * Made for CMPM 163, Spring 2020
 * Creates cubes with textures and normal maps.
 * Adapted from lab instructions.
 *
 * 2020-04-25
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
camera.position.z = 5;

// Initialize shaders
THREE.Cache.enabled = true;
var count = 0;
var tcount = 0;
var loader = new THREE.FileLoader();
var fshader, vshader, tfshader, tvshader;

// Texture shaded cube
loader.load('shaders/vertexShader.vert',
    data => { // onLoad
        console.log(data);
        vshader = data;
        ++count;
        addTextureShaderCube();
    },
    xhr => { // onProgress
        console.log((xhr.loaded/xhr.total * 100) + '% loaded');
    },
    err => { // onError
        console.error('Error: ', err);
    });

loader.load('shaders/fragmentShader.frag',
    data => { // onLoad
        console.log(data);
        fshader = data;
        ++count;
        addTextureShaderCube();
    },
    xhr => { // onProgress
        console.log((xhr.loaded/xhr.total * 100) + '% loaded');
    },
    err => { // onError
        console.error('Error: ', err);
    });

// Tiled shader cube
loader.load('shaders/tVertexShader.vert',
    data => { // onLoad
        console.log(data);
        tvshader = data;
        ++tcount;
        addTextureTiledCube();
    },
    xhr => { // onProgress
        console.log((xhr.loaded/xhr.total * 100) + '% loaded');
    },
    err => { // onError
        console.error('Error: ', err);
    });

loader.load('shaders/tFragmentShader.frag',
    data => { // onLoad
        console.log(data);
        tfshader = data;
        ++tcount;
        addTextureTiledCube();
    },
    xhr => { // onProgress
        console.log((xhr.loaded/xhr.total * 100) + '% loaded');
    },
    err => { // onError
        console.error('Error: ', err);
    });

// Initialize maps
var textureA = THREE.ImageUtils.loadTexture("textures/173b.jpg");
var normMapA = THREE.ImageUtils.loadTexture("textures/173.jpg");
var textureB = THREE.ImageUtils.loadTexture("textures/172.jpg");
var normMapB = THREE.ImageUtils.loadTexture("textures/172_norm.jpg");

// Initialize cubes
var geometry = new THREE.BoxGeometry();
var materialA = new THREE.MeshPhongMaterial( { map: textureA } );
var nMaterialA = new THREE.MeshPhongMaterial( { map: textureA, normalMap: normMapA } );
var cubeA = new THREE.Mesh(geometry, nMaterialA);
var cubeA2 = new THREE.Mesh(geometry, materialA);

var materialB = new THREE.MeshPhongMaterial( { map: textureB } );
var nMaterialB = new THREE.MeshPhongMaterial( { map: textureB, normalMap: normMapB } );
var cubeB = new THREE.Mesh(geometry, nMaterialB);
var cubeB2 = new THREE.Mesh(geometry, materialB);

scene.add(cubeA);
scene.add(cubeA2);
scene.add(cubeB);
scene.add(cubeB2);

// Texture shader cube
var tsGeometry, tsMaterial, tsMesh;
function addTextureShaderCube() {
    if (count == 2) {
        let uniforms = {
            texture1: { type: "t",
                        value: THREE.ImageUtils.loadTexture("textures/163.jpg")}
        };

        tsGeometry = new THREE.BoxGeometry(1, 1, 1);
        tsMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            fragmentShader: fshader,
            vertexShader: vshader,
            precision: "mediump"
        });

        tsMesh = new THREE.Mesh(tsGeometry, tsMaterial);
        tsMesh.position.x = 2;
        scene.add(tsMesh);
    }
}

// Texture tiled cube
var ttGeometry, ttMaterial, ttMesh;
function addTextureTiledCube() {
    if (tcount == 2) {
        let uniforms = {
            texture1: { type: "t",
                        value: THREE.ImageUtils.loadTexture("textures/163.jpg")}
        };

        ttGeometry = new THREE.BoxGeometry(1, 1, 1);
        ttMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            fragmentShader: tfshader,
            vertexShader: tvshader,
            precision: "mediump"
        });

        ttMesh = new THREE.Mesh(ttGeometry, ttMaterial);
        ttMesh.position.x = 2;
        ttMesh.position.y = -2;
        scene.add(ttMesh);
    }
}

// Set positions
cubeA2.position.x -= 2;
cubeB.position.y -= 2;
cubeB2.position.x -= 2;
cubeB2.position.y -= 2;

// Initialize lighting
var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(10, 10, 10);
scene.add(light);

// Animation parameters
var currentAngle = 0;

// Animate
function animate() {
    requestAnimationFrame(animate);

    light.position.x = 10 * Math.cos(currentAngle);
    light.position.z = 10 * Math.sin(currentAngle);
    currentAngle += 0.01;

    renderer.render(scene, camera);
}
animate();