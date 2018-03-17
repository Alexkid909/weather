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
            ($scope.class === 'daily-summary') && console.log($scope.periods);
            // console.log($scope.class);
            // $scope.periods.forEach(function(period) {console.log(period)});

            // console.log($scope.periods);
            // $scope.class === 'daily-summary' && $scope.$watch(function() {
            // 	return $scope.periods;
            // }, function(newValue) {
            // 	console.log(newValue);
            // 	// newValues[1] === 'day-summary' && newValues[0].hasOwnProperty('dayName') && /*(newValue['dayName'].value) &&*/ console.log(newValue);
            // }, true);
            // ($scope.class === 'daily-summary') && console.log($scope.periods);
            // $scope.periods.forEach(period => {
            //     (period.name === 'dayWithSuffix') && (period.value = period.value + getDaySuffix(period.value));
            //     console.log(period.value);
            // });
            // ($scope.class === 'daily-summary') && console.log($scope.periods);
			// console.log($scope.periods);
				// var myDate = new Date(parseInt($scope.date) * 1000).toLocaleString({ timeZone: $scope.timeZone});
				// $scope.setPeriods = function(date,periods) {
				// 	var setDayName = function(date) {
				// 		var result = $filter('date')(date,'EEE');
				// 		return result;
				// 	};
				// 	var dayName = setDayName(date);
				// 	var day = $filter('date')(date,'d');

				// 	var daySuffix = getDaySuffix(day);
				// 	var dayWithSuffix = day+daySuffix;
				// 	var month = $filter('date')(date,'MMM');
				// 	var time = $filter('date')(date,'H') + $filter('date')(date,'a').toLowerCase();
                //
				// 	periods = periods.map(function(period) {
				// 		var obj = {};
				// 		obj.periodName = period;
				// 		obj.periodValue = eval(`${period}`);
				// 		return obj;
				// 	});
				// 	return periods;
				// };
				// $scope.$watch(function() {
				// 	return $scope.periods;
				// },
				// function(newValue) {
				// 	console.log('periods', newValue);
				// 	if (newValue) {
				// 		debugger;
                //
				// 		var todaysDate = new Date();
				// 		var newValueDate = new Date(parseInt(newValue)*1000);
				// 		if ($scope.periods != 'time' && newValueDate == todaysDate) {
				// 			var obj = {};
				// 			if ($scope.tempCurrent) {
				// 				obj.periodName = 'now';
				// 				obj.periodValue = 'Now';
				// 			} else {
				// 				obj.periodName = 'today';
				// 				obj.periodValue = 'Today';
				// 			}
				// 			$scope.periods = [obj];
				// 		} else {
				// 			var now = new Date();
				// 			var newValueDateTime = new Date(newValue);
				// 			$scope.periods = $scope.setPeriods(new Date(parseInt(newValue) * 1000),$scope.periods);
				// 			$scope.inFuture = now <= newValueDateTime;
				// 			// console.log('time periods', $scope.periods);
				// 		}
				// 	};
				// });
            // console.log('end periods', $scope.periods);
		},
		templateUrl: 'app/js/directives/templates/weatherSummary.html'
	}
}]);