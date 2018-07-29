
			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			var camera, scene, renderer,
			light1, light2, light3, light4,
			object, stats;
			var clock = new THREE.Clock();
			init();
			animate();
			function init() {
				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight*2, 1, 1000 );
				camera.position.z = 100;
				scene = new THREE.Scene();
				//model
				var loader = new THREE.OBJLoader();
				loader.load( 'files/brain', function ( obj ) {
					object = obj;
					object.scale.multiplyScalar( 40 );
					object.position.y = -30;
					scene.add( object );
				} );
				var sphere = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
				//lights
				light1 = new THREE.PointLight( 0xff0040, 2, 50 );
				light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
				scene.add( light1 );
				light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
				light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
				scene.add( light2 );
				light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
				light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
				scene.add( light3 );
				light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
				light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
				scene.add( light4 );
				//renderer
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight/2 );
				document.getElementById('scene').appendChild( renderer.domElement );
				//stats
				stats = new Stats();
				document.body.appendChild( stats.dom );
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight*2;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight/2 );
			}
			function animate() {
				requestAnimationFrame( animate );
				render();
				stats.update();
			}
			function render() {
				var time = Date.now() * 0.0005;
				var delta = clock.getDelta();
				if( object ) object.rotation.y -= 0.5 * delta;
				light1.position.x = Math.sin( time * 0.7 ) * 30;
				light1.position.y = Math.cos( time * 0.5 ) * 40;
				light1.position.z = Math.cos( time * 0.3 ) * 30;
				light2.position.x = Math.cos( time * 0.3 ) * 30;
				light2.position.y = Math.sin( time * 0.5 ) * 40;
				light2.position.z = Math.sin( time * 0.7 ) * 30;
				light3.position.x = Math.sin( time * 0.7 ) * 30;
				light3.position.y = Math.cos( time * 0.3 ) * 40;
				light3.position.z = Math.sin( time * 0.5 ) * 30;
				light4.position.x = Math.sin( time * 0.3 ) * 30;
				light4.position.y = Math.cos( time * 0.7 ) * 40;
				light4.position.z = Math.sin( time * 0.5 ) * 30;
				renderer.render( scene, camera );
			}
