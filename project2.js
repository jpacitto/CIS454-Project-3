var scene = new THREE.Scene();
scene.fog = new THREE.Fog("#002135", 1, 3000);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x818080);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});

camera.position.z = 10;

var controls = new THREE.OrbitControls(camera, renderer.domElemet);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100,0,100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var objLoader = new THREE.ObjectLoader();
objLoader.load('res/starwars/starwars-tie-fighter.json', function(object)
{
	scene.position.y -= 2;
	scene.add(object);
});