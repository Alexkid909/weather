angular.module('Weather').directive('locationSearch', [
    'locationService',
    function() {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/templates/locationSearch.html',
            controller: function($scope,locationService) {
                $scope.loadingSearchResults = false;
                $scope.searchResults = [];
                $scope.searchPlaceholder = '';
                $scope.inputFocus = false;

                $scope.changeInputFocus = (value) => {
                    console.log(value);
                    $scope.inputFocus = value;
                };

                $scope.$watch('inputFocus', (newValue) => {
                    $scope.searchPlaceholder = newValue ? 'Enter a location' : $scope.currentLocation || 'Search for a location';
                });

                function resetSearchField() {
                    $scope.searchTerm = '';
                }
                function resetSearchResults() {
                    $scope.searchResults = {RESULTS: []};
                }

                function getCurrentLocation() {
                    locationService.getCurrentLocation().then(success => {
                        const locationData = success;
                        $scope.searchPlaceholder = $scope.currentLocation = `${locationData.name} - ${locationData.address}`;
                    },error => {
                        $scope.$broadcast('event: locationUnknown', error);
                    });
                }
                getCurrentLocation();
                resetSearchField();
                resetSearchResults();

                $scope.$watch('searchTerm',function (newValue, oldValue) {
                    if (!newValue) {
                        resetSearchResults()
                    } else if (newValue !== oldValue && newValue.length >= 2) {
                        resetSearchResults();
                        $scope.loadingSearchResults = true;
                        clearTimeout($scope.search);
                        $scope.search = setTimeout(() => {
                            locationService.search($scope.searchTerm)
                                .then(function(success) {
                                    $scope.searchResults = success.data;
                                    $scope.loadingSearchResults = false;
                                },function(error) {
                                    console.log(error);
                                });
                        }, 500);
                    }
                });
                $scope.selectLocation = function(location) {
                    $scope.searchPlaceholder = `${location.name} - ${location.address}`;
                    locationService.setCurrentLocation(location);
                    resetSearchResults();
                    resetSearchField();
                };
            }
        }
    }
]);