function pelitweetsFactory($resource, pelitweetsUrl, pelitweetsBaseMovieUrl) {
    var f = {};

    f.getMovieList = function() {
        return $resource(pelitweetsUrl).query();
    }

    f.getMovieDetail = function(id) {
        return $resource(pelitweetsBaseMovieUrl).get({id: id})
    }

    return f;
}

