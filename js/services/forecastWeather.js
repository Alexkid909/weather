angular.module('Weather').factory('forecastWeatherFactory',[
		'$http',
		function($http) {
			var forecastWeather = {};
			var days = 10;
			var location = "Kingston Park,UK";
			$http.get('http://api.apixu.com/v1/forecast.json?key=c2a07e37c34b4e659f065213171406&q='+location+'&days='+days
			)
			.then(function(success) {
				forecastWeather.data = success.data
			})
			.then(function(error) {
				forecastWeather.err = error;			
			});
			return forecastWeather;
		}
	]);
