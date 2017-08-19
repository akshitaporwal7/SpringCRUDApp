
'use strict';

app.controller('UserController',['$scope', 'UserService', function ($scope, UserService) {

        $scope.createOrUpdateUser = function() {
            console.log('Create User');
            UserService.createUser($scope.user)
                .then(
                    function (response) {
                        console.log('User Created Successfully');
                        $scope.successMessage= 'Successfully created';
                        $scope.errorMessage= '';
                        $scope.done= true;
                        $scope.user= {};
                        $scope.myForm.$setPristine();
                    },
                    function (errResponse) {
                        console.error('Error while creating User');
                        $scope.errorMessage= 'Error while creating User:' +errResponse.data.errorMessage;
                        $scope.successMessage= '';
                    }
                );
        };

        $scope.removeUser = function(id) {
            console.log('Removing User with id:' + id);
            UserService.removeUser(id)
                .then(
                    function () {
                        console.log('User with' + id + 'Removed Successfully');
                    },
                    function (errResponse) {
                        console.error('Error while creating User with' + id +', Error:' +errResponse.data);
                    }
                );
        };
        
        $scope.getAllUsers = function() {
            return UserService.getAllUsers().then(function (response) {
                $scope.users = response.data;
            });
        };

        $scope.editUser = function(id, user) {
            $scope.user = user;
            $scope.successMessage= '';
            $scope.errorMessage= '';
            UserService.editUser($scope.user, id).then(
                function (user) {
                    $scope.user= user;
                },
                function (errResponse) {
                    console.error('Error while removing User' + id +', Error:' +errResponse.data);
                }
            );
        };

        $scope.reset = function() {
            $scope.successMessage= '';
            $scope.errorMessage= '';
            $scope.user= {};
            $scope.myForm.$setPristine();
        };
    }]
    );