(function () {
    'use strict';

    angular
        .module('yapp')
        .factory('EnvironmentService', EnvironmentService);

    EnvironmentService.$inject = ['$http', 'ConfigService'];

    function EnvironmentService($http, ConfigService) {
        var service = {};
        service.ListEnvironments = ListEnvironments;
        service.ListDatabase = ListDatabase;
        service.AlterDatabase = AlterDatabase;
        service.ListSystems = ListSystems;
        return service;

        function ListEnvironments()
        {
            return $http.get(ConfigService.BaseURI()+'/api/listEnvironments').then(handleSuccess, handleRemoteError);
        }
        function ListDatabase() {
            return $http.get(ConfigService.BaseURI()+'/api/listDatabases').then(handleSuccess, handleRemoteError);
        }
        function AlterDatabase(params) {
            return $http.post(ConfigService.BaseURI()+'/api/changeDB', params).then(handleSuccess, handleRemoteError);
        }
        function ListSystems() {
            return $http.get(ConfigService.BaseURI()+'/api/listSystems').then(handleSuccess, handleRemoteError);
        }
        // private functions
        function handleRemoteError(data) {
            return data.data;
        }

        function handleSuccess(data) {
            return data;
        }

    }
})();
