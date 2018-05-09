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
                if (dayNumber) {
                    const suffixes = ['st','nd','rd','th'];
                    const suffix = dayNumber > 3 ? suffixes[3] : suffixes[dayNumber - 1];
                    return dayNumber + suffix;
                }
            };


			function getForecast10Day(day) {
                $scope.loadingDay = true;
			    weather.getForecast10Day().then(success => {
                    $scope.dayForecast = success.data.forecast.simpleforecast.forecastday[day];
                    getHourlyForecastForDay($routeParams.id);
                    $scope.loadingDay = false;
                    $scope.loadingDay = false;
                },error => {
                    console.log(error);
                    Raven.captureException(error);
                });
            }
            getForecast10Day($routeParams.id);


			function getHourlyForecastForDay(day) {
                $scope.loadingHours = true;
                locationService.getCurrentLocation().then(success => {
                    const currentDate = new Date();
                    const localDate = new Date(currentDate.toLocaleString('en', {timeZone: success.tz}));
                    const currentDay = new Date(localDate).getDate();
                    weather.getHourly10Day().then(success => {
                        $scope.dayForecast.hour = success.data.hourly_forecast.filter(hour => hour.FCTTIME.mday == currentDay + parseInt(day));
                        $scope.loadingHours = false;
                    },error => {
                        console.log(error);
                        Raven.captureException(error);
                    });
                },error => {
                    console.log(error);
                    Raven.captureException(error);
                });
            }



            $scope.$on('event: locationChange', function() {
                console.log('updating DaySummaryController');
                getForecast10Day($routeParams.id);
            });

		}
]);