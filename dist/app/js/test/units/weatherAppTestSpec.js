describe('Weather app test suite.',function() {
	var $scope, $rootScope, $controller;
	
	beforeEach(module('Weather'));

	describe('Controller',function() {

		var deffered, $q;

		beforeEach(inject(function(_$rootScope_,_$q_) {
			$q = _$q_;
			$rootScope = _$rootScope_;
			$scope = _$rootScope_.$new();
			deferred = _$q_.defer();
		}));

		describe('Main', function() {
			beforeEach(inject(function($controller,weather) {
				spyOn(weather,'getWeather').and.returnValue(deferred.promise);
				$controller('MainController',{
					$scope: $scope,
					weather: weather
				});
			}));

			it('should resolve the promise from weather.getWeather()',function() {
				var response = {
						data: {
							forecast:"Looking great!",
							current: "Feelin fine!",
							location: "Right here!"
						}
					}
				deferred.resolve(response);

				$scope.$apply();

				expect($scope.forecastWeather).toBe("Looking great!");
				expect($scope.currentWeather).toBe("Feelin fine!");
				expect($scope.location).toBe("Right here!");				
				expect($scope.errors.length).toBe(0);
			});

			it('should reject the promise and catch the error',function() {
				deferred.reject({
					error: {
						message: "There has been an error",
						stack: "Here is the stack"
					}
				});

				$scope.$apply();

				expect($scope.forecastWeather).toBe(undefined);
				expect($scope.currentWeather).toBe(undefined);
				expect($scope.location).toBe(undefined);				
				expect($scope.errors.length).toBe(1);
			});
		});

		describe('TodaySummary', function() {
			beforeEach(inject(function($controller,weather) {
				spyOn(weather,'getWeather').and.returnValue(deferred.promise);
				$controller('TodaySummaryController',{
					$scope: $scope,
					weather: weather
				});
			}));

			it('should resolve the promise from weather.getWeather()',function() {
				var response = {
						data: {
							forecast:{
								forecastday:{0:"Looking great!"}
							},
							current: "Feelin fine!",
							location: "Right here!"
						}
					}
				deferred.resolve(response);

				$scope.$apply();

				expect($scope.forecastWeather).toBe("Looking great!");
				expect($scope.currentWeather).toBe("Feelin fine!");
				expect($scope.location).toBe("Right here!");				
				expect($scope.errors.length).toBe(0);
			});

			it('should reject the promise and catch the error',function() {
				deferred.reject({
					error: {
						message: "There has been an error",
						stack: "Here is the stack"
					}
				});

				$scope.$apply();

				expect($scope.forecastWeather).toBe(undefined);
				expect($scope.currentWeather).toBe(undefined);
				expect($scope.location).toBe(undefined);				
				expect($scope.errors.length).toBe(1);
			});
		});

		describe('DaySummary', function() {
			var $routeParams = {};
			$routeParams.id = 0;
			beforeEach(inject(function($controller,weather) {	
				spyOn(weather,'getWeather').and.returnValue(deferred.promise);
				$controller('DaySummaryController',{
					$scope: $scope,
					$routeParams: {id: 0},
					weather: weather
				});
			}));

			it('should resolve the promise from weather.getWeather()',function() {
				var response = {
						data: {
							forecast:{
								forecastday:{0:"Looking great!"}
							},
							current: "Feelin fine!",
							location: "Right here!"
						}
					}
				deferred.resolve(response);

				$scope.$apply();

				expect($scope.forecastWeather).toBe("Looking great!");
				expect($scope.currentWeather).toBe("Feelin fine!");
				expect($scope.location).toBe("Right here!");				
				expect($scope.errors.length).toBe(0);
			});

			it('should reject the promise and catch the error',function() {
				deferred.reject({
					error: {
						message: "There has been an error",
						stack: "Here is the stack"
					}
				});

				$scope.$apply();

				expect($scope.forecastWeather).toBe(undefined);
				expect($scope.currentWeather).toBe(undefined);
				expect($scope.location).toBe(undefined);				
				expect($scope.errors.length).toBe(1);
			});
		});					
	});

	describe('Directive',function() {

		describe('weatherSummary controller',function() {

			beforeEach(module('partials'));
	
			var template, isolateScope, $httpBackend, element;

			beforeEach(inject(function($compile,_$rootScope_,_$httpBackend_) {
				

				$rootScope = _$rootScope_;
				$scope = $rootScope.$new();
				$httpBackend = _$httpBackend_;
				element = angular.element('<weather-summary class="daily-summary" periods="[\'dayName\',\'dayWithSuffix\']" condition="condition" date="date" temp-current="tempCurrent" wind-speed="windSpeed" wind-direction="windDirection" icon-path="iconPath" temp-high="tempHigh" temp-low="tempLow" wind-degree="windDegree"></weather-summary>');


				$scope.periods = ['time'];
				$scope.condition = 'Sunny';
				$scope.tempCurrent = 20;
				$scope.tempHigh = 25;
				$scope.tempLow = 15;
				$scope.windSpeed = 15;
				$scope.windDirection = 'N';
				$scope.windDegree = 180;
				$scope.date = new Date();
				$scope.iconPath = "//cdn.apixu.com/weather/64x64/night/113.png";

				template = $compile(element)($scope)
				$rootScope.$digest();


				isolateScope = element.isolateScope();
				ctrl = element.controller();

			}));

		    afterEach(function() {
		      $httpBackend.verifyNoOutstandingExpectation();
		      $httpBackend.verifyNoOutstandingRequest();
		    });			

			it('should set $scope.periods apropriately',function() {				
				var templateAsHtml = template.html();

				$scope.periods = ['dayName','dayWithSuffix'];

				expect($scope.periods.length).toBe(2);
				expect($scope.periods[0]).toBe('dayName');
				expect($scope.periods[1]).toBe('dayWithSuffix');
				expect(typeof($scope.periods)).toBe('object');				

				$scope.periods = isolateScope.setPeriods($scope.date,$scope.periods);

				expect($scope.periods.length).toBe(2);
				expect(typeof($scope.periods[0])).toBe('object');
				expect(typeof($scope.periods[1])).toBe('object');
				expect(typeof($scope.periods)).toBe('object');
				expect($scope.periods[0].periodName).toBe('dayName');	
				expect($scope.periods[1].periodName).toBe('dayWithSuffix');
			});

			it('should generate the correct html',function() {
				var tags = {
					periodTitle: '<span ng-repeat=\"period in periods\" class=\"now\">Now </span>',
					conditionImg: '<img class=\"conditionImg\" ng-src=\"http://cdn.apixu.com/weather/64x64/night/113.png\" src=\"http://cdn.apixu.com/weather/64x64/night/113.png\">', 
					condition: '<div class=\"condition ng-binding\">Sunny</div>',
					tempCurrent: '<span ng-show=\"tempCurrent\" class=\"current-temp ng-binding\">20<span class=\"degree-c-symbol\">°c</span>',
					tempHigh: `<span class=\"glyphicon glyphicon-menu-up"></span><span class=\"high-temp ng-binding">25<span class=\"degree-c-symbol">°c</span></span>`,
					tempLow: '<span class=\"low-temp ng-binding">15<span class=\"degree-c-symbol\">°c</span></span><span class=\"glyphicon glyphicon-menu-down"></span>',
					windSpeed: '<span ng-show=\"windSpeed\" class=\"wind-speed ng-binding">15<span class=\"wind-mph">mph</span></span>',
					windSpeedMax: '<span ng-show=\"windSpeedMax\" class=\"wind-speed-max ng-binding ng-hide"><span class=\"wind-mph">mph</span></span>',
					windSpeedMin: '<span ng-show=\"windSpeedMin\" class=\"wind-speed-min ng-binding ng-hide"><span class=\"wind-mph">mph</span></span>',
					windDirection: '<span class=\"wind-direction ng-binding">N</span>',
					windDegree: '<img ng-show=\"windDegree\" ng-src=\"images/icons/up-arrow.png\" class=\"wind-direction-arrow\"',
					windDegree2: 'style=\"transform: rotate',//(180deg)\"',
					windDegree3: 'src=\"images/icons/up-arrow.png\">'
				}



				var templateAsHtml = template.html().replace(/\t+/g, "").replace(/\r?\n|\r/g,"");
				for (key in tags) {
					if (templateAsHtml.search(tags[key]) < 0) {
						console.log(templateAsHtml);
						console.log(key,templateAsHtml.search(tags[key]));
						console.log(tags[key]);
						debugger;
					}
					expect(templateAsHtml).toContain(tags[key]);
				};
			});
		});

	});

});