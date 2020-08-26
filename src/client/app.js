import * as THREE from 'three';
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';

var wallmaterial;

var amountOfOutsiderAssociations = 0;
var amountOfPeripheryAssociations = 0;

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

var camera, renderer, controls;

var scene = new THREE.Scene();

var numberOfIterations = 0;

const TWO_PI = 6.28318530718;
const PI = 3.14159265359;

var outsiderAssociationsText = 'TEST \n';
var peripheryAssociationsText = 'TEST2 \n';

var startButton = document.getElementById('startButton');

//To load fonts
var loader = new THREE.FontLoader();

var outsiderLoader = new THREE.FontLoader();
var outsiderIndex = 1;

var peripheryLoader = new THREE.FontLoader();
var peripheryIndex = 1;

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

	removeOverlay();
	setupTHREEStartComponents();

	createWordGeometries();
	
	animate();

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

	scene.add(outsiderRoot);

}



  function loadNextOutsiderWord() {

	//console.log('In loadNextOutsiderWord');

	if (outsiderIndex > amountOfOutsiderAssociations) return;
  
	outsiderLoader.load( './Roboto_Regular.json', function ( font ) {

		var outsiderTextString = JSON.stringify(outsiderObj.association[outsiderIndex - 1].association);
		outsiderTextString = outsiderTextString.slice(1, -1);
		outsiderTextString = 'Association: ' + outsiderIndex + '\n' + outsiderTextString;
		console.log('in loadNextOutsiderWord' + outsiderTextString);

		var geometry = new THREE.TextGeometry( outsiderTextString, {
		  font: font,
		  size: 2,
		  height: 0.02,
		  curveSegments: 4,
		  bevelEnabled: true,
		  bevelThickness: 0.02,
		  bevelSize: 0.05,
		  bevelSegments: 3
		} );

		geometry.center();


		var color = new THREE.Color("hsl(45, 99%, 60%)");
		var lerpColor = new THREE.Color("hsl(15, 99%, 60%)");
		var lerbBy = 1 / amountOfOutsiderAssociations;
		var lerpValue = outsiderIndex * lerbBy;
		color.lerpHSL(lerpColor, lerpValue);
		console.log('Lerp value: ' + lerpValue + 'and style: ' + color.getHexString());

		var colorInMaterial = '0x' + color.getHexString();
		var colorInMaterial = colorInMaterial.toUpperCase();

		var material = 	new THREE.MeshLambertMaterial({color: colorInMaterial});
		//var material = new THREE.MeshBasicMaterial({color: 0x000000});
		var outsiderWordMesh = new THREE.Mesh( geometry, material );
		outsiderWordMesh.position.y = 5;
		outsiderWordMesh.position.x = 25;
		outsiderWordMesh.rotation.y = (TWO_PI * 0.75);
		outsiderWordMesh.visible = false;
		outsiderRoot.add(outsiderWordMesh);
  
		outsiderIndex++;
		  loadNextOutsiderWord();
		  if(outsiderIndex === 3){
			hasLoded = true;
		  }


	  }	);
  
	}




function createWordGeometries(){

	loadNextOutsiderWord();

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
			//console.log(data)

			outsiderObj = JSON.parse(data);

			amountOfOutsiderAssociations = length(outsiderObj.association);

			var innerHTML1 = amountOfOutsiderAssociations + ' associations to the word OUTSIDER'

			document.getElementById("numberOfOutsiderAssociations").innerHTML = innerHTML1;

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
			//console.log(data);

			peripheryObj = JSON.parse(data);

			amountOfPeripheryAssociations = length(peripheryObj.association);

			var innerHTML2 = amountOfPeripheryAssociations + ' associations to the word PERIPHERY'

			document.getElementById("numberOfPeripheryAssociations").innerHTML = innerHTML2;
			document.getElementById("startButton").disabled = false;



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

var tempIndex = 0;

function animate() {


	numberOfIterations++;

			if(hasLoded){

			
				if(numberOfIterations % 400 === 2){

					if(tempIndex + 2 > amountOfOutsiderAssociations){
						outsiderRoot.children[tempIndex].visible = false;
						tempIndex = 0;
					}

					outsiderRoot.children[tempIndex].visible = false;

					tempIndex++;

					outsiderRoot.children[tempIndex].visible = true;

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
