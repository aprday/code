var mesh;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set(-5, -5, 5);
camera.up.set(0, 0, 1);
var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
light.position.set(0, -4, -4).normalize();
scene.add( light );
var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor( 0xfff4e5 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var loader = new THREE.ColladaLoader();
loader.load( "./avatar.dae", function ( collada ) {
    collada.scene.traverse( function ( child ) {
        if ( child instanceof THREE.SkinnedMesh ) {
            mesh = child;
            camera.lookAt( child.position );
        }
    } );
    scene.add( collada.scene );

    var helper = new THREE.SkeletonHelper( mesh );
    helper.material.linewidth = 3;
    scene.add( helper );
} );

function render() {
    requestAnimationFrame( render, renderer.domElement );
    if(mesh){
        mesh.rotation.z += 0.01;
    }
    renderer.render( scene, camera );
}

render();