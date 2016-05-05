function MovieDetailCtrl($resource, $routeParams, pelitweetsBaseMovieUrl) {

    var vm = this;

    vm.movie = $resource(pelitweetsBaseMovieUrl).get({id: $routeParams.id})
}


function MovieDetailCtrlUsingFactory($routeParams, pelitweetsFactory) {
    var vm = this;

    vm.movie = pelitweetsFactory.getMovieDetail($routeParams.id)
}