function loadAssociationsToJSON(){

	var fileloader = new THREE.FileLoader();
	console.log('GET associations');
	
//load a text file and output the result to the console
fileloader.load(
	// resource URL
	'https://radiant-ridge-37495.herokuapp.com/api/outsiderAssociations',

	// onLoad callback
	function ( data ) {
		// output the text to the console
		console.log( data )

		//outsiderObj = JSON.parse(data);
		//console.log(length (outsiderObj.association));
		//console.log(outsiderObj.association[1].association)	

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

//load a text file and output the result to the console
fileloader.load(
	// resource URL
	'https://radiant-ridge-37495.herokuapp.com/api/peripheryAssociations',

	// onLoad callback
	function ( data ) {
		// output the text to the console
		console.log( data );
	

		peripheryObj = JSON.parse(data);
		//console.log(length (outsiderObj.association));
		//console.log(outsiderObj.association[1].association)	

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

export {loadAssociationsToJSON};