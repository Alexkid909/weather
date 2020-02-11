angular.module('Weather')
.controller('DaySummaryController',[
		'weather',
		'locationService',
		'$scope',
		'$routeParams',
		function(weather, locationService, $scope,$routeParams) {
            $scope.$emit('dayForecastLoading', {status: true});
            $scope.$emit('hourForecastLoading', {status: true});
			$scope.errors = [];
			$scope.dayForecast = {hours: {}};

            $scope.appendDaySuffix = function(dayNumber) {
                if (dayNumber) {
                    const suffixes = ['st','nd','rd','th'];
                    const suffix = dayNumber > 3 ? suffixes[3] : suffixes[dayNumber - 1];
                    return dayNumber + suffix;
                }
            };

			function getDailyForecast(day) {
                $scope.$emit('dayForecastLoading', {status: true});
                weather.getDailyForecast(day).then(data => {
                    const dayNumber = data.friendlyDate.getDate();
                    const periods = [
                        {   name: 'dayName',
                            value: moment(data.friendlyDate).format('ddd')
                        },
                        {
                            name: 'dayWithSuffix',
                            value: $scope.appendDaySuffix(dayNumber)
                        }
                    ];
                    $scope.dayForecast = Object.assign({}, data, { periods });
                    getHourlyForecastForDay($scope.day);
                    $scope.$emit('dayForecastLoading', {status:false});
                },error => {
                    $scope.$broadcast('event: error', error);
                });
            }

			function getHourlyForecastForDay(day) {
                $scope.$emit('hourForecastLoading', {status: true});
                weather.getHourlyForecast(day).then(data => {
                    $scope.dayForecast.hours = data.map((hour) => {
                        const hourNum = hour.friendlyDate.getHours();
                        const periods = [{
                            name: 'hour',
                            value: `${hourNum}${hourNum > 11 ? 'pm' : 'am'}`
                        }];
                        return Object.assign({}, hour, { periods });
                    });
                    $scope.$emit('hourForecastLoading', {status: false});
                },error => {
                    $scope.$broadcast('event: error', error);
                })
            }

            $scope.day = parseInt($routeParams.day, 10);

            getDailyForecast($scope.day);

            $scope.$on('event: locationChange', function() {
                getDailyForecast($routeParams.day);
            });

		}
]);