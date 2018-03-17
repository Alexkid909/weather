angular.module('Weather').controller('MainController',[
		'weather',
		'$scope',
		function(weather,$scope) {
			$scope.errors = [];
			$scope.location = "London";
			$scope.weatherLocation;
			$scope.forecastWeather;
            $scope.appendDaySuffix = function(dayNumber) {
                var suffixes = ['st','nd','rd','th'];
                var suffix = dayNumber > 3 ? suffixes[3] : suffixes[dayNumber - 1];
                return dayNumber + suffix;
            };
			function getForecast10Day() {
				weather.getForecast10Day().then(success => {
					$scope.forecastWeather = success.data.forecast.simpleforecast.forecastday;
					console.log('forecastWeather', $scope.forecastWeather);
				},error => {
					$scope.errors = [];
					$scope.errors.push(error);
				});	
			};
			getForecast10Day();

			// function getCurrentWeather() {
             //    weather.getCurrentWeather()
             //        .then(success => {
             //            $scope.currentWeather = success.data.current_observation;
             //            // console.log('current', $scope.currentWeather);
             //        }, error => console.log(error));
			// }
			// getCurrentWeather();

			// $scope.updateWeather = function() {
			// 	debugger;
			// 	weather.setLocation($scope.location);
			// 	$scope.getWeather();
			// }
		}
	]);

