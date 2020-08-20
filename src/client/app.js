import * as THREE from 'three';
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';

var wallmaterial;

var outsiderWordMesh;
var peripheryWordMesh;

var outsiderObj = '';
var peripheryObj = '';

var outsiderObjects = [];
var peripheryObjects = [];

var outsiderUUID = [];
var tempUUID = '';

var hasLoded = false;

//Root
//var planeRoot, wordRoot1, wordRoot2;
var rootHasLoaded = false;
var wordMesh, wordMesh2;

var wordRoot = new THREE.Object3D();

var outsiderRoot = new THREE.Object3D();

var camera, scene, renderer, controls;

var numberOfIterations = 0;



const TWO_PI = 6.28318530718;
const PI = 3.14159265359;

var outsiderAssociationsText = 'TEST \n';
var peripheryAssociationsText = 'TEST2 \n';

var startButton = document.getElementById('startButton');

//To load fonts
var loader = new THREE.FontLoader();

startButton.addEventListener('click', function () {

	init();

}, false);

export const preLoad = () => {

	wallmaterial = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load('resources/backdrop.jpg')
	});

	loadAssociationsToJSON();


};

function init() {


	console.log('13.22');

	




	removeOverlay();
	setupTHREEStartComponents();


	//createTextString();

	addWordToScene();

	//addTestPlane();



	createWordGeometries();
	animate();

	//debugRoots();



}



function debugRoots(){


	var group = new THREE.Object3D();

	for (var i = 0; i < 10; i++) {
	
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var material = new THREE.MeshNormalMaterial();
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = 10;
	
		group.add(mesh);
	
	}
	
	scene.add(group);

	//group.remove(group.children[i]);

	console.log('!!! - - Position is: ' + group.children[1].position.x);



}


function addTestPlane(){


	console.log("Add test plane 17 aug");

	/*
	const objects = [];

	planeRoot = new THREE.Object3D();
	planeRoot.position.y = -20;
	planeRoot.rotation.x = (TWO_PI);

	scene.add(planeRoot);


	wordRoot1 = new THREE.Object3D();
	//planeRoot.add(wordRoot1);


	wordRoot2 = new THREE.Object3D();



	objects.push(planeRoot);

	const planegeometry = new THREE.PlaneBufferGeometry(10, 10);
	const planematerial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
	const planeMesh = new THREE.Mesh(planegeometry, planematerial);
	//planeMesh.position.y = -20;
	//planeMesh.rotation.x = -90;
	//planeRoot.add(planeMesh);
	//objects.push(planeMesh);


	const planegeometry2 = new THREE.PlaneBufferGeometry(10, 10);
	const planematerial2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
	const planeMesh2 = new THREE.Mesh(planegeometry2, planematerial2);
	//planeMesh.position.y = -20;
	planeMesh2.rotation.x = (TWO_PI * 0.5);
	//planeRoot.add(planeMesh2);

*/

		loader.load( './Roboto_Regular.json', function ( font ) {
	  var geometry = new THREE.TextGeometry( "WorldASITIS SOO MUCH", {
		font: font,
		size: 0.5,
		height: 0.02,
		curveSegments: 4,
		bevelEnabled: true,
		bevelThickness: 0.02,
		bevelSize: 0.05,
		bevelSegments: 3
	  } );
	  geometry.center();
	  //var material = 	new THREE.MeshLambertMaterial({color: 0xb33131});
	  var material = new THREE.MeshBasicMaterial({color: 0x000000});
	  wordMesh = new THREE.Mesh( geometry, material );
	  wordMesh.position.y = -20;
	  //wordMesh.rotation.y = (TWO_PI * 0.75);
	  //wordMesh.rotation.x = (TWO_PI * 0.5);
	  scene.add(wordMesh);
	} );

	loader.load( './Roboto_Regular.json', function ( font ) {
		var geometry = new THREE.TextGeometry( "Hello", {
		  font: font,
		  size: 0.5,
		  height: 0.02,
		  curveSegments: 4,
		  bevelEnabled: true,
		  bevelThickness: 0.02,
		  bevelSize: 0.05,
		  bevelSegments: 3
		} );
		geometry.center();
		//var material = 	new THREE.MeshLambertMaterial({color: 0xb33131});
		var material = new THREE.MeshBasicMaterial({color: 0x000000});
		wordMesh2 = new THREE.Mesh( geometry, material );
		wordMesh2.position.y = -20;
		//wordMesh.rotation.y = (TWO_PI * 0.75);
		//wordMesh.rotation.x = (TWO_PI * 0.5);
		//wordRoot2.add(wordMesh2);
	  } );


	rootHasLoaded = true;

}


function addPlane() {
	var planegeometry = new THREE.PlaneBufferGeometry(50, 200);
	var planematerial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
	var plane = new THREE.Mesh(planegeometry, planematerial);
	plane.position.y = -20;
	plane.rotation.x = -90;
	scene.add(plane);
}


function removeOverlay() {
	var overlay = document.getElementById('overlay');
	overlay.remove();
}


