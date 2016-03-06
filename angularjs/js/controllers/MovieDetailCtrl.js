function MovieDetailCtrl($scope, $routeParams, pelitweetsBaseMovieUrl, Movie) {
    
    $scope.movie = Movie.resource(pelitweetsBaseMovieUrl).get({id: $routeParams.id})
    $scope.message = "Estoy en el controlador del detalle"
}