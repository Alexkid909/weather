angular.module('Weather').controller('MainController',[
		'weather',
		'$scope',
		'locationService',
		function(weather,$scope, locationService) {
			$scope.errors = [];
			$scope.currentLocation = null;
			$scope.weatherLocation;
			$scope.forecastWeather;
			$scope.loading = true;
			$scope.daysForecastLoading = false;
            $scope.dayForecastLoading = false;
            $scope.hourForecastLoading = false;
            $scope.$watchGroup(['daysForecastLoading', 'hourForecastLoading', 'dayForecastLoading'],(newValues) => {
            	$scope.loading = newValues.some(value => value);
            });

            $scope.$watch('currentLocation', (newValue) => {
                console.log('currentLocation', newValue);
            });

            $scope.$on('dayForecastLoading', (event, args) => {
                $scope.dayForecastLoading = args.status;
			});
            $scope.$on('hourForecastLoading', (event, args) => {
                $scope.hourForecastLoading = args.status;
			});

            $scope.$on('event: locationUnknown', () => {
                $scope.loading = false;
            });

            $scope.appendDaySuffix = dayNumber => {
                const suffixes = ['st','nd','rd','th'];
                const suffix = dayNumber > 3 ? suffixes[3] : suffixes[dayNumber - 1];
                return dayNumber + suffix
            };
            function getCurrentLocation() {
                locationService.getCurrentLocation().then(data => {
                    const locationData = data;
                    $scope.currentLocation = `${locationData.city}, ${locationData.country_code === 'US' ? `${locationData.region_code} ` : `${locationData.country_code}`} `;
                },error => {
                    Raven.captureException(error);
                    $scope.$broadcast('event: error', error);
                });
            }
			function getDailyWeather() {
            	weather.getDailySevenDayForecasts().then(dailyForecasts => {
                    $scope.forecastWeather = dailyForecasts.map((day) => {
                        const dayNum = day.friendlyDate.getDate();
                        day.periods = [{
                            name: 'day',
                            value: $scope.appendDaySuffix(dayNum)
                        }];
                        return day;
                    });
                },error => {
                    $scope.errors = [];
					$scope.errors.push(error);
                    $scope.$broadcast('event: error', error);
                });
			}
            getDailyWeather();
			getCurrentLocation();
			$scope.$on('event: locationChange', () => {
                getDailyWeather();
				getCurrentLocation();
                $scope.loading = false;
            });
		}
	]);

