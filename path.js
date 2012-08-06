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
    
        var image = self.image;
        var startat = image.findStart();
        
        if (startat === null) return null; // no more!
        
        
        /////THIS ENTIRE SECTION SHOULD BE REMOVED SOON
        // right now we're hard-coding a left hand turn policy.
        var consider = startat;
        var direction = Direction.south; // keep left hand on black pixels
        
        self.push(consider);
        // remember that we are assuming prepadded images right now
        // so we know for a fact that one to the left of findStart
        // is the opposite color
        while (!consider.equals(startat)) {
            // consider needs to be a coordinate object
            consider = image.getCoord(image.index(consider),direction);
            self.push(consider);
            if (image.indexer(consider) === 0) { // turn left
                direction = Direction.left(direction);
            }
            else if (image.indexer(consider.x-1, consider.y) === 1) { // turn right
                direction = Direction.right(direction);
            }
            // otherwise we're just going straight. Nothing to change.
        }
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
        
        pushPath = Object.create(Path);
        pushPath.init(self.currentCycle)
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
    
    // createAll
    createAll: function() {
        var self = this;
        
        while (self.create() !== null) ;
        return self;
    },
    
};


