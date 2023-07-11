import * as THREE from "three";

//creating the scene
const scene = new THREE.Scene();
// creating the camera
const camera = new THREE. PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// creating the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById('canvas-container').appendChild(renderer.domElement);

// creating light
const light = new THREE.PointLight(0xFFFFFF, 1);
light.position.set(0, 0, 5);
scene.add(light);

// cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

// rendering the scene
function animate () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    renderer.render( scene, camera );
}

animate();


