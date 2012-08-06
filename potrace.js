console.log("where's the fire?");

var testImage = document.getElementById('example');
var context = testImage.getContext('2d');

testImage.addEventListener('click', function() {
    
    
    context.fillStyle = 'red';
    context.fillRect(25, 25, 50, 50);
    
    testData = Object.create(Bitmap);
    testData.init(testImage, 0);
    
    console.log(testData.indexer(10)); // should return 0
    console.log(testData.indexer(50,50)); // should return 1
    testData.setter(0,50,50);
    
    document.body.appendChild(testData.writeToCanvas());
    
    buildPath = new Array();
    buildPath.push(1);
    buildPath.push(1);
    buildPath.push(1);
    buildPath.push(2);
    buildPath.push(2);
    buildPath.push(2);
    buildPath.push(2);
    buildPath.push(3);
    buildPath.push(2);
    buildPath.push(4);
    buildPath.push(3);
    buildPath.push(4);
    
    testPath = Object.create(Path);
    testPath.init(buildPath);
    console.log(testPath.length); // should return 6
    console.log(testPath.cycle); // should print the flat array
    console.log(testPath.print()); // should print a path nicely formatted
    
    /*
    for (var i = -10; i < 10; i++) {
        console.log("index " + i + testPath.indexer(i).print());
    }; */ // this one just takes up annoying amounts of space
    
    
    /*
    pathList = new Array();
    testPathBuilder = new PathBuilder(testData);
    while(true) {
        path = testPathBuilder.create();
        if (path === null) break;
        pathList.push(path);
    }
    for (var i = 0; i < pathList.length; i++) {
        console.log(pathList[i].print());
    }
    
    testPathBuilder2 = new PathBuilder(testData);
    pathList2 = testPathBuilder2.createAll(); // return an array of paths like above
    for (var i = 0; i < pathList2.length; i++) {
        console.log(pathList2[i].print());
    }
    
    // do not modify testData, make a copy
    // should return null if no cycles are left
    // can loop until returns null to find all cycles!
    // else it should return a path object
    
    // probably want a controller function to find everything
    */
});



