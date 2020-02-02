angular.module('Weather')
.controller('TodaySummaryController',[
		'weather',
		'locationService',
		'$scope',
		'$q',
		function(weather, locationService, $scope, $q) {
            $scope.$emit('dayForecastLoading', {status: true});
            $scope.$emit('hourForecastLoading', {status: true});
			$scope.errors = [];
			$scope.todayForecast = {hours: []};
			function getTodaysWeather() {
                $scope.$emit('dayForecastLoading', {status: true});
                $scope.$emit('hourForecastLoading', {status: true});

                $q.all([weather.getCurrentWeather(), weather.getDailyForecast(0)])
                    .then((data) => {
                        $scope.currentWeather = data[0];
                        $scope.forecastWeather = data[1];
                        $scope.$emit('dayForecastLoading', {status: false});
                    });

                weather.getHourlyForecast(0).then((data) => {
                    $scope.todayForecast.hours = data.map((hour) => {
                        const hourNum = hour.friendlyDate.getHours();
                        hour.periods = [{
                            name: 'hour',
                            value: `${hourNum}${hourNum > 11 ? 'pm' : 'am'}`
                        }];
                        return hour;
                    });
                    $scope.$emit('hourForecastLoading', {status: false});
                });
            }
            getTodaysWeather();

            $scope.$on('event: locationChange', () => {
                getTodaysWeather();
            });

        }
]);