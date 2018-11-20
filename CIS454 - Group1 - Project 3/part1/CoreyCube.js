var camera, scene, renderer, light, cube;

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x818080);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 562);
    camera.lookAt(scene.position);
    scene.add(camera);
    
    var materials = 
    [
      new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("Images/Corey1.JPG"), side: THREE.DoubleSide}),
      new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("Images/Corey2.JPG"), side: THREE.DoubleSide}),
      new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("Images/Corey3.JPG"), side: THREE.DoubleSide}),
      new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("Images/Corey4.JPG"), side: THREE.DoubleSide}),
      new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("Images/Corey5.JPG"), side: THREE.DoubleSide}),
      new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("Images/Corey6.JPG"), side: THREE.DoubleSide})
    ];
    //cube = new THREE.Mesh(
    //    new THREE.CubeGeometry(562, 562, 562, 1, 1, 1, materials),
    //    new THREE.MeshFaceMaterial());
    //scene.add(cube);
    
    light = new THREE.AmbientLight(0x040404);
    light.position.y = 10;
    scene.add(light);
    
    cube = new THREE.Mesh(new THREE.BoxGeometry(350, 350, 350, 1, 1, 1), materials);
    scene.add(cube);

    var geometry = new THREE.PlaneGeometry(2000,1000);
    var planeMats = [new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("Images/dusty.jpg"), side: THREE.DoubleSide})]
    var plane = new THREE.Mesh(geometry, planeMats);
    scene.add(plane);
    
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += .005;
    cube.rotation.y += .005;
    cube.rotation.z += .005;
    renderer.render(scene, camera);
}