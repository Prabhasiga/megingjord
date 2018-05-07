(function () {
    'use strict';
    angular
        .module('yapp')
        .controller('DBChangeController', DBChangeController);

    DBChangeController.$inject = ['$rootScope', '$state', '$scope', 'EnvironmentService'];

    function DBChangeController($rootScope, $state ,$scope, EnvironmentService) {

        var ctrl = this;
        ctrl.systemUiSelected = 'hod';
        ctrl.selectedSystem = [];
        ctrl.dbShowList = [];
        ctrl.toaster = {};
        ctrl.toaster = {};
        ctrl.dbSelectedList = [];
        ctrl.dbListSystemMap = {};

        /*function popup() {
            ctrl.toaster.timeout = 3000;
            toaster.pop(ctrl.toaster.type, ctrl.toaster.title, ctrl.toaster.text, ctrl.toaster.timeout);
        }*/

        var processDbShowList = function () {

            var index = 0;

            _.forEach(ctrl.selectedSystem, function (each) {


               ctrl.dbShowList[index] = ctrl.dbListSystemMap[each.name];

               index ++;

            });

        };

        var processDBSystemList = function () {

            var index = 0;

            var matchedSystem = null;

            _.forEach(ctrl.listSystems, function (each) {

                if(each.name === ctrl.systemUiSelected){
                    matchedSystem = each;
               }

            });

            _.forEach(ctrl.environmentDetails, function (each) {

                 ctrl.selectedSystem[index] = matchedSystem;

                index ++;
            });

            processDbShowList();
        };

        var switchTab = function () {

            _.forEach(ctrl.listAllEnvironment, function(index) {
                if(index.environment === ctrl.systemUiSelected){
                    ctrl.environmentDetails = index.environmentInfo;
                }
            });

            processDBSystemList();
        };

        var createDbMap = function () {

            _.forEach(ctrl.databasesList , function (each) {
                ctrl.dbListSystemMap[each.environment] = each.availableDatabases;
            });

        };

        var initData = function () {
            ctrl.selectedDb = [];
            ctrl.listAllEnvironment = [];
            ctrl.listSystems = [];
            ctrl.databasesList = [];

            EnvironmentService.ListDatabase().then(function (response) {
                if(response.status === 200){
                    ctrl.databasesList = response.data;
                    createDbMap();
                }else {
                    //
                }
            });

            EnvironmentService.ListSystems().then(function (response) {
                if(response.status === 200){
                    ctrl.listSystems = response.data;

                }else {
                    //
                }
            });


            EnvironmentService.ListEnvironments().then(function (response) {
                if(response.status === 200){
                    ctrl.listAllEnvironment = response.data;
                    switchTab();
                }else {
                    //
                }
            });

        };

        initData();

        ctrl.switchTab = function (tabName) {
            ctrl.systemUiSelected = tabName;
            switchTab();
        };

        ctrl.changeDB = function (index) {
            var selectedSystem = ctrl.selectedSystem[index].name;
            ctrl.dbShowList[index] = ctrl.dbListSystemMap[selectedSystem];
        };

        ctrl.applyChanges = function (index, selectedEnvironment) {

            if(ctrl.systemUiSelected === "logan"){
                window.alert("For Logan, Currently cannot change db Config");
                return;
            }

            var selectedSystem = ctrl.selectedSystem[index].name;
            var selectedDb = ctrl.dbSelectedList[index];

            if(selectedDb === null || selectedDb === undefined || selectedDb === ""){
                window.alert("Select Database");
                return;
            }

            var postObj = {};
            postObj.applicationName = "Asgard";
            postObj.environment = selectedEnvironment.environment;
            postObj.systemName = ctrl.systemUiSelected;

            var database = {};
            database.systemName = selectedSystem;
            database.name = selectedDb;

            postObj.database = database;
            console.log(postObj);

            if(selectedEnvironment.database === "asgard"){
                window.alert("Access Restricted to Change From Prod Db");
                return;
            }

            if(selectedDb === "asgard"){
                window.alert("Need Super User Access to assign Prod Db");
                return;
            }

            EnvironmentService.AlterDatabase(postObj).then(function (response) {
                if(response.status === 200){
                    ctrl.databasesList = response.data;
                    initData();
                }else {
                    window.alert(response.message);
                }
            });

        };

        ctrl.rejectChanges = function (index) {
            initData();
        }


    }
})();