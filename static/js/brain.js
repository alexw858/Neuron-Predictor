//You can find it here : https://github.com/mrdoob/three.js/tree/cf584a60bdfd24c42eaa81d484533364742bda44/examples/js/loaders

var renderer, scene, camera, banana, light1;

var ww = window.innerWidth,
	wh = window.innerHeight;

function init(){

	renderer = new THREE.WebGLRenderer({canvas : document.getElementById('scene')});
	renderer.setSize(ww/2,wh/2);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(50,ww/wh, 0.1, 10000 );
	camera.position.set(0,0,3);
	scene.add(camera);

	//Add a light in the scene
	// directionalLight = new THREE.DirectionalLight( 0xe1ada4, 0.8 );
	// directionalLight.position.set( 0, 0, 350 );
	// directionalLight.lookAt(new THREE.Vector3(0,0,0));
	// scene.add( directionalLight );


	var sphere = new THREE.SphereBufferGeometry( 100, 16, 8 );

	light1 = new THREE.PointLight( 0xff0040, 2, 50 );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
	light1.position.set( 0, 0, 0 );

	scene.add( light1 );


	//Load the obj file
	loadOBJ();
}

var loadOBJ = function(){

	//Manager from ThreeJs to track a loader and its status
	var manager = new THREE.LoadingManager();
	//Loader for Obj from Three.js
	var loader = new THREE.OBJLoader( manager );
  
	//Launch loading of the obj file, addBananaInScene is the callback when it's ready 
	loader.load( 'files/brain', addBananaInScene);
	// loader.load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/banana.obj', addBananaInScene);
};

var addBananaInScene = function(object){
	banana = object;
	//Move the banana in the scene
	banana.rotation.x = 0;
	banana.position.y = 0;
	banana.position.z = 0;
	//Go through all children of the loaded object and search for a Mesh
	object.traverse( function ( child ) {
		//This allow us to check if the children is an instance of the Mesh constructor
		if(child instanceof THREE.Mesh){
			child.material.color = new THREE.Color(0Xffffff);
			//Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
			child.geometry.computeVertexNormals();
		}
	});
	//Add the 3D object in the scene
	scene.add(banana);
	render();
};


var render = function () {
	requestAnimationFrame(render);

	//Turn the banana
	// banana.rotation.x += .01;
	// banana.rotation.y += .005;
	// banana.rotation.z += .01;

		// scene.rotation.z += .01;


	renderer.render(scene, camera);
};

init();