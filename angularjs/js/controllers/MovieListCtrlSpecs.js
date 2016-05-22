describe("pelitweets MovieListCtrl", function() {

    // To get the controller
    var ctrl;
    var moviesMock;

    beforeEach(function() {

        // Load module
        module('pelitweets');

        inject(function($controller, $q) {

            // Movies will be a promise
            moviesMock = $q.when();

            ctrl = $controller('MovieListCtrl', {
                movies: moviesMock
            });
        });
    });

    it("should have 'queryOptions' with default values", function() {
        expect(ctrl.queryOptions.orderby).toEqual('movie_release_date');
        expect(ctrl.queryOptions.reverse).toBe(true);
    });

    it("should have 'movies' resolved", function() {
        expect(ctrl.movies).toBeDefined();
    })
});
