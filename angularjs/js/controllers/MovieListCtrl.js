function MovieListCtrl($scope, movies) {    
    $scope.movies = movies;
        
    $scope.orderby = 'movie_release_date';
    $scope.reverse = true;

    $scope.setOrder = function (orderby) {
        if (orderby === $scope.orderby)
        {
            $scope.reverse = !$scope.reverse;
        }
        $scope.orderby = orderby;
    };
    
    // Get rid of the 'min' part of the runtime and return
    // it as number for the comparison
    $scope.runtimeJustNumber = function(movie) {
        var runTimeArray = movie.movie_runtime.split(" ")
        if (runTimeArray && runTimeArray.length > 0) {
            return Number(runTimeArray[0]);
        }
        
        else {
            return movie.movie_runtime
        }
    }

}
