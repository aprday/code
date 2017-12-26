
function init() {
    var mesh;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 30;
    
    var directionalLight = new THREE.DirectionalLight( 0x887766 );
    directionalLight.position.set( -1, 1, 1 ).normalize();
    scene.add( directionalLight );
    var renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0xfff4e5 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    var modelFile = './miku_v2.pmd';
    var vmdFiles = [ './wavefile_v2.vmd' ];
    var loader = new THREE.MMDLoader();
    var helper = new THREE.MMDHelper();
    loader.load( modelFile, vmdFiles, function ( object ) {
        mesh = object;
        mesh.position.y = -10;
        scene.add( mesh );
        helper.add( mesh );
        helper.setAnimation( mesh );
        /*
         * Note: create CCDIKHelper after calling helper.setAnimation()
         */
        ikHelper = new THREE.CCDIKHelper( mesh );
        ikHelper.visible = false;
        scene.add( ikHelper );
        /*
         * Note: You're recommended to call helper.setPhysics()
         *       after calling helper.setAnimation().
          */
        helper.setPhysics( mesh );
        physicsHelper = new THREE.MMDPhysicsHelper( mesh );
        physicsHelper.visible = false;
        scene.add( physicsHelper );
        helper.unifyAnimationDuration( { afterglow: 2.0 } );
    
    });
    var clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        helper.animate(clock.getDelta());
        renderer.render(scene, camera);
    }
    animate();
}


init();

