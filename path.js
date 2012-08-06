/*
// vertexes! they don't copy things, hopefully
// these should have their indices already modded
// because these are sort of hidden
function Vertex (cycle, i) {
    this.cycle = cycle;
    this.i = i;
};

Vertex.prototype = {
    x: function () { return this.cycle[this.i*2]; },
    y: function () { return this.cycle[this.i*2+1]; },
    print: function () {
        return "(" + this.x() + "," + this.y() + ")";
    }
};
*/


// takes in a path in an array
// so what you're going to want to do is build the array
// and then pass it in
// build the array as alternating x, ys
// so even numbers are x coordinates, odd numbers are ys.
// path will index using .indexer skipping as wanted
/*
Path = function(path) {
    // pass in the path already gathered up
    this.length = path.length / 2;
    this.cycle = new Int8Array(path);
};
*/

Path = {
    // how to use indexer: if you have a path named mypath,
    // get the x coordinate of the ith vertex with
    // mypath.indexer(i).x()
    // and the y coordinate with
    // mypath.indexer(i).y()
    var self = this;
    
    init: function(path) {
        // pass in the path already gathered up
        self.length = path.length / 2;
        self.cycle = new Int8Array(path);
    },
    /*
    indexer: function(index) {
        var i = mod(index);
        return new Vertex(self.cycle, i);
    },
    */
    indexer: function(index) {
        var i = mod(index);
        return {
            x: function() { return self.cycle[i*2]; },
            y: function() { return self.cycle[i*2+1]; },
            print: function() { return "(" + x + "," + y + ")"; },
        };
    },
    
    // could just use indexer(i).print() all the way down
    print: function() {
        var result = "";
        for (var i = 0; i < self.length; i++) {
             result += self.indexer(i).print();
        } // (x1,y1)(x2,y2)...
        return result;
    },
    
    // a proper mathematical mod
    mod: function(index) {
        index - self.length * Math.floor(index/self.length);
    },
};

/*
// should take in at least the image
// do we have the new pathbuilder object
// find all the cycles on its own?
// or do we then call .cycle(x,y) or whatever
PathBuilder = function(image) {
    
    this.image = image;
    this.currentCycle = new Array();
    this.allCycles = new Array();
    // for now, let's assume that we're passing in
    // an image that is pre-padded. At some point we
    // will probably want to add as such, which if we do
    // I would recommend putting into the bitmap
    // object
    
    
    // when we add in automatic padding, we will have to unpad
    // the paths in pathbuilder.finalize()
};
*/

// how this will work:
// we will call a pathbuilder 
PathBuilder = {
    
    var self = this;
    self.currentCycle = new Array();
    self.allCycles = new Array();
    
    // should take in at least the image
    // do we have the new pathbuilder object
    // find all the cycles on its own?
    // or do we then call .cycle(x,y) or whatever
    init: function(image) {
        self.image = image;
        return self; // still trying to decide if i want this one here
    },
    
    // create
    // this finds a path, and starts building it
    // should it finish building it? yes
    create: function() {
        var startat = self.image.findStart();
        if (startat === null) return null; // no more!
        
        // remember that we are assuming prepadded images right now
        // so we know for a fact that one to the left of findStart
        // is the opposite color
        self.push( startat );
        return self.generate().finalize();
    },
    
    // if one input, it should be a coord thing from bitmap
    push: function(index1, index2) {
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
        self.allCycles.push(new Path(self.currentCycle));
        self.currentCycle.length = 0;
        
        // TODO later:
        //   unpad the paths here
        //   for now, we are assuming pre-padded images
        //   however, when we add in padding, we will
        //   need to unpad the images at some point
        //   and the best time to do that is probably here
    },
    
    // generate should automatically create a full path :)
    // generate only gets called after we already know
    // there's a path to be found
    generate: function() {
        
    },
    
    // createAll
    
    // return object is an array of paths
    
    
};




