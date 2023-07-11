import * as THREE from "three";
import * as TWEEN from '@tweenjs/tween.js';

// Creating the scene
const scene = new THREE.Scene();
// Creating the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Creating the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Creating light
const light = new THREE.PointLight(0xFFFFFF, 1);
light.position.set(0, 0, 5);
scene.add(light);

camera.position.set(0, 0, 7);
const targetPosition = new THREE.Vector3(0, 0, 0);
camera.lookAt(targetPosition);

const laptopWidth = 3;
const laptopHeight = 0.2;
const laptopDepth = 2;
const laptopColor = 0x808080;

const laptopGeometry = new THREE.BoxGeometry(laptopWidth, laptopHeight, laptopDepth);
const laptopMaterial = new THREE.MeshStandardMaterial({ color: laptopColor });
const laptop = new THREE.Mesh(laptopGeometry, laptopMaterial);
scene.add(laptop);

// Set initial rotation of the laptop
laptop.rotation.x = 0;

// Animation parameters
const openRotation = -Math.PI / 2; // Open rotation angle
const closeRotation = 0; // Close rotation angle
const duration = 1000; // Animation duration in milliseconds

// Function to open the laptop
function openLaptop() {
  new TWEEN.Tween(laptop.rotation)
    .to({ x: openRotation }, duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

// Function to close the laptop
function closeLaptop() {
  new TWEEN.Tween(laptop.rotation)
    .to({ x: closeRotation }, duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

function onMouseClick(event) {
  const canvasBounds = renderer.domElement.getBoundingClientRect();
  const clickX = event.clientX - canvasBounds.left;
  const clickY = event.clientY - canvasBounds.top;
  if (clickX >= 0 && clickX < canvasBounds.width && clickY >= 0 && clickY < canvasBounds.height) {
    if (laptop.rotation.x === closeRotation) {
      openLaptop();
    } else {
      closeLaptop();
    }
  }
}

window.addEventListener('click', onMouseClick);

// Rendering the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
}

animate();