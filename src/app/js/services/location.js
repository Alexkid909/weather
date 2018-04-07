angular.module('Weather').factory('locationService',[
    '$http',
    '$q',
    '$rootScope',
    function($http,$q, $rootScope) {
        var corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
        var baseUrl = 'http://api.wunderground.com/api';
        var key = '86f57048d0dd410f';
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
            search: function(term) {
                let baseUrl = 'http://autocomplete.wunderground.com/aq?query=';
                let url = `${corsProxyUrl}${baseUrl}${term}`;
                return getCall(url);
            },
            geoLookup: function (locationQueryString) {
                const resource = 'geolookup';
                let urlArray = [baseUrl, key, resource];
                if (!locationQueryString) {
                    urlArray.push('q/autoip');
                } else {
                    urlArray.push(locationQueryString);
                }
                const url = `${urlArray.join('/')}${responseFormat}`;
                return getCall(url);
            },
            getCurrentLocation: function() {
                var localStorageLocation = JSON.parse(localStorage.getItem('currentLocation'));
                var deferred = $q.defer();
                if (localStorageLocation) {
                    deferred.resolve(localStorageLocation);
                } else {
                    this.setCurrentLocation();
                    deferred.resolve(this.geoLookup().then(success => success.data.location));
                }
                return deferred.promise;
            },
            setCurrentLocation: function(locationObj) {
                if(!locationObj) {
                    this.geoLookup().then(success => {
                        if(success.data.hasOwnProperty('location')) {
                            localStorage.setItem('currentLocation', JSON.stringify(success.data.location));
                            console.log(localStorage.getItem('currentLocation'));
                        } else {
                            console.log('autoIp failed');
                        };
                        $rootScope.$broadcast('event: locationChange')
                    });
                } else {
                    localStorage.setItem('currentLocation', JSON.stringify(locationObj));
                    $rootScope.$broadcast('event: locationChange');
                }
            }

        };
        return service;
    }
]);
