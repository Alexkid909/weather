angular.module('Weather').controller('MainController',[
		'currentWeatherFactory',
		'forecastWeatherFactory',
		'searchFactory',
		'$scope',
		function(currentWeatherFactory,forecastWeatherFactory,searchFactory,$scope) {

			$scope.getForecastWeather = function() {
				return forecastWeatherFactory.data;
			};
			$scope.$watch($scope.getForecastWeather,function(newValue,oldValue) {
				if (newValue) {					
					$scope.forecastWeather = newValue.forecast;
					$scope.currentWeather = newValue.current;
					$scope.location = newValue.location;
				};
			});						
		}
	]);