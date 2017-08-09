
'use strict';

 angular.module('crudApp').factory('UserService',
    ['$localStorage', '$http', '$q', 'urls',
        function ($localStorage, $http, $q, urls) {

        var factory={
            getAllUsers: getAllUsers,
            getUser: getUser,
            createUser: createUser,
            editUser: editUser,
            removeUser: removeUser
        };
        return factory;

        function getAllUsers() {
            var deferred= $q.defer();
            $http.get('/api/users/list')
                .then(
                    function (response) {
                        console.log('Fetched successfully all Users');
                        deferred.resolve(response);
                    },
                    function (errResponse) {
                        console.error('Error while Loading Users');
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }
        
        function getUser(id) {
            console.log('Fetching User with id:' +id);
            var deferred= $q.defer();
            $http.get('/user/{id}' +id)
                .then(
                    function (response) {
                        console.log('Fetching Successful with id:' + name);
                        deferred.resolve(response.data);
                    },
                    function (errResponse) {
                        console.error('Error while loading User with name:' + name);
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function createUser(user) {
            console.log('Creating User');
            var deferred=$q.defer();
            $http.post('/api/user/add/', user)
                .then(
                    function (response) {
                        loadAllUsers();
                        deferred.resolve(response.data);
                    },
                    function (errResponse) {
                        if (errResponse)
                        console.error('Error while creating User' +errResponse.data.errMessage);
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function editUser(user, id) {
            console.log('Update User with id:' + id);
            var deferred=$q.defer();
            $http.put('api/user/edit/' +id, user)
                .then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function (errResponse) {
                        console.error('Error while Updating with id:' + id);
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }

        function removeUser(id) {
            console.log('Removing User with id:' +id);
            var deferred=$q.defer();
            $http.delete('/api/user/delete/'+ id)
                .then(
                    function (response) {
                        deferred.resolve(response.data);
                    },
                    function (errResponse) {
                        console.error('Error while deleting with id:' + id);
                        deferred.reject(errResponse);
                    }
                );
            return deferred.promise;
        }
        }
    ]);