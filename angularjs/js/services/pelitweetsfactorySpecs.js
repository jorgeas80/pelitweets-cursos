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


    it('should respond when asked for movies list', function() {

        var returnData = [
            {
                _id: "5735c1fb3cac51001011caed",
                movie_runtime: "102 min.",
                movie_country: "Reino Unido",
                movie_poster_link: "http://pics.filmaffinity.com/Esp_as_desde_el_cielo-991675306-main.jpg",
                movie_original_title: "Eye in the Sky",
                movie_official_web: "",
                movie_analyzed_date: "2016-05-20T12:01:19.011Z",
                movie_rating_average: "7.4",
                movie_rating_score: "-",
                movie_rating_imdb: "7.8",
                movie_rating_fa: "7.0",
                movie_release_date: "2016-05-13",
                movie_year: 2015,
                movie_plot: "La coronel Katherine Powell (Helen Mirren), una oficial de la inteligencia militar británica, lidera una operación secreta para capturar a un grupo de terroristas en Nairobi, Kenia. Cuando se da cuenta que los terroristas están en una misión suicida, ella debe cambiar sus planes de 'capturar' por 'matar'. El piloto estadounidense de drones Steve Watts (Aaron Paul) recibe la orden de destruir el refugio donde se hallan los terroristas, pero una niña de nueve años ingresa en la zona donde podría ser herida. (FILMAFFINITY)",
                movie_id_normalized: "espias-desde-el-cielo-5735c1fb3cac51001011caed",
                movie_title_normalized: "espias-desde-el-cielo",
                movie_title: "Espías desde el cielo"
            },
            {
                _id: "5735c2143cac51001011caf4",
                movie_runtime: "94 min.",
                movie_country: "Islandia",
                movie_poster_link: "http://pics.filmaffinity.com/Coraz_n_gigante-411707144-main.jpg",
                movie_original_title: "Fúsi (Virgin Mountain)",
                movie_official_web: "",
                movie_analyzed_date: "2016-05-20T12:01:19.021Z",
                movie_rating_average: "7.2",
                movie_rating_score: "-",
                movie_rating_imdb: "-",
                movie_rating_fa: "7.2",
                movie_release_date: "2016-05-13",
                movie_year: 2015,
                movie_plot: "Fúsi (Gunnar Jónsson), de 43 años, es un tipo inadaptado y con sobrepeso que nunca tuvo una novia y cuyo único interés son las batallas de la Segunda Guerra Mundial, que reproduce en miniatura en el apartamento en el que vive con su madre. Un día Fúsi recibe un cupón para acudir una escuela de baile, donde conoce a Sjöfn (Ilmur Kristjánsdóttir), otra alma solitaria como él, y una mujer con profundas heridas psicológicas. (FILMAFFINITY)",
                movie_id_normalized: "corazon-gigante-5735c2143cac51001011caf4",
                movie_title_normalized: "corazon-gigante",
                movie_title: "Corazón gigante"
            }];

        /**
         * We could use expectGET instead of whenGET. The difference is expectGET forces the service call to be done.
         * So, if we don't make any call and just return true, we'd get an error because of unsatisfied GET request
         */
        $httpBackend.whenGET("http://pelitweets.herokuapp.com/api/movies").respond(returnData);

        // Make service call to get the movies list
        var result = pelitweetsFactory.getMovieList();

        // flush calls
        $httpBackend.flush();

        // Can't just compare result and returnData with toEqual (not exactly the same type of objects)
        // Check http://stackoverflow.com/a/15488941/593722
        expect(result[0]._id).toEqual(returnData[0]._id);
    });

    it('should respond when asked for specific movie', function() {
        var returnData = {
            _id: "5735c1fb3cac51001011caed",
            movie_runtime: "102 min.",
            movie_id: "269092",
            movie_country: "Reino Unido",
            movie_poster_link: "http://pics.filmaffinity.com/Esp_as_desde_el_cielo-991675306-main.jpg",
            movie_original_title: "Eye in the Sky",
            movie_official_web: "",
            movie_analyzed_date: "2016-05-20T12:01:19.011Z"
        };

        $httpBackend.whenGET("http://pelitweets.herokuapp.com/api/movie/espias-desde-el-cielo-5735c1fb3cac51001011caed").respond(returnData);


        var result = pelitweetsFactory.getMovieDetail('espias-desde-el-cielo-5735c1fb3cac51001011caed');

        // flush calls
        $httpBackend.flush();

        // Check!
        expect(result._id).toEqual(returnData._id);
    })

});