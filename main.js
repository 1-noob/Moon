import * as  THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';

// Scene
const SCENE = new THREE.Scene();

// Camera
const CAMERA = new THREE.PerspectiveCamera(
    75, // field of view 75 degrees
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
);

CAMERA.position.z = 3;

// Renderer
const RENDERER = new THREE.WebGLRenderer({ antialias: true });
RENDERER.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(RENDERER.domElement);

// Geometry : temporary cube
const GEOMETRY = new THREE.BoxGeometry();
const MATERIAL = new THREE.MeshBasicMaterial({ color: 0xaaaaaa});

const CUBE = new THREE.Mesh(GEOMETRY, MATERIAL);
SCENE.add(CUBE);

// Animation loop
function animate() {
    requestAnimationFrame(animate); 
    CUBE.rotation.x += 0.01;
    RENDERER.render(SCENE, CAMERA);
}

animate();