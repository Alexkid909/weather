class Location {
    constructor(name, address, latitude, longitude) {
        this.name = name;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}


angular.module('Weather').factory('locationService',[
    '$http',
    '$q',
    '$rootScope',
    'ipLocationService',
    function($http,$q, $rootScope, ipLocationService) {
        const corsProxyUrl = 'https://cors-anywhere.herokuapp.com';
        const baseUrl = 'https://api.locationiq.com/v1/autocomplete.php';
        const id = 'c9c95ec6';
        const key = '9cace23442d537';
        // const responseFormat = '.json';
        const getCall = function(url) {
            const options = {
                cache: true
            };
            return $http.get(url, options);
        };
        const service = {
            search: function(term) {
                let url = `${corsProxyUrl}/${baseUrl}?key=${key}&q=${term}`;
                return getCall(url).then((response) => {
                    const data = response.data.map((location) => {
                        const nameParts = location.display_name.split(',');
                        const name = nameParts.shift();
                        const address = nameParts.slice().join(',');
                        return new Location(name, address, location.lat, location.lon)
                    });
                    return { data };
                });
            },
            geoLookup: function () {
                return ipLocationService.lookup().then(success => {
                    const data = success.data;
                    const location = new Location(data.city, `${data.region_name}, ${data.zip}, ${data.country_name}`, data.latitude, data.longitude);
                    return location;
                });
            },
            getCurrentLocation: function() {
                let localStorageLocation = JSON.parse(localStorage.getItem('currentLocation'));
                const deferred = $q.defer();
                if (localStorageLocation) {
                    deferred.resolve(localStorageLocation);
                } else {
                    this.setCurrentLocation().then(() => {
                        localStorageLocation = JSON.parse(localStorage.getItem('currentLocation'));
                        deferred.resolve(localStorageLocation);
                    });
                }
                return deferred.promise;
            },
            setCurrentLocation: function(locationObj) {
                const deferred = $q.defer();
                if(!locationObj) {
                    this.geoLookup().then(success => {
                        if(success) {
                            localStorage.setItem('currentLocation', JSON.stringify(success));
                        } else {
                            const error = new Error('autoIp lookup failed');
                            console.log(error);
                            Raven.captureException(error);
                        }
                        $rootScope.$broadcast('event: locationChange');
                        deferred.resolve('location set');
                    });
                } else {
                    localStorage.setItem('currentLocation', JSON.stringify(locationObj));
                    $rootScope.$broadcast('event: locationChange');
                    deferred.resolve('location set');
                }
                return deferred.promise;
            }

        };
        return service;
    }
]);
