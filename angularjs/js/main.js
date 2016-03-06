function RoutingConfig($routeProvider, pelitweetsUrl) {
    $routeProvider
        .when('/detalle-peli/:id',
              {
                controller: 'MovieDetailCtrl',
                templateUrl: 'partials/detalle.html'
              })
        .when('/lista-pelis',
             {
                controller: 'MovieListCtrl',
                templateUrl: 'partials/listado.html',
                resolve: {
                    // AngularJS will automatically inject the service Movie here when 
                    // needs to resolve 'movies' to be used in MovieListCtrl. No need
                    // to inject 'Movie' as dependency of config. 
                    // Besides, you just can inject constant or provider as dependencies
                    // of config module. This is to prevent accidental instantiation of 
                    // services before they have been fully configured.
                    movies: function(Movie) {
                        return Movie.resource(pelitweetsUrl).query()
                    }
                }
             })
        .otherwise({redirectTo: '/lista-pelis'});
}

angular
    .module('pelitweets', ['ngRoute', 'ngResource'])
    .constant('pelitweetsUrl', 'http://pelitweets.herokuapp.com/api/movies')
    .constant('pelitweetsBaseMovieUrl', 'http://pelitweets.herokuapp.com/api/movie/:id')
    .config(['$routeProvider', 'pelitweetsUrl', 'pelitweetsBaseMovieUrl', RoutingConfig])

    // Both work. Check PelitweetsService.js
    //.factory('Movie', ['$resource', MovieFactory])
    .service('Movie', ['$resource', Movie])

    .controller('MovieListCtrl', ['$scope', 'movies', MovieListCtrl])
    .controller('MovieDetailCtrl', ['$scope', '$routeParams' ,'pelitweetsBaseMovieUrl', 'Movie', MovieDetailCtrl]);

    /**
     * Starting from Angular 1.3, we can't declare controllers in the global
     * scope. They must be registered by using module.controller.
     **/