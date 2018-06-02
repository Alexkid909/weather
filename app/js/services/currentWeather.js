angular.module('Weather').factory('currentWeatherFactory',[
		'$http',
		function($http) {
			var currentWeather = {};
			var url = 'http://api.apixu.com/v1/current.json?key=c2a07e37c34b4e659f065213171406&q=London';
			$http.get(url)
			.then(function(success) {
				currentWeather.data = success.data
			})
			.then(function(error) {
				currentWeather.err = error;			
			});
			return currentWeather;
		}
	]);
