(function () {
    'use strict';

    angular
        .module('yapp')
        .factory('ConfigService', ConfigService);


    ConfigService.$inject = ['$http', '$rootScope'];

    function ConfigService($http, $rootScope) {

        var service = {};
        service.BaseURI = BaseURI;
        return service;

        function BaseURI() {
            return 'http://'+MegingJordApp.Common.serverIP+':'+MegingJordApp.Common.serverPort;
        }

        function handleRemoteError(data) {
            return data.data;
        }

        function handleSuccess(data) {
            return data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
})();
