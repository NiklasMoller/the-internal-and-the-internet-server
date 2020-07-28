import * as THREE from 'three';
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';

var wallmaterial;

var wordMesh;

export const run = () => {
	console.log("Loading material into scene ");

	wallmaterial = new THREE.MeshBasicMaterial({
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




var fileloader = new THREE.FileLoader();

//load a text file and output the result to the console
fileloader.load(
	// resource URL
	'https://radiant-ridge-37495.herokuapp.com/api/outsiderAssociations',

	// onLoad callback
	function ( data ) {
		// output the text to the console
		console.log( data )


		//var obj = JSON.parse('{"association":[{"_id":"5eedf686c80fe037401c5630","association":"helloWorldIamAtGothia","__v":0},{"_id":"5eee00ea6784614dc47b53fc","association":"apple","__v":0},{"_id":"5eee1a157603f4523006b2f8","association":"myNewAssociation","__v":0},{"_id":"5eee1a607603f4523006b2fa","association":"anotherAssociation with spaces","__v":0},{"_id":"5eef2a2fefdb570004f18729","association":"1136","__v":0},{"_id":"5eef2af3efdb570004f1872d","association":"testing","__v":0},{"_id":"5eef2b2cefdb570004f1872f","association":"ÖÖÖÖÖ sdvsv sdvsdv","__v":0},{"_id":"5eef2bdeefdb570004f18731","association":"Someone who is poor","__v":0},{"_id":"5eef42d563188b000468de3e","association":"Artists are outsiders","__v":0},{"_id":"5eefaa5a241d52000428fd4f","association":"Incels","__v":0},{"_id":"5ef7624256a2fb00045280a9","association":"My teammates","__v":0}]}');
		var obj = JSON.parse(data);
		console.log('ALL ASSOCIATIONS: ' + obj.association);
		console.log(length (obj.association));
		console.log(obj.association[1].association)

		
		
		

	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.error( 'An error happened' );
	}
);




}

//Helper function to get length of object
function length(obj) {
	return Object.keys(obj).length;
}



function animate() {

	

	window.requestAnimationFrame(animate);
	wordMesh.position.y -= 0.02;

	controls.update();
	renderer.render(scene, camera);

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}
