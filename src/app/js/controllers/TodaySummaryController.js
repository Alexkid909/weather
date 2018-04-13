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
				    console.log(success);
                    const hourly_forecast = success.data.hourly_forecast;
                    const currentDate = new Date($scope.currentWeather.local_epoch * 1000);
                    const localDate = new Date(currentDate.toLocaleString('en', {timeZone: $scope.currentWeather.local_tz_long}));
                    const currentMDay = localDate.getDate();
                    const currentHour = localDate.getHours();
                    $scope.todayForecast.hour = hourly_forecast.filter(hour => hour.FCTTIME.mday == currentMDay && hour.FCTTIME.hour > currentHour);
                    $scope.loadingHours = false;
                },function(error) {
                    $scope.errors = [];
                    $scope.errors.push(error);
                });
            }
			function getCurrentWeather() {

                weather.getCurrentWeather()
                    .then(success => {
                        $scope.currentWeather = success.data.current_observation;
                        getHourlyToday();
                        $scope.loadingDay = false;

                    }, error => console.log(error));

            }
            getCurrentWeather();

            $scope.$on('event: locationChange', function() {
                console.log('updating TodaySummaryController');
                getCurrentWeather();
            });

        }
]);