console.log("where's the fire?");

var testImage = document.getElementById('example');
var context = testImage.getContext('2d');

testImage.addEventListener('click', function() {
    
    
    context.fillStyle = 'red';
    context.fillRect(25, 25, 50, 20);
    context.fillRect(50, 20, 20, 50);
    context.fillRect(25, 55, 50, 20);
    context.fillRect(40, 25, 05, 30);
    
    testDrafter = Object.create(Drafter);
    testDrafter.init(testImage, 0);
    
    testPathBuilder = Object.create(PathBuilder);
    testPathBuilder.init(testDrafter)
    
    testPathBuilder.createAll();
    
    //console.log("All cycles: ");
    console.log(testPathBuilder.allCycles);
    
});



