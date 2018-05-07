(function () {
    'use strict';
    angular
        .module('yapp')
        .controller('EnvironmentController', EnvironmentController);

    EnvironmentController.$inject = ['$rootScope', '$state', '$scope', 'EnvironmentService'];

    function EnvironmentController($rootScope, $state ,$scope, EnvironmentService) {

        var ctrl = this;
        ctrl.selectedEnv = 'hod';

        var switchTab = function () {
            _.forEach(ctrl.listAllEnvironment, function(index) {
                if(index.environment === ctrl.selectedEnv){
                    ctrl.environmentDetails = index.environmentInfo;
                }
            });
            console.log(ctrl.environmentDetails);
        };


        var initData = function () {
            ctrl.selectedDb = [];
            ctrl.listAllEnvironment = [];
            ctrl.databasesList = [];

            EnvironmentService.ListDatabase().then(function (response) {
                if(response.status === 200){
                    ctrl.databasesList = response.data;
                }else {
                    window.alert(response.message);
                }
            });

            EnvironmentService.ListEnvironments().then(function (response) {
                if(response.status === 200){
                    ctrl.listAllEnvironment = response.data;

                    console.log(ctrl.listAllEnvironment);
                    switchTab();
                }else {
                    window.alert(response.message);
                }
            });

        };

        initData();

        ctrl.switchTab = function (tabName) {
            ctrl.selectedEnv = tabName;
            switchTab();
        }


    }
})();