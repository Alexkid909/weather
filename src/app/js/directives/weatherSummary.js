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
			iconPath: '=',
			icon: '=',
            isNighttime: '='
		},
		controller: function(locationService, $scope) {
			$scope.location = {};

            $scope.$watch('icon', function() {
                $scope.iconClass = getIconClass();
            });

            function getIconClass() {
                switch ($scope.icon) {
                    case 'clear-night':
                        return 'wi-night-clear';
                    case 'cloudy':
                        return 'wi-night-alt-cloudy';
                    case 'partly-cloudy-night':
                        return 'wi-night-alt-partly-cloudy';
                    case 'sleet':
                        return 'wi-night-alt-sleet';
                    case 'rain':
                        return 'wi-night-alt-rain';
                    case 'snow':
                        return 'wi-night-alt-snow';
                    case 'thunderstorm':
                        return 'wi-night-alt-thunderstorm';
                    case 'clear-day':
                        return 'wi-day-sunny';
                    case 'cloudy':
                        return 'wi-cloudy';
                    case 'fog':
                        return 'wi-fog';
                    case 'partly-cloudy-day':
                        return 'wi-day-sunny-overcast';
                    case 'sleet':
                        return 'wi-day-sleet';
                    case 'rain':
                        return 'wi-day-rain';
                    case 'snow':
                        return 'wi-day-snow';
                    case 'thunderstorm':
                        return 'wi-day-thunderstorm';
                    case 'wind':
                        return 'wi-windy';
                    default:
                        console.log('no icon match', $scope.icon);
                        return 'none';
                }
			}
		},
		templateUrl: 'app/js/directives/templates/weatherSummary.html'
	}
}]);