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
			icon: '='
		},
		controller: function(locationService, $scope,$filter,$element) {
			$scope.location = {};

			$scope.$watch('icon', function(newValue) {
				$scope.iconClass = getIconClass();
			});

            function isNighttime() {
                const daynightPrefixArray = $scope.iconPath.split("/");
                const dayNightPrefx = daynightPrefixArray[daynightPrefixArray.length-1]
                return (dayNightPrefx.slice(0,2) === 'nt');
            }

            // if ($scope.class === 'forecast-summary') {
            //     $scope.$watch('periods', function(newValue) {
            //         console.log(newValue);
            //     })
            // }

			function getIconClass() {
                switch ($scope.icon) {
                    case 'chanceflurries':
                        return isNighttime() ? 'wi-night-alt-snow' : 'wi-day-snow';
                    case 'chancerain':
                        return isNighttime() ? 'wi-night-alt-rain' : 'wi-day-rain';
                    case 'chancesleet':
                        return isNighttime() ? 'wi-night-alt-sleet' : 'wi-day-sleet';
                    case 'chancesnow':
                        return isNighttime() ? 'wi-night-alt-snow' : 'wi-day-snow';
                    case 'chancetstorms':
                        return isNighttime() ? 'wi-night-alt-thunderstorm' : 'wi-day-thunderstorm';
                    case 'clear':
                        return isNighttime() ? 'wi-night-clear' : 'wi-day-sunny';
                    case 'cloudy':
                        return isNighttime() ? 'wi-night-alt-cloudy' : 'wi-cloudy';
                    case 'flurries':
                        return isNighttime() ? 'wi-night-alt-snow' : 'wi-snow';
                    case 'fog':
                        return isNighttime() ? 'wi-night-alt-fog' : 'wi-fog';
                    case 'hazy':
                        return 'wi-day-haze';
                    case 'mostlycloudy':
                        return isNighttime() ? 'wi-night-alt-cloudy' : 'wi-day-cloudy';
                    case 'mostlysunny':
                        return isNighttime() ? 'wi-night-clear' : 'wi-day-sunny';
                    case 'partlycloudy':
                        return isNighttime() ? 'wi-night-alt-partly-cloudy' : 'wi-day-sunny-overcast';
                    case 'partlysunny':
                        return isNighttime() ? 'wi-night-alt-partly-cloudy' : 'wi-day-sunny-overcast';
                    case 'sleet':
                        return isNighttime() ? 'wi-night-alt-sleet' : 'wi-day-sleet';
                    case 'rain':
                        return isNighttime() ? 'wi-night-alt-rain' : 'wi-day-rain';
                    case 'snow':
                        return isNighttime() ? 'wi-night-alt-snow' : 'wi-day-snow';
                    case 'sunny':
                        return isNighttime() ? 'wi-night-clear' : 'wi-day-sunny';
                    case 'tstorms':
                        return isNighttime() ? 'wi-night-alt-thunderstorm' : 'wi-day-thunderstorm';
                    case 'cloudy':
                        return isNighttime() ? 'wi-night-alt-cloudy' : 'wi-day-cloud';
                    case 'partlycloudy':
                        return isNighttime() ? 'wi-night-alt-partly-cloudy' : 'wi-day-partly-cloudy';
                }
			}
		},
		templateUrl: 'app/js/directives/templates/weatherSummary.html'
	}
}]);