function setupTHREEStartComponents() {

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

	controls = new DeviceOrientationControls(camera);

	scene = new THREE.Scene();

	var buildingGeometry = new THREE.SphereBufferGeometry(500, 60, 40);
	// invert the geometry on the x-axis so that all of the faces point inward
	buildingGeometry.scale(- 1, 1, 1);

	var light = new THREE.AmbientLight( 0x2fc975, 2.5 );
	scene.add( light );


	var buildingMesh = new THREE.Mesh(buildingGeometry, wallmaterial);
	scene.add(buildingMesh);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);

}

function createWordGeometries(){

	for(var i = 0; i < length(outsiderObj.association); i++){

		loader.load( './Roboto_Regular.json', function ( font ) {
		  var geometry = new THREE.TextGeometry( outsiderObj.association[i], {
			font: font,
			size: 0.5,
			height: 0.02,
			curveSegments: 4,
			bevelEnabled: true,
			bevelThickness: 0.02,
			bevelSize: 0.05,
			bevelSegments: 3
		  } );
		  geometry.center();
		  var material = 	new THREE.MeshLambertMaterial({color: 0xb33131});
		  //var material = new THREE.MeshBasicMaterial({color: 0x000000});
		  outsiderWordMesh = new THREE.Mesh( geometry, material );
		  outsiderWordMesh.position.y = -10;
		  outsiderWordMesh.position.x = 0;
		  outsiderWordMesh.rotation.y = (TWO_PI * 0.5);
		  //outsiderWordMesh.visible = false;
		outsiderRoot.add(outsiderWordMesh);

			hasLoded = true;
		} );

	}

	scene.add(outsiderRoot);

}



function addWordToScene() {

	console.log('Adding the associations to mesh and scene');


	//./RussoOneRegular.json



	loader.load( './Roboto_Regular.json', function ( font ) {
	  var geometry = new THREE.TextGeometry( outsiderAssociationsText, {
		font: font,
		size: 0.5,
		height: 0.02,
		curveSegments: 4,
		bevelEnabled: true,
		bevelThickness: 0.02,
		bevelSize: 0.05,
		bevelSegments: 3
	  } );
	  geometry.center();
	  var material = 	new THREE.MeshLambertMaterial({color: 0xb33131});
	  //var material = new THREE.MeshBasicMaterial({color: 0x000000});
	  outsiderWordMesh = new THREE.Mesh( geometry, material );
	  outsiderWordMesh.position.y = 10;
	  outsiderWordMesh.position.x = 18;
	  outsiderWordMesh.rotation.y = (TWO_PI * 0.75);

		scene.add( outsiderWordMesh );
	} );


	loader.load( './Roboto_Regular.json', function ( font ) {
	  var geometry = new THREE.TextGeometry( peripheryAssociationsText, {
		font: font,
		size: 0.5,
		height: 0.02
		//curveSegments: 4,
		//bevelEnabled: true,
		//bevelThickness: 0.02,
		//bevelSize: 0.05,
		//bevelSegments: 3
	  } );
	  geometry.center();
	 // var material = new THREE.MeshNormalMaterial();
	  var material = 	new THREE.MeshLambertMaterial({color: 0xab0000});
	  peripheryWordMesh = new THREE.Mesh( geometry, material );
	  peripheryWordMesh.position.y = 10;
	  peripheryWordMesh.position.x = -18;
	  peripheryWordMesh.rotation.y = TWO_PI * 0.25;
		scene.add( peripheryWordMesh );
	} );

}


function createTextString(){

	for(var i = 0; i < length(outsiderObj.association); i++){

		outsiderAssociationsText += outsiderObj.association[i].association + '\n';

	}

	for(var i = 0; i < length(peripheryObj.association); i++){

		peripheryAssociationsText += peripheryObj.association[i].association + '\n';

	}


}



// ----------------------------  GET-REQUEST OF ASSOCIATIONS -------------------------
function loadAssociationsToJSON() {

	var fileloader = new THREE.FileLoader();
	console.log('GET associations');

	//load a text file and output the result to the console
	fileloader.load(
		// resource URL
		'https://radiant-ridge-37495.herokuapp.com/api/outsiderAssociations',

		// onLoad callback
		function (data) {
			// output the text to the console
			console.log(data)

			outsiderObj = JSON.parse(data);

		},

		// onProgress callback
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},

		// onError callback
		function (err) {
			console.error('An error happened');
		}
	);

	//load a text file and output the result to the console
	fileloader.load(
		// resource URL
		'https://radiant-ridge-37495.herokuapp.com/api/peripheryAssociations',

		// onLoad callback
		function (data) {
			// output the text to the console
			console.log(data);

			peripheryObj = JSON.parse(data);

		},

		// onProgress callback
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},

		// onError callback
		function (err) {
			console.error('An error happened');
		}
	);
}

//--------------------------------------------------------------------------

//Helper function to get length of object
function length(obj) {
	return Object.keys(obj).length;
}

//---------------------------------------------------------------------------

var counter = 0;
var counterYes = true;

function animate() {


	numberOfIterations++;

	if(numberOfIterations % 120 == 1){
		if(hasLoded){
			outsiderRoot.children[0].visible = true;
		}
	}

	window.requestAnimationFrame(animate);

	controls.update();
	renderer.render(scene, camera);



}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}
