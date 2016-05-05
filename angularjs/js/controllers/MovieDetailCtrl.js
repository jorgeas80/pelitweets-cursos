function MovieDetailCtrl($routeParams, pelitweetsFactory) {
    var vm = this;

    vm.movie = pelitweetsFactory.getMovieDetail($routeParams.id)
}