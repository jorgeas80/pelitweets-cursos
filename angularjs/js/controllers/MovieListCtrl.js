// The controller gets 'movies' as service resolved in config time
function MovieListCtrl(movies) {

    var vm = this;

    // We already have movies resolved in config time. So, no need to get it here
    vm.movies = movies;

    vm.queryOptions = {
        orderby: 'movie_release_date',
        reverse: true
    }

    vm.setOrder = function (orderby) {
        if (orderby === vm.queryOptions.orderby)
        {
            vm.queryOptions.reverse = !vm.queryOptions.reverse;
        }
        vm.queryOptions.orderby = orderby;
    };
    
    // Get rid of the 'min' part of the runtime and return
    // it as number for the comparison
    vm.runtimeJustNumber = function(movie) {
        var runTimeArray = movie.movie_runtime.split(" ")
        if (runTimeArray && runTimeArray.length > 0) {
            return Number(runTimeArray[0]);
        }
        
        else {
            return movie.movie_runtime
        }
    }
}
