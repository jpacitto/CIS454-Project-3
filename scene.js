//create scene and camera

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 100, window.innerWidth/window.innerHeight, 0.5, 2000 );

camera.position.z = 4.5;
camera.lookAt(scene.position);

//create renderer
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.setClearColor(0x000000, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//same material and geometry for each wall
var planeGeo = new THREE.PlaneGeometry(4, 4);

//left wall
var planeMat1 = new THREE.MeshPhongMaterial({ color : 0xffffff });
var plane1 = new THREE.Mesh(planeGeo, planeMat1);
plane1.rotation.y = Math.PI / 2;
plane1.position.x = -2;
plane1.receiveShadow = true;
scene.add(plane1);

//right wall
var planeMat2 = new THREE.MeshPhongMaterial({ color : 0xffffff });
var plane2 = new THREE.Mesh(planeGeo, planeMat2);
plane2.rotation.y = -Math.PI / 2;
plane2.position.x = 2;
plane2.receiveShadow = true;
scene.add(plane2);

//back wall
var geometry99 = new THREE.PlaneBufferGeometry( 4, 4 );
var plane3 = new THREE.Reflector( geometry99, {
					clipBias: 0.003,
					textureWidth: window.innerWidth * window.devicePixelRatio,
					textureHeight: window.innerHeight * window.devicePixelRatio,
					color: 0x889999,
					recursion: 1
				} );
plane3.position.z = -2;
scene.add(plane3);

//top wall
var planeMat4 = new THREE.MeshPhongMaterial({ color : 0xffffff });
var plane4 = new THREE.Mesh(planeGeo, planeMat4);
plane4.rotation.x = Math.PI / 2;
plane4.position.y = 2;
plane4.receiveShadow = true;
scene.add(plane4);

//bottom wall
var planeMat5 = new THREE.MeshPhongMaterial({ color : 0xffffff });
var plane5 = new THREE.Mesh(planeGeo, planeMat5);
plane5.rotation.x = -Math.PI / 2;
plane5.position.y = -2;
plane5.receiveShadow = true;
scene.add(plane5);

//front wall
var planeMat6 = new THREE.MeshPhongMaterial({ color : 0xffffff });
var plane6 = new THREE.Mesh(planeGeo, planeMat6);
plane6.position.z = 2;
plane6.rotation.y = Math.PI;
plane6.receiveShadow = true;
scene.add(plane6);