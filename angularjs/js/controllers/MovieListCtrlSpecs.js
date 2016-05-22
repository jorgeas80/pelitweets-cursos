describe("pelitweets MovieListCtrl", function() {

    // To get the controller
    var ctrl;
    var moviesMock;

    beforeEach(function() {

        // Load module
        module('pelitweets');

        inject(function($controller, $q, $route) {

            ctrl = $controller('MovieListCtrl', {
                // Pass real resolved promise
                movies: $route.routes['/lista-pelis'].resolve.movies

                // This is another option. Just create a resolved promise and pass it
                //movies: $q.when()
            });
        });
    });

    it("should have 'queryOptions' with default values", function() {
        expect(ctrl.queryOptions.orderby).toEqual('movie_release_date');
        expect(ctrl.queryOptions.reverse).toBe(true);
    });

    it("should have 'movies' resolved", function() {
        // Expect the defined promise to be resolved in the controller
        expect(ctrl.movies).toBeDefined();
    });

    it("should change reverse value when passed the same orderby option", function() {

        // Check reverse = true at first
        expect(ctrl.queryOptions.reverse).toBe(true);

        // Simulate changing the order
        ctrl.setOrder(ctrl.queryOptions.orderby);

        expect(ctrl.queryOptions.reverse).toBe(false);
    });

    it("should return the movie runtime as number when calling 'runtimeJustNumber'", function() {

        // Just to call
        movie = {
            movie_runtime: "128 min"
        };

        n = ctrl.runtimeJustNumber(movie);

        expect(n).toEqual(128);
        
    });

    it("should return unmodified string if not the correct format when calling 'runtimeJustNumber", function() {
        // Just to call
        movie = {
            movie_runtime: "foo"
        };

        movie.movie_runtime = "foo";
        n = ctrl.runtimeJustNumber(movie);

        expect(n).toEqual("foo");
    })
});
