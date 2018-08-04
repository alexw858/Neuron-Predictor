var camera2, scene2, renderer2,
light5,
object2, stats2;

var rotation_x = 0
var rotation_y = 0.5
var rotation_z = 0

init2();
animate2();
function init2() {
    camera2 = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
    camera2.position.z = 100;
    scene2 = new THREE.Scene();
    //model
    let loader2 = new THREE.OBJLoader();
    loader2.load( 'files/brain', function ( obj ) {
        object2 = obj;
        object2.scale.multiplyScalar( 60 );
		object2.position.y = -40;
        object2.rotation.x -= rotation_x;
        object2.rotation.y -= rotation_y;
		object2.rotation.z -= rotation_z;

        scene2.add( object2 );
    } );
    // let sphere2 = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene2.add( directionalLight );
    //lights
    light5 = new THREE.PointLight( 0xffaa00, 2, 30 );
    // light5.add( new THREE.Mesh( sphere2, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
    scene2.add( light5 );
    //renderer2
    renderer2 = new THREE.WebGLRenderer( { antialias: true } );
    renderer2.setPixelRatio( window.devicePixelRatio );
    renderer2.setSize( window.innerWidth/3, window.innerHeight/3 );
    $('#display').html( renderer2.domElement );
    //stats
    stats2 = new Stats();
    document.body.appendChild( stats2.dom );
    window.addEventListener( 'resize', onWindowResize2, false );
}
function onWindowResize2() {
    camera2.aspect = window.innerWidth / window.innerHeight;
    camera2.updateProjectionMatrix();
    renderer2.setSize( window.innerWidth/3, window.innerHeight/3 );
}
function animate2() {
    requestAnimationFrame( animate2 );
    render2();
    stats2.update();
}
function render2() {
    let time2 = Date.now() * 0.005;
    let delta2 = clock.getDelta();
    light5.position.x = 15 + Math.sin( time2 * 0.3 )*5;
    light5.position.y = 20 + Math.sin( time2 * 0.3 )*5;
    light5.position.z = 40 + Math.sin( time2 * 0.3 )*5;
    renderer2.render( scene2, camera2 );
}