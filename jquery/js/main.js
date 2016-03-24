$(document).ready(function() {

    // Para guardar las pelis
    var movies = [];
    var originalMoviesList = [];


    function showMoviesTable() {

        // Primero borramos las filas actuales
        $('#movies-table > tbody > tr').remove();

        // Ahora recorremos el array y añadimos las filas        
        $.each(movies, function(key, val) {
            var trElement = $("<tr>");

            // Titulo
            var tdElement = $("<td>").append(val.movie_title);
            trElement.append(tdElement);

            tdElement = $("<td>").append(val.movie_runtime);
            trElement.append(tdElement);

            tdElement = $("<td>").append(val.movie_release_date);
            trElement.append(tdElement);

            tdElement = $("<td>").append(val.movie_rating_imdb);
            trElement.append(tdElement);

            tdElement = $("<td>").append(val.movie_rating_fa);
            trElement.append(tdElement);

            var movieLink = '<a href="#detalle-peli/' + val.movie_id_normalized + '">Ver detalle</a>';
            tdElement = $("<td>").append(movieLink);
            trElement.append(tdElement);

            //$("#movies-table tr:last").after(trElement);
            $('#movies-table > tbody:last-child').append(trElement);
        })
    }


    /**
     * Callback para función de filtrado. Usamos 'keydown' para que detecte borrado
     **/
    $("#search-by-title").on('keydown', function(e) {
        
        // Vamos a buscar en la lista completa de pelis
        movies = originalMoviesList;
        
        // Obtengo lo que el usuario ha escrito
        var searchTerm = $("#search-by-title").val();
        var movies_found = [];

        // Si he escrito algo realmente...
        if (searchTerm) {
            movies_found = $.grep(movies, function(v) {
                
                // Se puede hacer de las dos formas. Con RegExp es más elegante
                return v.movie_title.search(new RegExp(searchTerm, "i")) >= 0;
                //return v.movie_title.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) >= 0;
            });

            // Si he encontrado películas que coincidan con la búsqueda, actualizo la tabla y la muestro
            if (movies_found) {
                movies = movies_found;
                showMoviesTable();
            }
        }
    })

    /**
     * Callbacks para elementos de ordenación
     * 
     * TODO: Evitar la repetición de código implementando una sola función. Podemos usar una clase
     * para todos los enlaces de ordenación y asociar la función a esa clase, en vez de a ids
     * individuales
     **/
    $("#sort-by-title-up").on('click', function(e) {

        // Evitamos que el enlace lleve a ningún sitio
        e.preventDefault();

        // Ordenamos el array de películas por título
        movies.sort(function(a, b) {
            return b.movie_title.localeCompare(a.movie_title);
        });

        // Volvemos a mostrar la tabla
        showMoviesTable();
    });

    $("#sort-by-title-down").on('click', function(e) {
        // Evitamos que el enlace lleve a ningún sitio
        e.preventDefault();

        // Ordenamos el array de películas por título
        movies.sort(function(a, b) {
            return a.movie_title.localeCompare(b.movie_title);
        });

        // Volvemos a mostrar la tabla
        showMoviesTable();
    });

    $("#sort-by-runtime-up").on('click', function(e) {

        // Evitamos que el enlace lleve a ningún sitio
        e.preventDefault();

        // Ordenamos el array de películas por título
        movies.sort(function(a, b) {
            return parseFloat(b.movie_runtime) - parseFloat(a.movie_runtime);
        });

        // Volvemos a mostrar la tabla
        showMoviesTable();
    });

    $("#sort-by-runtime-down").on('click', function(e) {
        // Evitamos que el enlace lleve a ningún sitio
        e.preventDefault();

        // Ordenamos el array de películas por título
        movies.sort(function(a, b) {
            return parseFloat(a.movie_runtime) - parseFloat(b.movie_runtime);
        });

        // Volvemos a mostrar la tabla
        showMoviesTable();
    });

    $("#sort-by-release-date-up").on('click', function(e) {

        // Evitamos que el enlace lleve a ningún sitio
        e.preventDefault();

        // Ordenamos el array de películas por título
        movies.sort(function(a, b) {
            return b.movie_release_date.localeCompare(a.movie_release_date);
        });

        // Volvemos a mostrar la tabla
        showMoviesTable();
    });

    $("#sort-by-release-date-down").on('click', function(e) {
        // Evitamos que el enlace lleve a ningún sitio
        e.preventDefault();

        // Ordenamos el array de películas por título
        movies.sort(function(a, b) {
            return a.movie_release_date.localeCompare(b.movie_release_date);
        });

        // Volvemos a mostrar la tabla
        showMoviesTable();
    });

    $("#sort-by-imdb-rating-up").on('click', function(e) {

        // Evitamos que el enlace lleve a ningún sitio
        e.preventDefault();

        // Ordenamos el array de películas por título
        movies.sort(function(a, b) {
            return parseFloat(b.movie_rating_imdb) - parseFloat(a.movie_rating_imdb);
        });

        // Volvemos a mostrar la tabla
        showMoviesTable();
    });

    $("#sort-by-imdb-rating-down").on('click', function(e) {
        // Evitamos que el enlace lleve a ningún sitio
        e.preventDefault();

        // Ordenamos el array de películas por título
        movies.sort(function(a, b) {
            return parseFloat(a.movie_rating_imdb) - parseFloat(b.movie_rating_imdb);
        });

        // Volvemos a mostrar la tabla
        showMoviesTable();
    });

    $("#sort-by-fa-rating-up").on('click', function(e) {

        // Evitamos que el enlace lleve a ningún sitio
        e.preventDefault();

        // Ordenamos el array de películas por título
        movies.sort(function(a, b) {
            return parseFloat(b.movie_rating_fa) - parseFloat(a.movie_rating_fa);
        });

        // Volvemos a mostrar la tabla
        showMoviesTable();
    });

    $("#sort-by-fa-rating-down").on('click', function(e) {
        // Evitamos que el enlace lleve a ningún sitio
        e.preventDefault();

        // Ordenamos el array de películas por título
        movies.sort(function(a, b) {
            return parseFloat(a.movie_rating_fa) - parseFloat(b.movie_rating_fa);
        });

        // Volvemos a mostrar la tabla
        showMoviesTable();
    });





    // Funcion para obtener el array de peliculas en formato JSON del servidor
    // Si el servidor no responde, usar la segunda línea en vez de la primera
    $.getJSON( "http://pelitweets.herokuapp.com/api/movies")
    //$.getJSON( "../../resources/movies.json")

    // Si ha habido exito...
        .done(function(data) {

        $.each(data, function(key, val) {
            movies.push(val);
        });

        // Ocultamos la ventana de carga
        $("#loading-movies").hide();
        
        // Keep a clean copy
        originalMoviesList = movies;

        // Mostramos la lista de peliculas en formato de tabla
        showMoviesTable();
    })

    // Si hubo algun error...
        .fail(function (jqXHR, textStatus, error) {
        $("#error-getting-movies").show();
        console.log(error);
    })
});


