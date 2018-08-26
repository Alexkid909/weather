describe('Location service', function() {

    beforeEach(angular.mock.module('Weather'));

    var $locationService;
    var httpBackend;

    beforeEach(inject(function($httpBackend, _locationService_) {
        $locationService = _locationService_;
        httpBackend = $httpBackend;
    }));

    // afterEach(function () {
    //     httpBackend.verifyNoOutstandingExpectation();
    //     httpBackend.verifyNoOutstandingRequest();
    // });

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
});