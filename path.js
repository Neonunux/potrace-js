// takes in a path already inside an array
// so what you're going to want to do is build the array
// and then pass it in
// build the array as alternating x, ys
// so even numbers are x coordinates, odd numbers are ys.
// path will index using .indexer skipping as wanted

Path = {
    init: function(path) {
        var self = this;
        
        // pass in the path already gathered up
        self.length = path.length / 2;
        self.cycle = new Int8Array(path);
        return self;
    },
    
    // gets both x and y of a certain vertex
    indexer: function(index) {
        var self = this;
        var i = self.mod(index);
        
        return {
            x: function () { return self.cycle[i*2]; },
            y: function () { return self.cycle[i*2+1]; },
            print: function () { return "(" + this.x() + "," + this.y() + ")"; },
        };
    },
    
    print: function() {
        var self = this;
        var result = "";
        
        for (var i = 0; i < self.length; i++) {
             result += self.indexer(i).print();
        } // (x1,y1)(x2,y2)...
        return result;
    },
    
    // a proper mathematical mod
    mod: function(index) {
        var self = this;
        return index - self.length * Math.floor(index/self.length);
    },
};

Direction = {
    north: 'N',
    south: 'S',
    east: 'E',
    west: 'W',
    
    // with C-type enums I could totally cheat this in
    // an awesome way. oh well.
    
    left: function(direction) {
        if (direction === this.north) return this.west;
        if (direction === this.south) return this.east;
        if (direction === this.east) return this.north;
        if (direction === this.west) return this.south;
    },
    right: function(direction) {
        if (direction === this.north) return this.east;
        if (direction === this.south) return this.west;
        if (direction === this.east) return this.south;
        if (direction === this.west) return this.north;
    },
}

// how this will work:
// we will call a pathbuilder 
PathBuilder = {
    
    currentCycle: new Array(),
    allCycles: new Array(),
    
    // should take in at least the image
    // by image I mean a Bitmap... I think...
    init: function(image) {
        var self = this;
        
        self.image = image;
        return self;
    },
    
    // create
    // this finds a path, and builds it
    // if it does not find a new path, returns null
    // otherwise it builds the whole thing, calls 
    // finalize, and returns self
    create: function() {
        var self = this;
    
        var startat = self.image.findStart();
        if (startat === null) return null; // no more!
        
        self.leftTurnPolicy(startat, Direction.south);
        
        // now we've generated a whole path
        return self.finalize();
    },
    
    // if one input, it should be a coord thing from bitmap
    push: function(index1, index2) {
        var self = this;
        
        if (index2 === undefined) {
            self.currentCycle.push(index1.x);
            self.currentCycle.push(index1.y);
            return self;
        } else {
            self.currentCycle.push(x);
            self.currentCycle.push(y);
            return self; // more chaining possibilities!
        }
        return null; // something super weird just happened :)
    },
    
    // what does it take in?
    finalize: function() {
        var self = this;
        
        // turdsize check should go here
        var turdsize = 10;
        // if area < turdsize, don't push the path (skip the next two lines)
        
        
        pushPath = Object.create(Path);
        pushPath.init(self.currentCycle)
        
        //console.log(pushPath.print());
        
        self.allCycles.push(pushPath);
        self.currentCycle.length = 0;
        
        
        // TODO later:
        //   unpad the paths here
        //   for now, we are assuming pre-padded images
        //   however, when we add in padding, we will
        //   need to unpad the images at some point
        //   and the best time to do that is probably here
        return self;
    },

    // WE CAN'T DO THIS YET BECAUSE WE STILL 
    // NEED TO INVERT ALL INNER PIXELS
    // createAll
    createAll: function() {
        var self = this;
        
        while (self.create() !== null) ;
        return self;
    },
    
    
    leftTurnPolicy: function (startat, dir) {
        var self = this;
        var image = self.image;
        
        var direction = dir
        var consider = startat;
        
        var sanitycheck = 0;
        
        while (sanitycheck < 500) {
            sanitycheck++;
            
            if (image.considerLeftTurn(consider, direction)) {
                consider = image.takeLeftTurn(consider, direction);
                direction = Direction.left(direction);
                //console.log("going left! ", consider);
            }
            // taking a right turn involves taking a step!
            else if (image.considerRightTurn(consider, direction)) {
                consider = image.takeRightTurn(consider, direction);
                direction = Direction.right(direction);
                //console.log("going right! ", consider);
            }
            else {
                consider = image.goStraight(consider, direction);
                //console.log("going straight! ", consider);
            }
            
            self.push(consider);
            if (consider.equals(startat)) return true;
        }
        
        throw "Taking too long: something might be wrong... breaking!";
    },
    
    rightTurnPolicy: function (startat, dir) {
        var self = this;
        var image = self.image;
        
        var direction = dir
        var consider = startat;
        
        var sanitycheck = 0;
        
        while (sanitycheck < 500) {
            sanitycheck++;
            
            if (image.considerRightTurn(consider, direction)) {
                consider = image.takeRightTurn(consider, direction);
                direction = Direction.right(direction);
                //console.log("going right! ", consider);
            }
            // taking a right turn involves taking a step!
            else if (image.considerLeftTurn(consider, direction)) {
                consider = image.takeLeftTurn(consider, direction);
                direction = Direction.left(direction);
                //console.log("going left! ", consider);
            }
            else {
                consider = image.goStraight(consider, direction);
                //console.log("going straight! ", consider);
            }
            
            self.push(consider);
            if (consider.equals(startat)) return true;
        }
        
        throw "Taking too long: something might be wrong... breaking!";
    },
    
};


