angular.module('Weather').directive('weatherSummary',[
	'locationService',
	function() {
	return {
		restrict: 'E',
		scope: {
			class: '@',
			periods: '=',
			condition: '=',
			tempCurrent: '=',
			tempHigh: '=',
			tempLow: '=',
			windSpeed: '=',
			windDirection: '=',
			windDegree: '=',
			date: '=',
			iconPath: '='
		},
		controller: function(locationService, $scope,$filter,$element) {
			$scope.location = {};
			// locationService.geoLookup().then(success => {
			// 	console.log(success);
			// 	debugger;
            // }, error => {
			// 	console.log(error);
			// });
            // if ($scope.class === 'daily-summary') {
            // 	console.log($scope.periods);
            //     debugger;
            // };
		},
		templateUrl: 'app/js/directives/templates/weatherSummary.html'
	}
}]);