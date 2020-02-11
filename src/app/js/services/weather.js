angular.module('Weather').factory('weather',[
	'$http',
	'$q',
	'locationService',
	function WeatherFactory($http,$q, locationService) {
        const corsProxyUrl = 'https://cors-anywhere.herokuapp.com';
        var baseUrl = `${corsProxyUrl}/https://api.darksky.net`;
		const resource = 'forecast';
		var key = '56d450beaee753c38ea506a0bcaa647e';
		var getCall = function(url) {
            var deferred = $q.defer();
            const options = {
                cache: true,
                params: { units: 'uk2' }
            };
            $http.get(url, options)
                .then(function(success) {
                    deferred.resolve(success);
                },function(error) {
                    deferred.reject(error);
                });
            return deferred.promise
		};
		var getFriendlyDate = function(epocDate, localeOptions) {
            return new Date(new Date(epocDate * 1000).toLocaleString('en', localeOptions));
        };
		var service = {
            getWeather: function() {
                return locationService.getCurrentLocation().then(locationData => {
                    const url = `${[baseUrl, resource, key].join('/')}/${locationData.latitude},${locationData.longitude}?extend=hourly`;
                    return getCall(url).then((response) => {
                        this.localeOptions = { timeZone: response.data.timezone };
                        return response;
                    });
                }, error => {
                    throw error;
                });
			},
			getCurrentWeather: function() {
                return this.getWeather().then((response) => {
                    return response.data.currently;
                }, error => {
                    throw error;
                });
            },
            getDailySevenDayForecasts() {
                return this.getWeather().then((response) => {
                  return response.data.daily.data.map(dailyData => {
                      const friendlyDate = getFriendlyDate(dailyData.time, this.localeOptions);
                      return Object.assign({}, dailyData, { friendlyDate });
                  });
                }, error => {
                    throw error;
                })
            },
			getDailyForecast(dayOffset = 0) {
                return this.getDailySevenDayForecasts().then((response) => {
                    const dayForecast = response[dayOffset];
                    const friendlyDate = getFriendlyDate(dayForecast.time, this.localeOptions);
                    return Object.assign({}, dayForecast, { friendlyDate });
                }, error => {
                    throw error;
                });
            },
            getHourlyForecast(dayOffset = 0) {
                return this.getWeather().then((response) => {
                    const hourlyForecasts = response.data.hourly.data;
                    const currentDate = new Date(response.data.currently.time * 1000);
                    const localDate = new Date(currentDate.toLocaleString('en', this.localeOptions));
                    const MDay = moment(localDate).add(dayOffset, 'days').date();
                    const currentHour = dayOffset <= 0 ? localDate.getHours() : 0;

                    return hourlyForecasts.filter(hour => {
                        const hourDate = new Date(hour.time * 1000);
                        const hourLocalDate = new Date(hourDate.toLocaleString('en', this.localeOptions));
                        const forecastHourMDay = hourLocalDate.getDate();
                        const forecastHour = hourLocalDate.getHours();
                        return forecastHourMDay == MDay && forecastHour >= currentHour;
                    }).map((hour) => {
                        const friendlyDate = getFriendlyDate(hour.time, this.localeOptions);
                        return Object.assign({}, hour, { friendlyDate });
                    })
                }, error => {
                    throw error;
                }).catch((error) => {
                    console.log(error);
                });
            }
		};
		return service;
	}
]);
