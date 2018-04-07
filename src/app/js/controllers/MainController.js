angular.module('Weather').controller('MainController',[
		'weather',
		'$scope',
		'locationService',
		function(weather,$scope, locationService) {
			$scope.errors = [];
			$scope.currentLocation = '';
			$scope.weatherLocation;
			$scope.forecastWeather;
            $scope.appendDaySuffix = function(dayNumber) {
                var suffixes = ['st','nd','rd','th'];
                var suffix = dayNumber > 3 ? suffixes[3] : suffixes[dayNumber - 1];
                return dayNumber + suffix;
            };
            function getCurrentLocation() {
                locationService.getCurrentLocation().then(success => {
                    locationService.geoLookup(success.l).then(success => {
                    	const location = success.data.location;
                    	$scope.currentLocation = `${location.city}, ${location.country === 'US' ? `${location.state} ` : `${location.country_name}`} `;
					})
                }, error => {
                    console.log(error);
                });
            }
			function getForecast10Day() {
				weather.getForecast10Day().then(success => {
					$scope.forecastWeather = success.data.forecast.simpleforecast.forecastday;
				},error => {
					$scope.errors = [];
					$scope.errors.push(error);
				});	
			};
			getForecast10Day();
			getCurrentLocation();
			$scope.$on('event: locationChange', function() {
				console.log('updating MainController');
				getForecast10Day();
				getCurrentLocation();
            });
		}
	]);

