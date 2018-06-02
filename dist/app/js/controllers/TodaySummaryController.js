angular.module('Weather')
.controller('TodaySummaryController',[
		'weather',
		'locationService',
		'$scope',
		function(weather, locationService, $scope) {
            $scope.$emit('dayForecastLoading', {status: true});
            $scope.$emit('hourForecastLoading', {status: true});
			$scope.errors = [];
			$scope.todayForecast = {hour: []};
			function getHourlyToday() {
                $scope.$emit('hourForecastLoading', {status: true});
                weather.getHourlyToday().then(success => {
                    const hourly_forecast = success.data.hourly_forecast;
                    const currentDate = new Date($scope.currentWeather.local_epoch * 1000);
                    const localDate = new Date(currentDate.toLocaleString('en', {timeZone: $scope.currentWeather.local_tz_long}));
                    const currentMDay = localDate.getDate();
                    const currentHour = localDate.getHours();
                    $scope.todayForecast.hour = hourly_forecast.filter(hour => hour.FCTTIME.mday == currentMDay && hour.FCTTIME.hour > currentHour);
                    $scope.$emit('hourForecastLoading', {status: false});
                },error => {
                    console.log(error);
                    Raven.captureException(error);
                });
            }
			function getCurrentWeather() {
                $scope.$emit('dayForecastLoading', {status: true});
                weather.getCurrentWeather()
                    .then(success => {
                        $scope.currentWeather = success.data.current_observation;
                        getHourlyToday();
                        $scope.$emit('dayForecastLoading', {status: false});
                    },error => {
                        console.log(error);
                        Raven.captureException(error);
                    });
            }
            getCurrentWeather();

            $scope.$on('event: locationChange', () => {
                console.log('updating TodaySummaryController');
                getCurrentWeather();
            });

        }
]);