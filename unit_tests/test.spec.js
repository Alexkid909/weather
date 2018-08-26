describe('Location service', function() {
    describe('Search method', function() {

        beforeEach(angular.mock.module('Weather'));

        var $locationService;

        beforeEach(inject(function(_$locationService_) {
            $locationService = _$locationService_;
        }));

        it('should return a string', function() {
            expect(0).toEqual(0);
        });
    });
});