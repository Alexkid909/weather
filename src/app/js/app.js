angular.module('Weather',['ngRoute', 'ngRaven'])
.config(function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider
	.when('/weather_day/0' ,{
		redirectTo: '/'
	})
	.when('/weather_day/:id',{
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