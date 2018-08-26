angular.module('Weather',['ngRoute', 'ngRaven', 'ngAnimate'])
.config(function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider
	.when('/weather_day/0' ,{
		redirectTo: '/'
	})
	.when('/weather_day/:day',{
		controller: 'DaySummaryController',
		templateUrl: 'app/js/views/day_summary.html'
	})
	.when('/',{
		controller: 'TodaySummaryController',
		templateUrl: 'app/js/views/today_summary.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});