angular.module('Weather')
.controller('DaySummaryController',[
		'weather',
		'locationService',
		'$scope',
		'$routeParams',
		function(weather, locationService, $scope,$routeParams) {
            $scope.$emit('dayForecastLoading', {status: true});
            $scope.$emit('hourForecastLoading', {status: true});
			$scope.errors = [];
			$scope.dayForecast = {hour: {}};
            $scope.appendDaySuffix = function(dayNumber) {
                if (dayNumber) {
                    const suffixes = ['st','nd','rd','th'];
                    const suffix = dayNumber > 3 ? suffixes[3] : suffixes[dayNumber - 1];
                    return dayNumber + suffix;
                }
            };


			function getForecast10Day(day) {
                $scope.$emit('dayForecastLoading', {status: true});
                weather.getForecast10Day().then(success => {

                    $scope.dayForecast = success.data.forecast.simpleforecast.forecastday
                        .filter(forecastday => forecastday.date.day == day)[0];
                    getHourlyForecastForDay($routeParams.day);
                    $scope.$emit('dayForecastLoading', {status:false});
                },error => {
                    console.log(error);
                    Raven.captureException(error);
                });
            }
            getForecast10Day($routeParams.day);


			function getHourlyForecastForDay(day) {
                $scope.$emit('hourForecastLoading', {status: true});
                locationService.getCurrentLocation().then(success => {

                    weather.getHourly10Day().then(success => {
                        $scope.dayForecast.hour = success.data.hourly_forecast
                            .filter(hour => (hour.FCTTIME.mday == day));
                        $scope.$emit('hourForecastLoading', {status: false});
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
                getForecast10Day($routeParams.day);
            });

		}
]);