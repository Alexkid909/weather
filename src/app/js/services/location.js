angular.module('Weather').factory('locationService',[
    '$http', '$q',
    function($http,$q) {
        var baseUrl = 'http://api.wunderground.com/api';
        var key = '86f57048d0dd410f';
        var state = 'CA';
        var location = "San_Francisco";
        var responseFormat = '.json';
        var getCall = function(url) {
            var deferred = $q.defer();
            $http.get(url, {
                cache: true
            }).then(function(success) {
                    deferred.resolve(success);
                },function(error) {
                    deferred.reject(error);
                });
            return deferred.promise
        };
        var service = {
            geoLookup: function () {
                const resource = 'geolookup';
                const url = [baseUrl, key, resource, 'q', state, location].join('/') + responseFormat;
                return getCall(url);
            },
        };
        return service;
    }
]);
