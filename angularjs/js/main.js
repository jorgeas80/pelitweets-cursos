function RoutingConfig($routeProvider, pelitweetsUrl) {
    $routeProvider
        .when('/lista-pelis',
             {
                controller: 'MovieListCtrl as vm',
                templateUrl: 'partials/listado.html',
                resolve: {

                    // Option 1: We want to automatically resolve 'movies' using pelitweetsFactory service

                    // AngularJS will automatically inject the service pelitweetsFactory here when
                    // needs to resolve 'movies' to be used in MovieListCtrl. No need
                    // to inject 'pelitweetsFactory' as dependency of config.
                    // Besides, you just can inject constant or provider as dependencies
                    // of config module. This is to prevent accidental instantiation of 
                    // services before they have been fully configured.

                    /**
                    movies: function(pelitweetsFactory, pelitweetsUrl) {
                        return pelitweetsFactory.getMovieList().then(function(response) {
                            return response.data;
                        })
                    }
                     **/

                    // Option 2: if we want to automatically resolve 'movies' using just plain $http,
                    // instead of pelitweetsFactory service. Simpler

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

    // Unify external request in one service. Not used by default, but could be used
    .factory('pelitweetsFactory', pelitweetsFactory)

    .controller('MovieListCtrl', MovieListCtrl)
    // Another 2 versions of the controller, using implemented factory or basic AngularJS services. Not using automatic resolution in config time
    //.controller('MovieListCtrl', MovieListCtrlHTTPNoAutoResolve)
    //.controller('MovieListCtrl', MovieListCtrlUsingFactory)


    .controller('MovieDetailCtrl', MovieDetailCtrl);
    // Another version, using the existent pelitweetsFactory
    //.controller('MovieDetailCtrl', MovieDetailCtrlUsingFactory);

    /**
     * Now, we specify injections. Not mandatory, but useful
     */
    RoutingConfig.$inject = ['$routeProvider', 'pelitweetsUrl', 'pelitweetsBaseMovieUrl'];

    pelitweetsFactory.$inject = ['$resource', '$http', 'pelitweetsUrl', 'pelitweetsBaseMovieUrl'];

    // The only injected dependency is the resolved variable 'movies'. No need for more.
    MovieListCtrl.$inject = ['movies'];

    // Specify injections for other versions of the list controller too
    MovieListCtrlHTTPNoAutoResolve.$inject = ['$http', 'pelitweetsUrl'];
    MovieListCtrlUsingFactory.$inject = ['pelitweetsFactory'];

    MovieDetailCtrl.$inject = ['$resource', '$routeParams' ,'pelitweetsBaseMovieUrl'];

    // Specify injections for other version of the detail controller too
    MovieDetailCtrlUsingFactory.$inject = ['$routeParams', 'pelitweetsFactory'];

