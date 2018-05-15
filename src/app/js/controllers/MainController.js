angular.module('Weather').controller('MainController',[
		'weather',
		'$scope',
		'locationService',
		function(weather,$scope, locationService) {
			$scope.loadingForecast = true;
			$scope.errors = [];
			$scope.currentLocation = '';
			$scope.weatherLocation;
			$scope.forecastWeather;
			$scope.localTimeString = function() {

			};
            $scope.appendDaySuffix = dayNumber => {
                const suffixes = ['st','nd','rd','th'];
                const suffix = dayNumber > 3 ? suffixes[3] : suffixes[dayNumber - 1];
                return dayNumber + suffix
            };
            function getCurrentLocation() {
                locationService.getCurrentLocation().then(success => {
                    locationService.geoLookup(success.l).then(success => {
                    	const location = success.data.location;
                    	$scope.currentLocation = `${location.city}, ${location.country === 'US' ? `${location.state} ` : `${location.country_name}`} `;
                    },error => {
                        console.log(error);
                        Raven.captureException(error);
                    });
                },error => {
                    console.log(error);
                    Raven.captureException(error);
                });
            }
			function getForecast10Day() {
                $scope.loadingForecast = true;
				weather.getForecast10Day().then(success => {
					$scope.forecastWeather = success.data.forecast.simpleforecast.forecastday;
					$scope.loadingForecast = false;
                },error => {
					$scope.errors = [];
					$scope.errors.push(error);
				});	
			}
			getForecast10Day();
			getCurrentLocation();
			$scope.$on('event: locationChange', () => {
				console.log('updating MainController');
				getForecast10Day();
				getCurrentLocation();
            });
		}
	]);

