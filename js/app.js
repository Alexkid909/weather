angular.module('Weather',['ngRoute'])
.config(function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider
	.when('/weather_day/:id',{
		templateUrl: 'js/views/day_summary.html'
	})
	.when('/',{
		templateUrl: 'js/views/today_summary.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});