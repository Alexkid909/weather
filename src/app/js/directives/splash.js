angular.module('Weather').directive('splash', [
    function() {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/templates/splash.html',
        }
    }
]);