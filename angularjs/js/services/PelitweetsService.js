// Basic service using resource
function Movie($resource) {
    this.resource = function(url) {
        return $resource(url);
    }
}

// Example of factory function using the previous service
// Could be used this way: angular.factory('Movie', MovieFactory)
function MovieFactory($resource) {
    var f = new Movie($resource);
    
    return f;
}

// Another example of factory function
// Could be used this way: angular.factory('Movie', MovieFactory)
function MovieFactory2($resource) {
    var f = {};
    
    f.resource = function(url) {
        return $resource(url);
    }
    
    return f;
}


