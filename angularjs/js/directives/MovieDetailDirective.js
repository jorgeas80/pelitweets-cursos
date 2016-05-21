function MovieDetailDirective() {
    var directiveDefinitionObject = {
        restrict: "E",
        controller: MovieDetailCtrl,
        controllerAs: 'vm',
        scope: {
            movie: '='
        },
        templateUrl: "directivetpl/moviedetail.tpl.html"
    };

    return directiveDefinitionObject;
}
