


// working with bezier curves and surface
var bezierCurveDivisions = 50;

function redrawBezierSurface(beziercurve) {
	scene.remove(beziercurve.bezierSurface);

	var basicBezierModel = [];  // 4 bezier curves calculated from bezier control points

	// calculating basic bezier model (main 4 bezier curves)
	for (var i=0; i < beziercurve.bezierControlPoints.length; i++) {
		var bezier = new THREE.CubicBezierCurve3(
			beziercurve.bezierControlPoints[i][0],
			beziercurve.bezierControlPoints[i][1],
			beziercurve.bezierControlPoints[i][2],
			beziercurve.bezierControlPoints[i][3]
		)
		basicBezierModel.push( bezier.getPoints(bezierCurveDivisions) );
	}


	var bezierCurvesVertices = [];

	// calculating full bezier model (50 bezier curves in one direction, each containing 50 vertices)
	for (var i=0; i <= bezierCurveDivisions; i++) {
		var bezier = new THREE.CubicBezierCurve3(
			basicBezierModel[0][i],
			basicBezierModel[1][i],
			basicBezierModel[2][i],
			basicBezierModel[3][i]
		)

		bezierCurvesVertices = bezierCurvesVertices.concat( bezier.getPoints(bezierCurveDivisions) );
	}


	// now we've got full bezier model, it's time to create bezier surface and add it to the scene
	var bezierSurfaceVertices = bezierCurvesVertices;
	var bezierSurfaceFaces = [];

	// creating faces from vertices
	var v1, v2, v2;  // vertex indices in bezierSurfaceVertices array
	for (var i=0; i < bezierCurveDivisions; i++) {
		for (var j=0; j < bezierCurveDivisions; j++) {
			v1 = i * (bezierCurveDivisions + 1) + j;
			v2 = (i+1) * (bezierCurveDivisions + 1) + j;
			v3 = i * (bezierCurveDivisions + 1) + (j+1);
			bezierSurfaceFaces.push( new THREE.Face3(v1, v2, v3) );
			
			v1 = (i+1) * (bezierCurveDivisions + 1) + j;
			v2 = (i+1) * (bezierCurveDivisions + 1) + (j+1);
			v3 = i * (bezierCurveDivisions + 1) + (j+1);
			bezierSurfaceFaces.push( new THREE.Face3(v1, v2, v3) );
		}
	}

	beziercurve.bezierSurfaceGeometry = new THREE.Geometry();
	beziercurve.bezierSurfaceGeometry.vertices = bezierSurfaceVertices;
	beziercurve.bezierSurfaceGeometry.faces = bezierSurfaceFaces;
	beziercurve.bezierSurfaceGeometry.computeFaceNormals();
	beziercurve.bezierSurfaceGeometry.computeVertexNormals();
	beziercurve.bezierSurfaceMaterial = new THREE.MeshLambertMaterial({color: beziercurve.color, wireframe: false});
	beziercurve.bezierSurface = new THREE.Mesh(beziercurve.bezierSurfaceGeometry, beziercurve.bezierSurfaceMaterial);
	beziercurve.bezierSurface.material.side = THREE.DoubleSide;

	beziercurve.bezierSurface.position.x = beziercurve.x;
	beziercurve.bezierSurface.position.y = beziercurve.y;
	beziercurve.bezierSurface.position.z = beziercurve.z;

	scene.add(beziercurve.bezierSurface);
}

var animate = function(){
	requestAnimationFrame(animate);
	redrawBezierSurface(surface1);

	renderer.render(scene, camera);
}

animate();

