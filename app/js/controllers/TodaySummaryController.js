angular.module('Weather')
.controller('TodaySummaryController',[
		'forecastWeather',
		'$scope',
		function(forecastWeather,$scope) {
			forecastWeather.then(function(success) {
				$scope.forecastWeather = success.data.forecast.forecastday[0];
				$scope.currentWeather = success.data.current;
			}, function(error) {
				$scope.forecastWeather.err = error;	
				console.log($scope.forecastWeather.err);
			});	
		}
]);