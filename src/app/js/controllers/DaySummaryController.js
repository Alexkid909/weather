angular.module('Weather')
.controller('DaySummaryController',[
		'weather',
		'locationService',
		'$scope',
		'$routeParams',
		function(weather, locationService, $scope,$routeParams) {
			$scope.errors = [];
			$scope.dayForecast = {};
            $scope.appendDaySuffix = function(dayNumber) {
                var suffixes = ['st','nd','rd','th'];
                var suffix = dayNumber > 3 ? suffixes[3] : suffixes[dayNumber - 1];
                return dayNumber + suffix;
            };
            console.log($scope);

			function getLocation() {
                locationService.geoLookup().then(success => {
                    $scope.location = success.data.location;
                },error => console.log(error));
            }
            getLocation();


			function getForecast10Day(day) {
                weather.getForecast10Day().then(function(success) {
                    $scope.dayForecast = success.data.forecast.simpleforecast.forecastday[day];
                    console.log('dayForecast', $scope.dayForecast);
                },function(error) {
                    $scope.errors = [];
                    $scope.errors.push(error);
                });
            }
            getForecast10Day($routeParams.id);


			function getHourlyForecastFoDay(day) {
			    const currentDay = new Date().getDate();
			    weather.getHourly10Day().then(success => {
                    if (! $scope.dayForecast) {
                        debugger;
                    }
                    $scope.dayForecast.hour = success.data.hourly_forecast.filter(hour => hour.FCTTIME.mday == currentDay + parseInt(day));
                    console.log('dayForecast', $scope.dayForecast);
                });
            }
            getHourlyForecastFoDay($routeParams.id)
		}
]);