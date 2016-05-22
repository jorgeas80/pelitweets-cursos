/**
 * Created by jorge on 21/05/16.
 */
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            "vendor/angular.js",
            "vendor/angular-route.js",
            "vendor/angular-resource.js",
            "vendor/angular-mocks.js",
            "services/pelitweetsfactory.js",
            "controllers/MovieListCtrl.js",
            "controllers/MovieDetailCtrl.js",
            "directives/MovieDetailDirective.js",
            "main.js",
            "services/pelitweetsfactorySpecs.js"
        ],
        autoWatch: true,
        browsers: ['Chrome']
    });
};