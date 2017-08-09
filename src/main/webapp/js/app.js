
 var app=angular.module('crudApp', ['ui.router','ngStorage']);

 app.constant('urls', {

    });

 app.config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('home',{
                url: '/',
                templateUrl: 'templates/index.html',
                controller: 'UserController',
                resolve: {
                    users: function ($q, UserService) {
                        console.log('Load all Users');
                        var deferred=$q.defer();
                        UserService.loadAllUsers().then(deferred.resolve, deferred.resolve);
                        return deferred.promise;
                    }
                }
            });
    }]);