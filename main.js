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
document.getElementById("container").appendChild(renderer.domElement);

// Creating light
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(0, 2, 2);
scene.add(light);

//Set camera position
camera.position.set(0, 1, 2);
const targetPosition = new THREE.Vector3(0, 0, 0);
camera.lookAt(targetPosition);

//Laptop Model loader
const loader = new GLTFLoader();
loader.load(
    "/public/models/poly_laptop.gltf",
    function(gltf){
        const laptopModel = gltf.scene;
        //scaling the laptop model in size
        laptopModel.scale.set(3, 3, 3); 
        scene.add(laptopModel)
    },
    undefined,
    function(error){
        console.log(error)
    }
);



// Rendering the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
}

animate();