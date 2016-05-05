function pelitweetsFactory($resource, $http, pelitweetsUrl, pelitweetsBaseMovieUrl) {
    var f = {};

    f.getMovieList = function() {
        // This returns a promise!
        return $http.get(pelitweetsUrl);

        // another way, NOT returning a promise. It returns the json object
        //return $resource(pelitweetsUrl).query();
    }

    f.getMovieDetail = function(id) {
        return $resource(pelitweetsBaseMovieUrl).get({id: id})
    }

    return f;
}

