'use strict';

const CRUD_SERVER = '//crud.local:3001';

function getFormData(form) {
    return form.serializeArray().reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
    }, {});
}

angular.module('CRUD', ['ngResource', 'ngRoute'])
    .config(($routeProvider, $locationProvider) => {
        $routeProvider
            .when("/users", {
                templateUrl: "users.html",
                controller: "AllUsersCtrl"
            })
            .when("/users/add", {
                templateUrl: "userAdd.html",
                controller: "AddUserCtrl"
            })
            .when("/users/:id/edit", {
                templateUrl: "userEdit.html",
                controller: "EditUserCtrl"
            })
            .when("/users/:id", {
                templateUrl: "user.html",
                controller: "UserByIDCtrl"
            })
            .otherwise({
                redirectTo: '/users'
            });
        // use the HTML5 History API
        // $locationProvider.html5Mode(true);
    })

    .controller('AllUsersCtrl', function ($scope, $rootScope, $http) {
        $http.get(`${CRUD_SERVER}/users?format=json`)
            .success(data => {
                $rootScope.title = data.title;
                $scope.users = data.users;
            })
            .error(() => console.error('Unexpected error'));
    })

    .controller('UserByIDCtrl', function ($scope, $rootScope, $http, $routeParams) {
        $scope.id = $routeParams.id;
        $http.get(`${CRUD_SERVER}/users/${$scope.id}?format=json`)
            .success(data => {
                $rootScope.title = data.title;
                $scope.user = data.user;
            })
            .error(() => console.error('Unexpected error'));
    })

    .controller('AddUserCtrl', function ($scope, $rootScope, $http, $location) {
        $rootScope.title = 'New User';

        $scope.add = event => {
            event.preventDefault();
            let formData = getFormData($('#addUser'));
            $http.post(`${CRUD_SERVER}/users`, formData)
                .success((data, status, headers, config) => {
                    if (data.status === 'ok') {
                        $location.path('./#/users');
                    }
                })
                .error((data, status, headers, config) => {
                        console.error(`Unexpected error: ${data}`);
                    }
                );
        };

        $scope.cancel = () => {
            window.history.back();
        }
    })

    .controller('EditUserCtrl', function ($scope, $rootScope, $http, $routeParams, $location) {
        $scope.id = $routeParams.id;
        $http.get(`${CRUD_SERVER}/users/${$scope.id}?format=json`)
            .success(data => {
                $rootScope.title = data.title;
                $scope.user = data.user;
            })
            .error(() => console.error('Unexpected error'));

        $scope.save = (id, event) => {
            event.preventDefault();
            let formData = getFormData($('#editUser'));
            $http.put(`${CRUD_SERVER}/users/${id}`, formData)
                .success((data, status, headers, config) => {
                    if (data.status === 'ok') {
                        $location.path('./#/users');
                    }
                })
                .error((data, status, headers, config) => {
                        console.error(`Unexpected error: ${data}`);
                    }
                );
        };

        $scope.cancel = () => {
            window.history.back();
        }
    })

    .controller('MainCtrl', function ($scope, $rootScope, $http, $location) {
        $scope.deleteUser = id => {
            if (confirm(`Are you sure you want to delete this user?`)) {
                $http.delete(`${CRUD_SERVER}/users/${id}`);
                $location.path('./#/users');
            }
        };
    });