import * as THREE from 'three';
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';

var material;

export const run = () => {
	console.log("Loading material into scene ");

	material = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load('resources/backdrop.jpg')
	});
};

var camera, scene, renderer, controls;

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', function () {

	init();
	animate();

}, false);

function init() {

	var overlay = document.getElementById('overlay');
	overlay.remove();

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

	controls = new DeviceOrientationControls(camera);

	scene = new THREE.Scene();

	var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
	// invert the geometry on the x-axis so that all of the faces point inward
	geometry.scale(- 1, 1, 1);


	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);



	//Loading the font
	var textgeometry;
	var loader = new THREE.FontLoader();
	loader.load('MuseoModerno.json', function (font) {

		textgeometry = new THREE.TextGeometry('Hello three.js!', {
			font: font,
			size: 80,
			height: 5,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 10,
			bevelSize: 8,
			bevelOffset: 0,
			bevelSegments: 5
		});
	});

	var textmaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	var word = new THREE.Mesh(textgeometry, textmaterial);
	word.position.x = 10;
	scene.add(word);


	var boxgeometry = new THREE.BoxGeometry();
	var boxmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( boxgeometry, boxmaterial );
	cube.position.y = 20;
	scene.add( cube );


}

function animate() {

	window.requestAnimationFrame(animate);

	controls.update();
	renderer.render(scene, camera);

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}
