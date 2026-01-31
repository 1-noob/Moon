import * as  THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';

const TEXTURE_LOADER = new THREE.TextureLoader();

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
RENDERER.physicallyCorrectLights = true;
RENDERER.outputColorSpace = THREE.SRGBColorSpace;
RENDERER.toneMapping = THREE.ACESFilmicToneMapping;
RENDERER.toneMappingExposure = 1.8;
document.body.appendChild(RENDERER.domElement);

// Geometry : temporary cube
const GEOMETRY = new THREE.SphereGeometry(1, 256, 256);

// Moon Texture
const MOON_TEXTURE = TEXTURE_LOADER.load('./texture/moon_colour.jpg');
MOON_TEXTURE.colorSpace = THREE.SRGBColorSpace;

// Normal map
const NORMAL_MAP = TEXTURE_LOADER.load('./texture/moon_normal.jpg');
NORMAL_MAP.colorSpace = THREE.NoColorSpace;

// Displacement map
const DISPLACEMENT_MAP = TEXTURE_LOADER.load('./texture/displacement.jpg');
DISPLACEMENT_MAP.colorSpace = THREE.NoColorSpace;


const MATERIAL = new THREE.MeshStandardMaterial({
     map: MOON_TEXTURE,
     color: new THREE.Color(1.05, 1.02, 0.98),
     normalMap: NORMAL_MAP,
     normalScale: new THREE.Vector2(2.0, 2.0),
     

     roughness: 0.88,
     metalness: 0.0
});

const MOON = new THREE.Mesh(GEOMETRY, MATERIAL);
SCENE.add(MOON);

// Light from Sun
const SUNLIGHT = new THREE.DirectionalLight(0xffffff, 6.0);
SUNLIGHT.position.set(10, 4, 6);

SUNLIGHT.target.position.set(0, 0, 0);
SCENE.add(SUNLIGHT.target);

SCENE.add(SUNLIGHT);

// Earthshine ambient light
const EARTHSHINE = new THREE.DirectionalLight(0xb0b6c0, 0.18);
EARTHSHINE.position.set(-6, -3, -6);
SCENE.add(EARTHSHINE);

// Hemisphere light
const HEMISPHERELIGHT = new THREE.HemisphereLight(0xf0f0f0, 0x000000, 0.015);
SCENE.add(HEMISPHERELIGHT);

// Ambient light
const AMBIENT = new THREE.AmbientLight(0xffffff, 0.06);
SCENE.add(AMBIENT);


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