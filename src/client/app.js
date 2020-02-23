
export const run = ()=>{

  console.log("Executed function in index.js but function running in app.js");

};

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


			import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';

			var camera, scene, renderer, controls;

			var startButton = document.getElementById( 'startButton' );
			startButton.addEventListener( 'click', function () {

				init();
				animate();

			}, false );

			function init() {

				var overlay = document.getElementById( 'overlay' );
				overlay.remove();



				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
				controls = new DeviceOrientationControls( camera );
				scene = new THREE.Scene();


        var loader = new GLTFLoader();

        loader.load( 'resources/scene.gltf', function ( gltf ) {
        	scene.add( gltf.scene );
        }, undefined, function ( error ) {
        	console.error( error );
          console.log("Could not load the 3D object");
        } );


console.log("Hello from THREE.js");

/*
				var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
				// invert the geometry on the x-axis so that all of the faces point inward
				geometry.scale( - 1, 1, 1 );

				var material = new THREE.MeshBasicMaterial( {
					map: new THREE.TextureLoader().load( 'resources/interior.jpg' )
				} );

				var mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );

        */

				var helperGeometry = new THREE.BoxBufferGeometry( 100, 100, 100, 4, 4, 4 );
				var helperMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
				var helper = new THREE.Mesh( helperGeometry, helperMaterial );
				scene.add( helper );



				//

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.outputEncoding = THREE.sRGBEncoding; //Configure the encoding to load GLTF data
				document.body.appendChild( renderer.domElement );

				//

				window.addEventListener( 'resize', onWindowResize, false );


			}

			function animate() {

				window.requestAnimationFrame( animate );

				controls.update();
				renderer.render( scene, camera );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}


      function openFullscreen(elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
          elem.msRequestFullscreen();
        }
      }
