import * as THREE from 'three';
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';



var wallmaterial;

var outsiderWordMesh;
var peripheryWordMesh;

var outsiderObj = '';
var peripheryObj = '';

var outsiderTextMeshArray = [];
var peripheryTextMeshArray = [];

var camera, scene, renderer, controls;

var wordcounter;

var outsiderAssociationsText = 'TEST \n';
var peripheryAssociationsText = 'TEST2 \n';

var startButton = document.getElementById('startButton');

//To load fonts
var loader = new THREE.FontLoader();

startButton.addEventListener('click', function () {

	init();
	animate();

}, false);

export const preLoad = () => {

	wallmaterial = new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load('resources/backdrop.jpg')
	});

	loadAssociationsToJSON();
	//createMeshArrayWithAssociations();

};

function init() {

	wordcounter = 0;

	removeOverlay();
	setupTHREEStartComponents();
	//addPlanes();


	createTextString();

	addWordToScene();


	/*
	1. Skapa en text string genom att iterrera igenom alla orden och lägg till /n däri
	2. Lägg till texten
	3. 
	*/


}


function addPlanes() {
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


	var buildingMesh = new THREE.Mesh(buildingGeometry, wallmaterial);
	scene.add(buildingMesh);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);

}

function addWordToScene() {

	loader.load( './MuseoModerno.json', function ( font ) {
	  var geometry = new THREE.TextGeometry( outsiderAssociationsText, {
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
	  outsiderWordMesh = new THREE.Mesh( geometry, material );
	  outsiderWordMesh.position.y = 25;
	  outsiderWordMesh.position.x = 45;
	  //outsiderWordMesh.rotation.x = -90;
	  //outsiderWordMesh.rotation.y = 210; STRAIGHT OUT
	  outsiderWordMesh.rotation.y = 100;

		scene.add( outsiderWordMesh );
	} );

	
	loader.load( './MuseoModerno.json', function ( font ) {
	  var geometry = new THREE.TextGeometry( peripheryAssociationsText, {
		font: font,
		size: 1,
		height: 0.02,
		curveSegments: 4,
		bevelEnabled: true,
		bevelThickness: 0.02,
		bevelSize: 0.05,
		bevelSegments: 3
	  } );
	  geometry.center();
	  var material = new THREE.MeshBasicMaterial({color: 0x403b2c});
	  peripheryWordMesh = new THREE.Mesh( geometry, material );
	  peripheryWordMesh.position.y = 45;
	  peripheryWordMesh.position.x = -45;
	  peripheryWordMesh.rotation.x = -70;
		scene.add( peripheryWordMesh );
	} );

}

function removeWordFromScene(){
	scene.remove(outsiderWordMesh);
}

function updateCounter(){
	wordcounter += wordcounter;
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
			//console.log(length (outsiderObj.association));
			console.log('1:' + outsiderObj.association[1].association)	

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
			//console.log(length (outsiderObj.association));
			//console.log(outsiderObj.association[1].association)	

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

function createMeshArrayWithAssociations() {


	var loader = new THREE.FontLoader();

	for (var i = 0; i < 1 + length(outsiderObj); i++) {
		//Create a new text mesh object and push it to the array

		loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
			var geometry = new THREE.TextGeometry(outsiderObj.association[i].association, {
				font: font,
				size: 1,
				height: 0.5,
				curveSegments: 4,
				bevelEnabled: true,
				bevelThickness: 0.02,
				bevelSize: 0.05,
				bevelSegments: 3
			});
			geometry.center();

			//var material = new THREE.MeshNormalMaterial();
			//outsiderWordMesh = new THREE.Mesh( geometry, material );
			//outsiderWordMesh.position.y = -10;
			//outsiderWordMesh.rotation.x = -90;
			outsiderTextMeshArray.push(geometry);
		});


	}


}



function animate() {



	window.requestAnimationFrame(animate);
	
	/*
	if(outsiderWordMesh.position.y > -12){
		outsiderWordMesh.position.y -= 0.02;
	}else{
		//removeWordFromScene();
		//addWordToScene();
	}
	*/


	outsiderWordMesh.rotation.y += 0.5;
	var position = 	outsiderWordMesh.rotation.y;
	console.log(position);

	controls.update();
	renderer.render(scene, camera);

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}


