angular.module('Weather').factory('googleLocationService', [
    '$http',
    '$q',
    '$rootScope',
    function($http,$q, $rootScope) {
        var corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'
        var baseUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?';
        var key = 'AIzaSyCc_lVayzljxkaCE0rjahjrqSbAwOwGUpA';
        var getCall = function(url, term) {
            var deferred = $q.defer();
            $http.get(`${corsProxyUrl}${url}`, {
                cache: true,
                params: {
                    key: key,
                    input: term
                }
            }).then(function(success) {
                deferred.resolve(success);
            },function(error) {
                deferred.reject(error);
            });
            return deferred.promise
        };
        var service = {
            search : function(term) {
                let url = baseUrl
                return getCall(url, term);
            }
        };
        return service;
    }
]);