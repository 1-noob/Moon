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
RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(RENDERER.domElement);

// Geometry : temporary cube
const GEOMETRY = new THREE.SphereGeometry(1, 64, 64);
const MATERIAL = new THREE.MeshStandardMaterial({
     color: 0x888888,
     roughness: 1.0,
     metalness: 0.0
});

const MOON = new THREE.Mesh(GEOMETRY, MATERIAL);
SCENE.add(MOON);

// Light from Sun
const SUNLIGHT = new THREE.DirectionalLight(0xffffff, 1);
SUNLIGHT.position.set(5, 3, 5);
SCENE.add(SUNLIGHT);

// Ambient light
const AMBIENTLIGHT = new THREE.AmbientLight(0xffffff, 0.2);
SCENE.add(AMBIENTLIGHT);

// Animation loop
function animate() {
    requestAnimationFrame(animate); 
    MOON.rotation.y += 0.002; // Rotate the moon slowly
    RENDERER.render(SCENE, CAMERA);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    CAMERA.aspect = window.innerWidth / window.innerHeight;
    CAMERA.updateProjectionMatrix();
    RENDERER.setSize(window.innerWidth, window.innerHeight);
});