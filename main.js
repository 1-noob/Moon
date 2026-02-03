import * as  THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';

const TEXTURE_LOADER = new THREE.TextureLoader();

// Scene
const SCENE = new THREE.Scene();
const SKY_TEXTURE = TEXTURE_LOADER.load('./texture/nightsky.jpg');
SKY_TEXTURE.colorSpace = THREE.SRGBColorSpace;
SKY_TEXTURE.flipY = false;
SKY_TEXTURE.wrapS = THREE.ClampToEdgeWrapping;
SKY_TEXTURE.wrapT = THREE.ClampToEdgeWrapping;  
SKY_TEXTURE.needsUpdate = true;
SCENE.background = SKY_TEXTURE;
SCENE.backgroundIntensity = 1.6;

// Camera
const CAMERA = new THREE.PerspectiveCamera(
    45, // field of view 75 degrees
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // near clipping plane
    1000 // far clipping plane
);

const BASE_ASPECT = 16/9;
const BASE_CAMERA_Z = 3.0;

const SCALE_FACTOR = 0.8;

function updateCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    CAMERA.aspect = aspect;

    // Zoom out for Tall Screens
    CAMERA.position.z = BASE_CAMERA_Z * (BASE_ASPECT/aspect) * SCALE_FACTOR;

    CAMERA.updateProjectionMatrix();
}

// Renderer
const RENDERER = new THREE.WebGLRenderer({ antialias: true });
RENDERER.setSize(window.innerWidth, window.innerHeight);
RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, 2));
RENDERER.physicallyCorrectLights = true;
RENDERER.outputColorSpace = THREE.SRGBColorSpace;
RENDERER.toneMapping = THREE.ACESFilmicToneMapping;
RENDERER.toneMappingExposure = 3.2;
document.body.appendChild(RENDERER.domElement);
updateCamera();

// Geometry 
const GEOMETRY = new THREE.SphereGeometry(1, 256, 256);
GEOMETRY.computeVertexNormals();

// Moon Texture
const MOON_TEXTURE = TEXTURE_LOADER.load('./texture/moon_colour.jpg');
MOON_TEXTURE.colorSpace = THREE.SRGBColorSpace;

// Normal map
const NORMAL_MAP = TEXTURE_LOADER.load('./texture/moon_normal.jpg');
NORMAL_MAP.flipY = false;
NORMAL_MAP.colorSpace = THREE.NoColorSpace;

// Displacement map
const DISPLACEMENT_MAP = TEXTURE_LOADER.load('./texture/displacement.jpg');
DISPLACEMENT_MAP.colorSpace = THREE.NoColorSpace;


const MATERIAL = new THREE.MeshStandardMaterial({
     map: MOON_TEXTURE,
     color: new THREE.Color(1.35, 1.30, 1.25),

     normalMap: NORMAL_MAP,
     normalScale: new THREE.Vector2(1.2, 1.2),

     displacementMap: DISPLACEMENT_MAP,
     displacementScale: 0.05,

     roughness: 0.6,
     metalness: 0.0,

     emissive: new THREE.Color(0x222222),
     emissiveIntensity: 0.0
});

const MOON = new THREE.Mesh(GEOMETRY, MATERIAL);
SCENE.add(MOON);

// Light from Sun
const SUNLIGHT = new THREE.DirectionalLight(0xffffff, 12.0);
SCENE.add(SUNLIGHT);
SCENE.add(SUNLIGHT.target);
SUNLIGHT.position.set(20, 6, 15);
SUNLIGHT.intensity = 1.25;
SUNLIGHT.target.position.set(0, 0, 0);
SUNLIGHT.target.updateMatrixWorld();

// Earthshine ambient light
const EARTHSHINE = new THREE.AmbientLight(0x8899aa, 1);
EARTHSHINE.position.set(-6, -2, -4);
SCENE.add(EARTHSHINE);

// Ambient light
const AMBIENT = new THREE.AmbientLight(0xffffff, 0.02);
SCENE.add(AMBIENT);


// Animation loop
let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    // Yaw (main rotation)
    MOON.rotation.y = t * 0.2; // rotates around Y

    // Subtle pitch oscillation (tilt back & forth)
    MOON.rotation.x = Math.sin(t * 0.3) * 0.02;

    // Very subtle roll (like spinning in space)
    MOON.rotation.z = Math.sin(t * 0.15) * 0.01;

    RENDERER.render(SCENE, CAMERA);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    updateCamera();
    RENDERER.setSize(window.innerWidth, window.innerHeight);
})