angular.module('Weather',['ngRoute'])
.config(function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider
	.when('/weather_day/0' ,{
		redirectTo: '/'
	})
	.when('/weather_day/:id',{
		controller: 'DaySummaryController',
		templateUrl: 'js/views/day_summary.html'
	})
	.when('/',{
		controller: 'TodaySummaryController',		
		templateUrl: 'js/views/today_summary.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});