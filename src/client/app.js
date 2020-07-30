import * as THREE from 'three';
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';
import {loadAssociationsToJSON} from './jsonLoader.js';

var wallmaterial;

var wordMesh;
var outsiderObj = '';
var peripheryObj = '';

var outsiderTextMeshArray = [];
var peripheryTextMeshArray = [];

export const run = () => {
	console.log("Loading material into scene ");

	wallmaterial = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load('resources/backdrop.jpg')
	});

	loadAssociationsToJSON();
	createMeshArrayWithAssociations();


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

	var buildingGeometry = new THREE.SphereBufferGeometry(500, 60, 40);
	// invert the geometry on the x-axis so that all of the faces point inward
	buildingGeometry.scale(- 1, 1, 1);


	var buildingMesh = new THREE.Mesh(buildingGeometry, wallmaterial);
	scene.add(buildingMesh);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);


	/*

	//Loading the font
	var textgeometry;
	var loader = new THREE.FontLoader();
	loader.load('MuseoModerno.json', function (font) {

		textgeometry = new THREE.TextGeometry('Hello three.js!', {
			font: font,
			size: 300,
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
	word.position.x = -20;
	scene.add(word);


	var boxgeometry = new THREE.BoxGeometry();
	var boxmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( boxgeometry, boxmaterial );
	cube.position.y = -20;
	scene.add( cube );

*/

/*
var loader = new THREE.FontLoader();
var textgeometry;

loader.load( 'resources/helvetiker_regular.typeface.json', function ( font ) {

	textgeometry = new THREE.TextGeometry( 'Hello three.js!', {
		font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
	} );
} );


var textmaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var textMesh1 = new THREE.Mesh( textgeometry, textmaterial );
textMesh1.position.y = -20;
scene.add(textMesh1);
*/
/*
var boxgeometry = new THREE.BoxGeometry();
var boxmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( boxgeometry, boxmaterial );
cube.position.y = -22;
scene.add( cube );
*/
var planegeometry = new THREE.PlaneBufferGeometry( 50, 200);
var planematerial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var plane = new THREE.Mesh( planegeometry, planematerial );
plane.position.y = -20;
plane.rotation.x = -90;
scene.add( plane );


/*
1. JSON OBJEKTET laddas in
2. Varje association i JSONobjektet laddas in till en array av TextGeometri Mesher
3. Animationen trackar om positionen går frammåt eller bakåt
4. Om den går bakom en viss gräns, byt i arrayen
5. frammåt och upprepa
*/


/*
var loader = new THREE.FontLoader();

loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
  var geometry = new THREE.TextGeometry( 'Hello three.js!', {
	font: font,
	size: 1,
	height: 0.5,
	curveSegments: 4,
	bevelEnabled: true,
	bevelThickness: 0.02,
	bevelSize: 0.05,
	bevelSegments: 3
  } );
  geometry.center();
  var material = new THREE.MeshNormalMaterial();
  wordMesh = new THREE.Mesh( geometry, material );
  wordMesh.position.y = -10;
  wordMesh.rotation.x = -90;
	scene.add( wordMesh );
} );
*/

			var material = new THREE.MeshNormalMaterial();
			wordMesh = new THREE.Mesh( outsiderTextMeshArray[1], material );
			wordMesh.position.y = -10;
			wordMesh.rotation.x = -90;
scene.add(wordMesh);

}

// -----------------  GET REQUEST OF ASSOCIATIONS -----------------





//Helper function to get length of object
function length(obj) {
	return Object.keys(obj).length;
}



function createMeshArrayWithAssociations(){


	var loader = new THREE.FontLoader();

	for(var i = 0; i < 1 + length(outsiderObj); i++){
		//Create a new text mesh object and push it to the array

		loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
			var geometry = new THREE.TextGeometry( outsiderObj.association[i].association, {
			  font: font,
			  size: 1,
			  height: 0.5,
			  curveSegments: 4,
			  bevelEnabled: true,
			  bevelThickness: 0.02,
			  bevelSize: 0.05,
			  bevelSegments: 3
			} );
			geometry.center();

			//var material = new THREE.MeshNormalMaterial();
			//wordMesh = new THREE.Mesh( geometry, material );
			//wordMesh.position.y = -10;
			//wordMesh.rotation.x = -90;
			outsiderTextMeshArray.push(geometry);
		  } );


	}


}



function animate() {

	

	window.requestAnimationFrame(animate);
	//wordMesh.position.y -= 0.02;

	controls.update();
	renderer.render(scene, camera);

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}
