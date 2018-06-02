angular.module('Weather').factory('weather',[
	'$http',
	'$q',
	'locationService',
	function WeatherFactory($http,$q, locationService) {
		var baseUrl = 'http://api.wunderground.com/api';
		var key = '86f57048d0dd410f';
		// var currentLocation = locationService.getCurrentLocation();
		var responseFormat = '.json';
		var getCall = function(url) {
            var deferred = $q.defer();
            $http.get(url)
                .then(function(success) {
                    deferred.resolve(success);
                },function(error) {
                    deferred.reject(error);
                });
            return deferred.promise
		};
		var service = {
			getHourly10Day: function() {
                const resource = 'hourly10day';
                return locationService.getCurrentLocation().then(success => {
                    const locationQueryString = success.l;
                    const url = `${[baseUrl, key, resource].join('/')}${locationQueryString}${responseFormat}`;
                    return getCall(url);
                });
			},
            getHourlyToday: function() {
                const resource = 'hourly';
                return locationService.getCurrentLocation().then(success => {
                    const locationQueryString = success.l;
                    const url = `${[baseUrl, key, resource].join('/')}${locationQueryString}${responseFormat}`;
                    return getCall(url);
                });
            },
			getForecast10Day: function() {
                const resource = 'forecast10day';
                return locationService.getCurrentLocation().then(success => {
                    const locationQueryString = success.l;
                    const url = `${[baseUrl, key, resource].join('/')}${locationQueryString}${responseFormat}`;
                    return getCall(url);
                });
			},
			getCurrentWeather: function() {
                const resource = 'conditions';
                return locationService.getCurrentLocation().then(success => {
                    const locationQueryString = success.l;
                    const url = `${[baseUrl, key, resource].join('/')}${locationQueryString}${responseFormat}`;
                    return getCall(url);
                });
			}
		};
		return service;
	}
]);
