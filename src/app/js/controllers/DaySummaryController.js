angular.module('Weather')
.controller('DaySummaryController',[
		'weather',
		'locationService',
		'$scope',
		'$routeParams',
		function(weather, locationService, $scope,$routeParams) {
            $scope.loadingDay = true;
            $scope.loadingHours = true;
			$scope.errors = [];
			$scope.dayForecast = {};
            $scope.appendDaySuffix = function(dayNumber) {
                var suffixes = ['st','nd','rd','th'];
                var suffix = dayNumber > 3 ? suffixes[3] : suffixes[dayNumber - 1];
                debugger;
                var result = dayNumber + suffix;
                isNaN(result) ? false : result;
            };


			function getForecast10Day(day) {
                $scope.loadingDay = true;
			    weather.getForecast10Day().then(function(success) {
                    $scope.dayForecast = success.data.forecast.simpleforecast.forecastday[day];
                    getHourlyForecastForDay($routeParams.id);
                    $scope.loadingDay = false;
                    $scope.loadingDay = false;
                },function(error) {
                    $scope.errors = [];
                    $scope.errors.push(error);
                });
            }
            getForecast10Day($routeParams.id);


			function getHourlyForecastForDay(day) {
                $scope.loadingHours = true;
			    const currentDay = new Date().getDate();
			    weather.getHourly10Day().then(success => {
                    $scope.dayForecast.hour = success.data.hourly_forecast.filter(hour => hour.FCTTIME.mday == currentDay + parseInt(day));
                    $scope.loadingHours = false;
                },function(error) {
			        console.log(error)
                });
            }


            $scope.$on('event: locationChange', function() {
                console.log('updating DaySummaryController');
                getForecast10Day($routeParams.id);
            });

		}
]);