angular.module('Weather').factory('weather',[
	'$http',
	'$q',
	function WeatherFactory($http,$q) {
		var baseUrl = 'http://api.wunderground.com/api';
		var key = '86f57048d0dd410f';
		var state = 'CA';
		var location = "San_Francisco";
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
                const url = [baseUrl, key, resource, 'q', state, location].join('/') + responseFormat;
				// console.log(url);
				return getCall(url);
			},
            getHourlyToday: function() {
                const resource = 'hourly';
                const url = [baseUrl, key, resource, 'q', state, location].join('/') + responseFormat;
                // console.log(url);
                return getCall(url);
            },
			getForecast10Day: function() {
                const resource = 'forecast10day';
                const url = [baseUrl, key, resource, 'q', state, location].join('/') + responseFormat;
                // console.log(url);
                return getCall(url);
			},
			getCurrentWeather: function() {
                const resource = 'conditions';
                const url = [baseUrl, key, resource, 'q', state, location].join('/') + responseFormat;
                // console.log(url);
                return getCall(url);
			},
			setLocation: function(newLocation) {
				location = newLocation;
			}
		};
		return service;
	}
]);
