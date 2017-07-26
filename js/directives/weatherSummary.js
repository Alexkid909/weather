angular.module('Weather')
.directive('weatherSummary',['forecastWeatherFactory', function(forecastWeatherFactory) {
	return {
		restrict: 'E',
		scope: {
			lastUpdated: '=',
			periodDenominator: '@',
			condition: '=',
			tempCurrent: '=',
			tempHigh: '=',
			tempLow: '=',
			windSpeed: '=',
			windDirection: '='
		},
		controller: function($scope) {
			$scope.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			$scope.$watch(function() {
				return $scope.lastUpdated;
			},
			function(newValue,oldValue) {
				if (newValue) {					
					debugger;
					$scope.period = new Date(newValue);
					console.log($scope.period);
				};	
			});	
			console.log($scope);
		},
		templateUrl: 'js/directives/templates/weatherSummary.html'
	}
}])