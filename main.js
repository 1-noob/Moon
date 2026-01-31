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

CAMERA.position.z = 3.0;

// Renderer
const RENDERER = new THREE.WebGLRenderer({ antialias: true });
RENDERER.setSize(window.innerWidth, window.innerHeight);
RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, 2));
RENDERER.physicallyCorrectLights = true;
RENDERER.outputColorSpace = THREE.SRGBColorSpace;
RENDERER.toneMapping = THREE.ACESFilmicToneMapping;
RENDERER.toneMappingExposure = 3.2;
document.body.appendChild(RENDERER.domElement);

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
     normalScale: new THREE.Vector2(3.2, 2.6),

     displacementMap: DISPLACEMENT_MAP,
     displacementScale: 0.007,

     roughness: 0.6,
     metalness: 0.0,

     emissive: new THREE.Color(0x222222),
     emissiveIntensity: 0.35
});

const MOON = new THREE.Mesh(GEOMETRY, MATERIAL);
SCENE.add(MOON);

// Light from Sun
const SUNLIGHT = new THREE.DirectionalLight(0xffffff, 12.0);
SCENE.add(SUNLIGHT);
SCENE.add(SUNLIGHT.target);
SUNLIGHT.position.set(12, 2.5, 2);
SUNLIGHT.intensity = 1.0;
SUNLIGHT.target.position.set(0, 0, 0);

// Earthshine ambient light
const EARTHSHINE = new THREE.AmbientLight(0x8899aa, 0.6);
EARTHSHINE.position.set(-6, -2, -4);
SCENE.add(EARTHSHINE);

// Ambient light
const AMBIENT = new THREE.AmbientLight(0xffffff, 0.12);
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
})