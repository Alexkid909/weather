angular.module('Weather').controller('MainController',[
		'forecastWeatherFactory',
		'searchFactory',
		'$scope',
		function(forecastWeatherFactory,searchFactory,$scope) {
			$scope.forecastWeather = {};
			$scope.mainSummaryDay = 0;
			$scope.getForecastWeather = function() {
				return forecastWeatherFactory.data;
			};
			$scope.$watch($scope.getForecastWeather,function(newValue,oldValue) {
				if (newValue) {					
					$scope.forecastWeather.forecastDays = newValue.forecast.forecastday;
					$scope.currentWeather = newValue.current;
					$scope.location = newValue.location;
					console.log($scope);
				};
			});						
		}
	]);