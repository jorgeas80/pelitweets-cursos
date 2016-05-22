angular
    .module('pelitweets', ['ngRoute', 'ngResource'])
    .constant('pelitweetsUrl', 'http://pelitweets.herokuapp.com/api/movies')
    .constant('pelitweetsBaseMovieUrl', 'http://pelitweets.herokuapp.com/api/movie/:id')
    .config(RoutingConfig)
    .directive('ptMovieDetails', MovieDetailDirective)
    .factory('pelitweetsFactory', pelitweetsFactory)
    .controller('MovieListCtrl', MovieListCtrl)
    .controller('MovieDetailCtrl', MovieDetailCtrl);

// Routing
function RoutingConfig($routeProvider) {
    $routeProvider
        .when('/lista-pelis', {
            controller: 'MovieListCtrl as vm',
            templateUrl: 'partials/listado.html',
            resolve: {

                // We want to automatically resolve 'movies' using pelitweetsFactory service
                // AngularJS will automatically inject the service pelitweetsFactory here when
                // needs to resolve 'movies' to be used in MovieListCtrl. No need
                // to inject 'pelitweetsFactory' as dependency of config.
                // Besides, you just can inject constant or provider as dependencies
                // of config module. This is to prevent accidental instantiation of
                // services before they have been fully configured.
                movies: function(pelitweetsFactory) {
                    return pelitweetsFactory.getMovieList();
                }
            }
        })
        .when('/detalle-peli/:id', {
            //controller: 'MovieDetailCtrl as vm',
            templateUrl: 'partials/detalle.html'
        })

        .otherwise({redirectTo: '/lista-pelis'});
}



// Injections (optional but useful)
RoutingConfig.$inject = ['$routeProvider'];
pelitweetsFactory.$inject = ['$resource', 'pelitweetsUrl', 'pelitweetsBaseMovieUrl'];
MovieListCtrl.$inject = ['movies'];
MovieDetailCtrl.$inject = ['$routeParams', 'pelitweetsFactory'];