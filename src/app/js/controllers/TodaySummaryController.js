angular.module('Weather')
.controller('TodaySummaryController',[
		'weather',
		'locationService',
		'$scope',
		function(weather, locationService, $scope) {
			$scope.errors = [];
			$scope.todayForecast = {hour: []};
            // $scope.location;
            //
            // locationService.geoLookup().then(success => {
            // 	$scope.location = success.data.location;
            // 	console.log('location', $scope.location);
            // },error => console.log(error));

			function getHourlyToday() {
				weather.getHourlyToday().then(function(success) {
                    const hourly_forecast = success.data.hourly_forecast;
                    const currentDate = new Date;
                    const currentMDay = currentDate.getDate();
                    const currentHour = currentDate.getHours();
                    $scope.todayForecast.hour = hourly_forecast.filter(hour => hour.FCTTIME.mday == currentMDay && hour.FCTTIME.hour > currentHour);
                    console.log('todayForecast', $scope.todayForecast);
                },function(error) {
                    $scope.errors = [];
                    $scope.errors.push(error);
                });
			}

			function getCurrentWeather() {
                weather.getCurrentWeather()
                    .then(success => {
                        $scope.currentWeather = success.data.current_observation;
                        console.log('currentWeather', $scope.currentWeather);
                    }, error => console.log(error));
            }
            getCurrentWeather();
			getHourlyToday();

            $scope.$on('event: locationChange', function() {
                console.log('updating TodaySummaryController');
                getCurrentWeather();
                getHourlyToday();
            });

        }
]);