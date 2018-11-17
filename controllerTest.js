//Button 0: A
//Button 1: B
//Button 2: X
//Button 3: Y
//Button 4: Left Bumper
//Button 5: Right Bumper
//Button 6: Left Trigger
//Button 7: Right Trigger
//Button 8: Select
//Button 9: Start
//Button 10: L3
//Button 11: R3
//Button 12: D-pad up
//Button 13: D-pad down
//Button 14: D-pad left
//Button 15: D-pad right

//checks if controller is connected
$(window).on("gamepadconnected", function() {
	console.log("Gamepad Connected");
});

$(window).on("gamepaddisconnected", function() {
	console.log("Gamepad Disconnect")
});

var state = 0;
var i = 0;
var controller;
var c = 0;

var cubes = [cube2, cube3, cube4];
cubes[c].material.color.setHex(0x69CDFF);

//loop for checking controller inputs
function loop()
{
 	controller= navigator.getGamepads()[0];
	i = getButton(controller);
	if(controller.buttons[i].pressed && state == 0)
	{
		state = 1;
		console.log(i + " button pressed");
		console.log(typeof(cubes[c].position.x) + ", " + typeof(cubes[c].position.y) + ", " + typeof(cube2.position.z));

		var x = parseFloat(cubes[c].position.x);
		var y = parseFloat(cubes[c].position.y);
		var z = parseFloat(cubes[c].position.z);

		//possible inputs
		switch(i)
		{
			case 15:
				cubes[c].position.x = x + 0.1;
				break;
			case 14:
				cubes[c].position.x = x - 0.1;
				break;
			case 12:
				cubes[c].position.y = y + 0.1;
				break;
			case 13:
				cubes[c].position.y = y - 0.1;
				break;
			case 3:
				cubes[c].position.z = z - 0.1;
				break;
			case 0:
				cubes[c].position.z = z + 0.1;
				break;
			case 7:
				plane1.material.color.setHex(0x9359BB);
				plane2.material.color.setHex(0xB6B029);
				break;
			case 6:
				plane1.material.color.setHex(0xCF2C2C);
				plane2.material.color.setHex(0x29B69C);
				break;
			case 4:
				cubes[c].material.color.setHex(0x707373);
				if(c == 2)
				{

					c = 0;
				}
				else
				{
					c += 1;
				}
				cubes[c].material.color.setHex(0x69CDFF);
				break;
			case 5:
				changeMaterial();
				break;
			case 8:
				randomPosition(cube1);
				randomPosition(cube2);
				randomPosition(cube3);
				randomPosition(cube4);
				break;
			case 2:
				cube1.material.opacity = 0.5;
				cube2.material.opacity = 0.5;
				cube3.material.opacity = 0.5;
				cube4.material.opacity = 0.5;
				break;
			case 1:
				cube1.material.opacity = 1;
				cube2.material.opacity = 1;
				cube3.material.opacity = 1;
				cube4.material.opacity = 1;
				break;
			default:
		}
	}

	if(controller.buttons[i].pressed == false && state == 1)
	{
		state = 0;
	}

	if(controller.axes[0] > 0.5)
	{
		cameraRotate = 0.03;
	}
	else if(controller.axes[0] < -0.5)
	{
		cameraRotate = -0.03;
	}
	else
	{
		cameraRotate = 0;
	}

	if(controller.axes[1] > 0.5)
	{
		camera.fov += 1;
		camera.updateProjectionMatrix();
	}
	else if(controller.axes[1] < -0.5)
	{
		camera.fov -= 1;
		camera.updateProjectionMatrix();
	}

	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

function getButton(controller)
{

	for(var i = 0; i < controller.buttons.length; i++)
	{
		if(controller.buttons[i].pressed)
		{
			return i;
		}
	}
	return 0;
}

var matState = 0;
function changeMaterial()
{
	var color = cube2.material.color;
	var matColor = new THREE.Color(color.r, color.g, color.b);
	if(matState == 0)
	{
		cube1.material.roughness = 1;
		cube2.material.roughness = 1;
		cube3.material.roughness = 1;
		cube4.material.roughness = 1;
		matState += 1;
	}
	else if(matState == 1)
	{
		cube1.material.roughness = 0.0;
		cube2.material.roughness = 0.0;
		cube3.material.roughness = 0.0;
		cube4.material.roughness = 0.0;

		cube1.material.metalness = 0.8;
		cube2.material.metalness = 0.8;
		cube3.material.metalness = 0.8;
		cube4.material.metalness = 0.8;
		matState += 1;
	}
	else if(matState == 2)
	{
		cube1.material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
		cube2.material = new THREE.MeshStandardMaterial( { color: 0x707373 } );
		cube3.material = new THREE.MeshStandardMaterial( { color: 0x707373 } );
		cube4.material = new THREE.MeshStandardMaterial( { color: 0x707373 } );
		matState = 0;
	}
}