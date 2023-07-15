import * as THREE from "three";
import * as TWEEN from '@tweenjs/tween.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

// Creating the scene
const scene = new THREE.Scene();

// Creating the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Creating the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.domElement.style.pointerEvents = "auto";

document.getElementById("container").appendChild(renderer.domElement);

// Creating light
const light = new THREE.PointLight(0xffffff, 4);
light.position.set(0, 2, 2);
scene.add(light);

// Set camera position
camera.position.set(0, 1, 2);
const targetPosition = new THREE.Vector3(0, 0, 0);
camera.lookAt(targetPosition);

//Laptop Model loader
const loader = new GLTFLoader();
let laptopModel = null; 

loader.load(
    "/public/models/poly_laptop.gltf",
    function (gltf) {
      laptopModel = gltf.scene.children[0];
      //scaling the laptop model in size
      laptopModel.scale.set(3, 3, 3);
      scene.add(laptopModel);
    },
    undefined,
    function (error) {
      console.log(error);
    }
  );

const zoomDuration = 2000;
const zoomDistance = 1.2;
let isZoomed = false;
let isRotating = false;

function startRotation() {
  isRotating = true;
}

function stopRotation() {
  isRotating = false;
}

function keyDownFunction(event) {
  if (!isZoomed) {
    isZoomed = true;
    const currentCameraPosition = camera.position.clone();
    const targetCameraPosition = laptopModel.position.clone().add(new THREE.Vector3(0, .75, zoomDistance));

    new TWEEN.Tween(currentCameraPosition)
      .to(targetCameraPosition, zoomDuration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        camera.position.copy(currentCameraPosition);
        camera.lookAt(targetPosition);
      })
      .onComplete(() => {
        isZoomed = false;

        // Start rotation after the zoom animation is complete
        startRotation();
      })
      .start();
  }
}

function keyUpFunction(event) {
  // Stop rotation when key is released
  stopRotation();
}

window.addEventListener("keydown", keyDownFunction);
window.addEventListener("keyup", keyUpFunction);

// Function to handle rotation
function handleRotation() {
  if (isRotating) {
    // rotation speed
    laptopModel.rotation.y += 0.01; 
  }
}

function animate() {
  requestAnimationFrame(animate);

  handleRotation();

  renderer.render(scene, camera);
  TWEEN.update();
}

animate();

// this is function for raycaster on mouse click 
// function onMouseClick(event) {
//     const canvasBounds = renderer.domElement.getBoundingClientRect();
//     const mouse = new THREE.Vector2(
//     ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1,
//     -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1
// );
  
// const raycaster = new THREE.Raycaster();
// raycaster.setFromCamera(mouse, camera);
  
// const intersects = raycaster.intersectObject(laptopModel, true);
  
// if (intersects.length > 0) {
//     const currentCameraPosition = camera.position.clone();
//       const targetCameraPosition = intersects[0].point.clone().add(new THREE.Vector3(0, 0, zoomDistance));
  
//       new TWEEN.Tween(currentCameraPosition)
//         .to(targetCameraPosition, zoomDuration)
//         .easing(TWEEN.Easing.Quadratic.InOut)
//         .onUpdate(() => {
//           camera.position.copy(currentCameraPosition);
//           camera.lookAt(targetPosition);
//         })
//         .start();
//     }
//   }
  
// window.addEventListener("click", onMouseClick);
