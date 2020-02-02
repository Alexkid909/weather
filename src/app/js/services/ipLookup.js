angular.module('Weather').factory('ipLocationService',[
    '$http',
    '$q',
    '$rootScope',
    function($http,$q) {
        const corsProxyUrl = 'http://cors-anywhere.herokuapp.com';
        const key = 'c2b1840eea9837cd94f77ae4bd91d57c';
        const api = 'http://api.ipstack.com/check';
        const getCall = function(url) {
            const deferred = $q.defer();
            $http.get(url, {
                cache: true
            }).then(function(success) {
                deferred.resolve(success);
            },function(error) {
                deferred.reject(error);
            });
            return deferred.promise
        };
        const service = {
            lookup: function() {
                const queryString = `?access_key=${key}&language=en&output=json`;
                const url = `${corsProxyUrl}/${api}${queryString}`;
                return getCall(url);
            }
        };
        return service;
    }]);