function RoutingConfig($routeProvider, pelitweetsUrl) {
    $routeProvider
        .when('/lista-pelis',
             {
                controller: 'MovieListCtrl as vm',
                templateUrl: 'partials/listado.html',
                resolve: {

                    // Option 1: We want to automatically resolve 'movies' using Movie service

                    // AngularJS will automatically inject the service Movie here when
                    // needs to resolve 'movies' to be used in MovieListCtrl. No need
                    // to inject 'Movie' as dependency of config. 
                    // Besides, you just can inject constant or provider as dependencies
                    // of config module. This is to prevent accidental instantiation of 
                    // services before they have been fully configured.

                    /**
                    movies: function(Movie) {
                        return Movie.resource(pelitweetsUrl).query()
                    }**/

                    // Option 2: if we want to automatically resolve 'movies' using just plain $http,
                    // instead of Movie service. Simpler
                    movies: function($http, pelitweetsUrl) {
                        return $http.get(pelitweetsUrl).then(function(response) {
                            return response.data;
                        })
                    }


                }
             })
        .when('/detalle-peli/:id',
            {
                controller: 'MovieDetailCtrl as vm',
                templateUrl: 'partials/detalle.html'
            })
        .otherwise({redirectTo: '/lista-pelis'});
}

angular
    .module('pelitweets', ['ngRoute', 'ngResource'])
    .constant('pelitweetsUrl', 'http://pelitweets.herokuapp.com/api/movies')
    .constant('pelitweetsBaseMovieUrl', 'http://pelitweets.herokuapp.com/api/movie/:id')
    .config(RoutingConfig)

    // Both work. Check PelitweetsService.js
    //.factory('Movie', ['$resource', MovieFactory])
    .service('Movie', Movie)

    .controller('MovieListCtrl', MovieListCtrl)

    // Another version of the controller, using plain $http service and no autoresolve in config time
    //.controller('MovieListCtrl', MovieListCtrlHTTPNoAutoResolve)

    .controller('MovieDetailCtrl', MovieDetailCtrl);

    // Specify injections
    RoutingConfig.$inject = ['$routeProvider', 'pelitweetsUrl', 'pelitweetsBaseMovieUrl'];
    Movie.$inject = ['$resource'];
    MovieListCtrl.$inject = ['movies'];
    MovieDetailCtrl.$inject = ['$routeParams' ,'pelitweetsBaseMovieUrl', 'Movie'];

    // Specify injections for another version of the controller too
    MovieListCtrlHTTPNoAutoResolve.$inject = ['$http', 'pelitweetsUrl'];