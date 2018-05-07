(function(){
    'use strict';

    /**
     * @ngdoc overview
     * @name yapp
     * @description
     * # yapp
     *
     * Main module of the application.
     */
    angular
        .module('yapp', [
            'ui.router'
        ])
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.when('/dashboard', '/dashboard/environment');
            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('base', {
                    abstract: true,
                    url: '',
                    templateUrl: 'views/base.html'
                })
                .state('login', {
                    url: '/login',
                    parent: 'base',
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl'
                })
                .state('dashboard', {
                    url: '/dashboard',
                    parent: 'base',
                    templateUrl: 'views/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                .state('environment', {
                    url: '/environment',
                    parent: 'dashboard',
                    templateUrl: 'views/dashboard/environment.html',
                    controller: 'EnvironmentController'
                })
                .state('dbchange', {
                    url: '/dbchange',
                    parent: 'dashboard',
                    templateUrl: 'views/dashboard/dbchange.html',
                    controller: 'DBChangeController'
                })
        });


})();
