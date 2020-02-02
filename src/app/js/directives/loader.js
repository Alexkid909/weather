angular.module('Weather').directive('loader', [
    function() {
        return {
            restrict: 'E',
            scope: {
                loading: '=',
                loaderClass: '@'
            },
            templateUrl: 'app/js/directives/templates/loader.html',
            controller: function($scope) {
                $scope.$watch('loading', function(newValue) {
                    console.log('loader loading', newValue);
                });
            }
        }
    }
]);