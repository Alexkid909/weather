describe('Location service', function() {

    beforeEach(angular.mock.module('Weather'));

    var $locationService;
    var httpBackend;

    beforeEach(inject(function($httpBackend, _locationService_) {
        $locationService = _locationService_;
        httpBackend = $httpBackend;
    }));

    describe('Search method', function() {

        it('should return a promise', function() {
            var result = $locationService.search('London');

            var isPromise = false;

            angular.isObject(result)
            && result.then instanceof Function
            && result["catch"] instanceof Function
            && result["finally"] instanceof Function && (isPromise = true);

            expect(isPromise).toBe(true);

        });
    });

    describe('geoLookup method', function() {

        it('should return a promise', function() {
            var result = $locationService.geoLookup('London');

            var isPromise = false;

            angular.isObject(result)
            && result.then instanceof Function
            && result["catch"] instanceof Function
            && result["finally"] instanceof Function && (isPromise = true);

            expect(isPromise).toBe(true);

        });
    });

    describe('setCurrentLocation method', function() {

        it('should broadcast an event', function() {
            // @TODO test listen for a broadcast.
        });
    });
});

describe('Weather service', function() {

    beforeEach(angular.mock.module('Weather'));

    var $weather;
    var httpBackend;

    beforeEach(inject(function($httpBackend, _weather_) {
        $weather = _weather_;
        httpBackend = $httpBackend;
    }));

    describe('getHourly10Day method', function() {

        it('should return a promise', function() {
            var result = $weather.getHourly10Day();

            var isPromise = false;

            angular.isObject(result)
            && result.then instanceof Function
            && result["catch"] instanceof Function
            && result["finally"] instanceof Function && (isPromise = true);

            expect(isPromise).toBe(true);

        });
    });

    describe('getHourlyToday method', function() {

        it('should return a promise', function() {
            var result = $weather.getHourlyToday();

            var isPromise = false;

            angular.isObject(result)
            && result.then instanceof Function
            && result["catch"] instanceof Function
            && result["finally"] instanceof Function && (isPromise = true);

            expect(isPromise).toBe(true);

        });
    });

    describe('getForecast10Day method', function() {

        it('should return a promise', function() {
            var result = $weather.getForecast10Day();

            var isPromise = false;

            angular.isObject(result)
            && result.then instanceof Function
            && result["catch"] instanceof Function
            && result["finally"] instanceof Function && (isPromise = true);

            expect(isPromise).toBe(true);

        });
    });

    describe('getCurrentWeather method', function() {

        it('should return a promise', function() {
            var result = $weather.getCurrentWeather();

            var isPromise = false;

            angular.isObject(result)
            && result.then instanceof Function
            && result["catch"] instanceof Function
            && result["finally"] instanceof Function && (isPromise = true);

            expect(isPromise).toBe(true);

        });
    });
});