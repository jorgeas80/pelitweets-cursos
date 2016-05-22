describe("pelitweets MovieDetailCtrl", function() {

    // To get the controller
    var ctrl;
    var mockPelitweetsFactory;

    beforeEach(function() {

        // Load module
        module('pelitweets');

        inject(function($controller, $routeParams) {

            mockPelitweetsFactory = jasmine.createSpyObj('pelitweetsFactory', ['getMovieDetail']);
            mockPelitweetsFactory.getMovieDetail.and.returnValue("foo");

            ctrl = $controller('MovieDetailCtrl', {
                $routeParams: $routeParams,
                pelitweetsFactory: mockPelitweetsFactory
            });
        });
    });

    it("should get the expected data from service", function() {
        expect(mockPelitweetsFactory.getMovieDetail).toHaveBeenCalled();
        expect(ctrl.movie).toEqual("foo");
    });

});
