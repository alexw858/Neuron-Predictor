var camera2, scene2, renderer2,
light5,
object2, stats2;
init2();
animate2();
function init2() {
    camera2 = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight*2, 1, 1000 );
    camera2.position.z = 100;
    scene2 = new THREE.Scene();
    //model
    let loader2 = new THREE.OBJLoader();
    loader2.load( 'files/brain', function ( obj ) {
        object2 = obj;
        object2.scale.multiplyScalar( 40 );
		object2.position.y = -30;
		object2.rotation.y -= 0.5;
        scene2.add( object2 );
    } );
    let sphere2 = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
    //lights
    light5 = new THREE.PointLight( 0xffaa00, 2, 30 );
    // light5.add( new THREE.Mesh( sphere2, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
    scene2.add( light5 );
    //renderer2
    renderer2 = new THREE.WebGLRenderer( { antialias: true } );
    renderer2.setPixelRatio( window.devicePixelRatio );
    renderer2.setSize( window.innerWidth/2, window.innerHeight/4 );
    document.getElementById('display').appendChild( renderer2.domElement );
    //stats
    stats2 = new Stats();
    document.body.appendChild( stats2.dom );
    window.addEventListener( 'resize', onWindowResize2, false );
}
function onWindowResize2() {
    camera2.aspect = window.innerWidth / window.innerHeight*2;
    camera2.updateProjectionMatrix();
    renderer2.setSize( window.innerWidth/2, window.innerHeight/4 );
}
function animate2() {
    requestAnimationFrame( animate2 );
    render2();
    stats2.update();
}
function render2() {
    let time2 = Date.now() * 0.0005;
    let delta2 = clock.getDelta();
    light5.position.x = 5;
    light5.position.y = 5;
    light5.position.z = 30;
    renderer2.render( scene2, camera2 );
}