var loader = new THREE.ObjectLoader();

loader.load(
	// resource URL
	"https://radiant-ridge-37495.herokuapp.com/api/outsiderAssociations",

	// onLoad callback
	// Here the loaded data is assumed to be an object
	function ( obj ) {
		// Add the loaded object to the scene
		//scene.add( obj );
    console.log(obj);
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
