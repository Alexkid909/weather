angular.module('Weather')
.directive('weatherSummary',[function() {
	return {
		restrict: 'E',
		scope: {
			periods: '=',
			condition: '=',
			tempCurrent: '=',
			tempHigh: '=',
			tempLow: '=',
			windSpeed: '=',
			windDirection: '=',
			windDegree: '=',
			date: '=',
			iconPath: '=',
			index: '='
		},
		controller: function($scope,$filter,$element) {
			$scope.checkIfInFuture = function(value,index,array) {
				console.log(value,index,array);
				debugger;
			}
			$scope.setPeriods = function(date,periods) {
				var setDayName = function(date) {
					var result = $filter('date')(date,'EEE');
					return result; 
				};
				var dayName = setDayName(date);
				var day = $filter('date')(date,'d');				
				var getDaySuffix = function(dayNumber) {
					var suffixes = ['st','nd','rd','th'];
					var result = dayNumber > 3 ? suffixes[3] : suffixes[dayNumber - 1];
					return result;
				}
				var daySuffix = getDaySuffix(day);
				var dayWithSuffix = day+daySuffix;
				var month = $filter('date')(date,'MMM');
				var time = $filter('date')(date,'H') + $filter('date')(date,'a').toLowerCase();

				periods = periods.map(function(period) {
					var obj = {};
					obj.periodName = period;
					obj.periodValue = eval(`${period}`);
					return obj;
				})
				return periods;
			}
			$scope.$watch(function() {
				return $scope.date;
			},
			function(newValue,oldValue) {
				if (newValue) {	
					var todaysDate = $filter('date')(new Date(), 'yyyy-MM-dd');
					var newValueDate = $filter('date')(new Date(newValue),'yyyy-MM-dd');
					if ($scope.periods != 'time' && newValueDate == todaysDate) {
						var obj = {};
						obj.periodName = 'today';
						obj.periodValue = 'Today';
						$scope.periods = [obj];
					} else {
						var now = new Date();
						var newValueDateTime = new Date(newValue);
						$scope.periods = $scope.setPeriods(new Date(newValue),$scope.periods);
						$scope.inFuture = now <= newValueDateTime;
						// console.log(now);
						// console.log(newValueDateTime);
						// console.log($scope.inFuture);	
						// debugger;
					}
				};	
			});
		},
		templateUrl: 'js/directives/templates/weatherSummary.html'
	}
}])