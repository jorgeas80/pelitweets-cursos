describe("pelitweets Factory", function() {

    // Variables needed
    var pelitweetsFactory;
    var $httpBackend;

    beforeEach(function() {
        // Load the module
        module('pelitweets');

        // Inject needed services for tests:
        //  * Mock http service, to mock HTTP calls
        //  * The actual pelitweetsfactory service
        // Use underscore notation
        inject(function(_$httpBackend_, _pelitweetsFactory_) {
            $httpBackend = _$httpBackend_;
            pelitweetsFactory = _pelitweetsFactory_;
        });

        // Another way to do it, using $injector
        /*
        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            pelitweetsFactory = $injector.get('pelitweetsFactory');
        });
        */
    });

    // Verify all HTTP requests were made
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should respond when asked for movie list', function() {
        return true;
    });


});