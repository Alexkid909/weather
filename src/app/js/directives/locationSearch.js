angular.module('Weather').directive('locationSearch', [
    'locationService',
    function() {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/templates/locationSearch.html',
            controller: function($scope,locationService) {
                function resetSearchField() {
                    $scope.searchTerm = '';
                }
                function resetSearchResults() {
                    $scope.searchResults = {RESULTS: []};
                }
                resetSearchField();
                resetSearchResults();
                $scope.$watch('searchTerm',function (newValue, oldValue) {
                    if (!newValue) {
                        resetSearchResults()
                    } else if (newValue !== oldValue) {
                        locationService.search(newValue)
                            .then(function(success) {
                                $scope.searchResults = success.data;
                            },function(error) {
                                console.log(error);
                            });
                    }
                })
                $scope.selectLocation = function(location) {
                    locationService.setCurrentLocation(location);
                    resetSearchResults();
                    resetSearchField();
                }

            }
        }
    }
]);