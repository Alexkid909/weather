angular.module('Weather').controller('MainController',[
		'currentWeatherFactory',
		'forecastWeatherFactory',
		'searchFactory',
		'$scope',
		function(currentWeatherFactory,forecastWeatherFactory,searchFactory,$scope) {

			$scope.getForecastWeather = function() {
				return forecastWeatherFactory.data;
			};
			// $scope.getSearch = function() {
			// 	return searchFactory.data;
			// };
			$scope.$watch($scope.getForecastWeather,function(newValue,oldValue) {
				if (newValue) {					
					$scope.forecastWeather = newValue.forecast;
					$scope.currentWeather = newValue.current;
					$scope.location = newValue.location;
					// console.log($scope.currentWeather);
				};
			});	
			// $scope.$watch($scope.getSearch,function(newValue,oldValue) {
			// 	console.log(newValue);
			// });						
		}
	]);