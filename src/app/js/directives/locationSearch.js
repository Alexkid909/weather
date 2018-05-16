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
                $scope.currentLocation = '';
                $scope.inputFocus = false;


                $scope.changeInputFocus = (value) => {
                    console.log(value);
                    $scope.inputFocus = value;
                };

                $scope.$watch('inputFocus', (newValue) => {
                    $scope.searchPlaceholder = !newValue ? $scope.currentLocation : 'Enter a location';
                    console.log($scope.searchPlaceholder);
                });

                function resetSearchField() {
                    $scope.searchTerm = '';
                }
                function resetSearchResults() {
                    $scope.searchResults = {RESULTS: []};
                }

                function getCurrentLocation() {
                    locationService.getCurrentLocation().then(success => {
                        locationService.geoLookup(success.l).then(success => {
                            const location = success.data.location;
                            $scope.searchPlaceholder = $scope.currentLocation = `${location.city}, ${location.country === 'US' ? `${location.state} ` : `${location.country_name}`} `;
                        },error => {
                            console.log(error);
                            Raven.captureException(error);
                        });
                    },error => {
                        console.log(error);
                        Raven.captureException(error);
                    });
                }
                getCurrentLocation();
                resetSearchField();
                resetSearchResults();
                $scope.$watch('searchTerm',function (newValue, oldValue) {
                    if (!newValue) {
                        resetSearchResults()
                    } else if (newValue !== oldValue) {
                        $scope.loadingSearchResults = true;
                        locationService.search(newValue)
                            .then(function(success) {
                                $scope.searchResults = success.data.RESULTS.slice(0,5);
                                $scope.loadingSearchResults = false;
                            },function(error) {
                                console.log(error);
                            });
                    }
                });
                $scope.selectLocation = function(location) {
                    locationService.setCurrentLocation(location);
                    resetSearchResults();
                    resetSearchField();
                }

            }
        }
    }
]);