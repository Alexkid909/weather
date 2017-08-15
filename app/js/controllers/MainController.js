angular.module('Weather').controller('MainController',[
		'forecastWeather',
		'searchFactory',
		'$scope',
		function(forecastWeather,searchFactory,$scope) {
			$scope.forecastWeather = {};
			$scope.mainSummaryDay = 0;
			forecastWeather.then(function(success) {
				$scope.forecastWeather.forecastDays = success.data.forecast.forecastday;
				$scope.currentWeather = success.data.current;
				$scope.location = success.data.location;
			}, function(error) {
				$scope.forecastWeather.err = error;	
				console.log($scope.forecastWeather.err);
			});					
		}
	]);