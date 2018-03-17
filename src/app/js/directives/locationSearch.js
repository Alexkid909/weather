angular.module('Weather').directive('locationSearch', [
    'locationService',
    function() {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/templates/locationSearch.html',
            controller: function($scope,locationService) {
                $scope.searchTerm = '';
                $scope.searchResults;
                $scope.$watch('searchTerm',function (newValue) {
                    (newValue) && searchService.search(newValue)
                        .then(function(success) {
                            $scope.searchResults = success.data;
                            console.log($scope.searchResults);
                        },function(error) {
                            console.log(error);
                        });
                })

            }
        }
    }
]);