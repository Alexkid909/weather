angular.module('Weather')
.controller('DaySummaryController',[
		'forecastWeather',
		'$scope',
		'$routeParams',
		function(forecastWeather,$scope,$routeParams) {
			forecastWeather.then(function(success) {
				$scope.forecastWeather = success.data.forecast.forecastday[$routeParams.id];
				$scope.currentWeather = success.data.current;
			}, function(error) {
				$scope.forecastWeather.err = error;	
				console.log($scope.forecastWeather.err);
			});				
		}
]);