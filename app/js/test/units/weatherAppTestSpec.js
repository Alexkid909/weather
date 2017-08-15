describe('Weather app test suite',function() {
	var scope, rootScope, controller;

	beforeEach(module('Weather'));

	describe('Main controller', function() {

		beforeEach(inject(function($controller,$rootScope,forecastWeather) {
			rootScope = $rootScope;
			scope = rootScope.$new();
			controller = $controller('MainController',{$scope:scope});
		}));

		it('should initialize the forecastWeather object',function() {
			expect(scope.forecastWeather).toBeDefined();
		});

		it('should initialize the mainSummaryDay and set to 0',function() {
			expect(scope.mainSummaryDay).toBe(0);
		});

		describe('getForecastWeather',function() {
			// it('should set $scope.forecastWeather to the result of the forecastWeather service',function() {
			// 	scope.$watch(function() {
			// 		return forecastWeather.data
			// 	}, function() {
			// 		forecastWeatherData = forecastWeather.data;
					expect(scope.getForecastWeather).toBe(forecastWeather.data);
				// })
			});
		});




	});

});