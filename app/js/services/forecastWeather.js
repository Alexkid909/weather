angular.module('Weather').factory('forecastWeather',[
		'$http',
		function($http) {
			var days = 10;
			var location = "London";
			var response = {};
			var promise = $http.get('http://api.apixu.com/v1/forecast.json?key=c2a07e37c34b4e659f065213171406&q='+location+'&days='+days)
			.then(function(success) {
				response = success;
				return response;
			},function(error) {
				response = error;			
				return response;
			});
			return promise;
		}
	]);
