function pelitweetsFactory($resource, $http, pelitweetsUrl, pelitweetsBaseMovieUrl) {
    var f = {};

    f.getMovieList = function() {
        // This returns a promise!
        return $http.get(pelitweetsUrl);
    }

    f.getMovieDetail = function(id) {
        return $resource(pelitweetsBaseMovieUrl).get({id: id})
    }

    return f;
}

