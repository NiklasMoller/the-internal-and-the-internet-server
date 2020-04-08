
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



        // LOAD CUBE TEXTURE
        new THREE.CubeTextureLoader()
        .setPath('/resources/')
        .load(

            // urls of images used in the cube texture
            [
                'wall1.png',
                'wall2.png',
                'sky.png',
                'ground.png',
                'wall3.png',
                'wall4.png'

            ],

            // what to do when loading is over
            function (cubeTexture) {


              // Geometry
              var geometry = new THREE.SphereGeometry(1, 20, 20);

              // Material
              var material = new THREE.MeshBasicMaterial({

              // CUBE TEXTURE can be used with
              // the environment map property of
              // a material.
              envMap: cubeTexture

});

// Mesh
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

                // CUBE TEXTURE is also an option for a background
                scene.background = cubeTexture;
                renderer.render(scene, camera);

            }

        );



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

				//var helperGeometry = new THREE.BoxBufferGeometry( 100, 100, 100, 4, 4, 4 );
				//var helperMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
				//var helper = new THREE.Mesh( helperGeometry, helperMaterial );
				//scene.add( helper );



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
