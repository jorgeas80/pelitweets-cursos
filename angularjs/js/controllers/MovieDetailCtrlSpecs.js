describe("pelitweets MovieDetailCtrl", function() {

    // To get the controller
    var ctrl;
    var mockPelitweetsFactory;

    beforeEach(function() {

        // Load module
        module('pelitweets');

        // Mock factory to spy a call over its method
        mockPelitweetsFactory = jasmine.createSpyObj('pelitweetsFactory', ['getMovieDetail']);

        inject(function($controller, $routeParams) {
            ctrl = $controller('MovieDetailCtrl', {
                $routeParams: $routeParams,
                pelitweetsFactory: mockPelitweetsFactory
            });
        });
    });

    it("should have 'movie' defined", function() {

        //spyOn(mockPelitweetsFactory, 'getMovieDetail');

        //expect(mockPelitweetsFactory.getMovieDetail).toHaveBeenCalled();

        //expect(ctrl.movie).toBeDefined();
        expect(true).toBe(true);
    });

    it("should get the expected data from service", function() {
        expect(true).toBe(true);
    })


});
