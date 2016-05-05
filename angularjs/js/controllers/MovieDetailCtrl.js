function MovieDetailCtrl($routeParams, pelitweetsBaseMovieUrl, Movie) {

    var vm = this;

    vm.movie = Movie.resource(pelitweetsBaseMovieUrl).get({id: $routeParams.id})
}