//lighting fixtures
var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 15);
lights[1] = new THREE.PointLight(0xffffff, 1, 15);

lights[0].position.set(6, 0, 6);
lights[0].castShadow = true;
scene.add(lights[0]);

lights[1].position.set(-6, 0, -6);
lights[1].castShadow = true;
scene.add(lights[1]);

//ambient lighting
var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

var geometry = new THREE.SphereGeometry( 0.5, 34, 34 );

//first sphere that does not move. uses standard mesh material
var geometry1 = new THREE.SphereGeometry( 0.7, 34, 34 );
var material1 = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
cube1 = new THREE.Mesh( geometry1, material1 );
cube1.castShadow = true;
cube1.receiveShadow = true;
scene.add( cube1 );

//opther three spheres
var material2 = new THREE.MeshStandardMaterial( { color: 0x69CDFF, opacity: 1, transparent: true } );
cube2 = new THREE.Mesh( geometry, material2 );
cube2.castShadow = true;
cube2.receiveShadow = true;
scene.add( cube2 );

var material3 = new THREE.MeshStandardMaterial( { color: 0x707373, opacity: 1, transparent: true } );
cube3 = new THREE.Mesh( geometry, material3 );
cube3.castShadow = true;
cube3.receiveShadow = true;
scene.add( cube3 );

var material4 = new THREE.MeshStandardMaterial( { color: 0x707373, opacity: 1, transparent: true } );
cube4 = new THREE.Mesh( geometry, material4 );
cube4.castShadow = true;
cube4.receiveShadow = true;
scene.add( cube4 );

randomPosition(cube1);
randomPosition(cube2);
randomPosition(cube3);

var cameraRotate = 0;

//loops for camera movement and refresh images
var animate = function () 
{
	requestAnimationFrame( animate );

	var x = camera.position.x;
    var z = camera.position.z;

    camera.position.x = x * Math.cos(cameraRotate) + z * Math.sin(cameraRotate);
    camera.position.z = z * Math.cos(cameraRotate) - x * Math.sin(cameraRotate);

    camera.lookAt(scene.position);

    //checkCubes();
    renderer.sortObjects = false;
	renderer.render( scene, camera );
};

animate();

function randomPosition(cube)
{
	cube.position.x = (Math.random() * (1.5 + 1.5) - 1.5).toFixed(2);
	cube.position.y = (Math.random() * (1.5 + 1.5) - 1.5).toFixed(2);
	cube.position.z = (Math.random() * (1.5 + 1.5) - 1.5).toFixed(2);
}