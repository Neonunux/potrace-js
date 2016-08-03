console.log("where's the fire?");

var testImage = document.getElementById('example');
var img = document.getElementById("scream");
var context = testImage.getContext('2d');
//context.drawImage(img,0,0);
//context.putImageData(img,100,100);
/* var dataURL;
 var img = new Image;
 img.onload = function(){
 context.drawImage(img,0,0); // Or at whatever offset you like
 dataURL = testImage.toDataURL();
 };
 img.src = dataURL; */

testImage.addEventListener('click', function () {
	console.log('clicked');
	// once you have an image...

	context.fillStyle = 'red';

	context.fillRect(25, 25, 50, 20);
	context.fillRect(50, 20, 20, 60);
	context.fillRect(25, 55, 50, 20);
	context.fillRect(40, 25, 05, 60);
	context.fillRect(25, 80, 60, 10);

	/* var dataURL = testImage.toDataURL(); */

	// set canvasImg image src to dataURL
	// so it can be saved as an image
	/* document.getElementById('scream').src = dataURL; */

	console.time('TestTime');
	// you just convert the image to a drafter object...
	testDrafter = Object.create(Drafter);
	testDrafter.init(testImage, 0);
	console.time('TestTime testDrafter ' + testDrafter);

	// and then (theoretically) this is all you need to run!
	testPathBuilder = Object.create(PathBuilder).run(testDrafter);
	console.timeEnd('TestTime ' + testPathBuilder);

	testPolygon = Object.create(Polygon).init(testPathBuilder.allCycles[1]);
	console.log("test polygons sums: " + testPolygon.sums);

	//// this is just debugging code
	//console.log("All cycles: ");
	console.log("pathbuilder allcycles: " + testPathBuilder.allCycles[1].print());
	console.log("pathbuilder longests: " + testPathBuilder.straightener.longests);

	var longests = testPathBuilder.straightener.longests;

	var tempCanvas = document.createElement('canvas');
	tempCanvas.width = testDrafter.width;
	tempCanvas.height = testDrafter.height;
	tempCanvas.className = "potrace";
	var tempContext = tempCanvas.getContext('2d');

	var mypath, mystart, myend;

	for (var j = 0; j < longests.length; j++) {

		mypath = testPathBuilder.allCycles[j];

		for (var i = 0; i < longests[j].length; i++) {
			mystart = mypath.indexer(i);
			myend = mypath.indexer(longests[j][i]);
			tempContext.strokeStyle = 'rgb(' + i + ',' + '0' + ','
					+ '0' + ')';
			tempContext.beginPath();
			tempContext.moveTo(mystart.x, mystart.y);
			tempContext.lineTo(myend.x, myend.y);
			tempContext.stroke();
		}
	}

	document.body.appendChild(tempCanvas);
});



