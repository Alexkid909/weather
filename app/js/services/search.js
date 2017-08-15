angular.module('Weather').factory('searchFactory',[
		'$http',
		function($http) {
			var search = {};
			$http.get('http://api.apixu.com/v1/search.json?key=c2a07e37c34b4e659f065213171406&q=Kingston Park, UK'
			)
			.then(function(success) {
				search.data = success.data
			})
			.then(function(error) {
				search.err = error;			
			});
			return search;
		}
	]);
