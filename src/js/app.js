'use strict';

/* App Module */

angular.module('gitHub', [
    'ngRoute',
    'ngAnimate'
]).config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/users', {
                templateUrl: '/tpls/users.html',
                controller: 'UsersCtrl'
            }).
            when('/users/:login', {
                templateUrl: 'tpls/user.html',
                controller: 'UserCtrl'
            }).
            when('/users/:login/:repo', {
                templateUrl: 'tpls/repo.html',
                controller: 'RepoCtrl'
            }).
            when('/users/:login/:repo/commits', {
                templateUrl: 'tpls/commits.html',
                controller: 'CommitsCtrl'
            }).
            otherwise({
                redirectTo: '/users'
            });
    }
]).controller('UsersCtrl', ['$scope', '$http',
    function($scope, $http) {
    	var cache = [];

    	if (!cache.length) {
    		$http.get('https://api.github.com/users').then(function(res) {
                angular.forEach(res.data, function(item){
                    $http.get(item.url).then(function(res) {
                        cache.push({
                            "id": res.data.id,
                            "login": res.data.login,
                            "email": res.data.email
                        });
                    });
                });
            });
    	}

    	$scope.users = cache;
    }
]).controller('UserCtrl', ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams) {
		$http.get('https://api.github.com/users/' + $routeParams.login).then(function(res){
            $scope.id = res.data.id;
            $scope.login = res.data.login;
            $scope.email = res.data.email;
            $scope.name = res.data.name;
		});

        $http.get('https://api.github.com/users/' + $routeParams.login + '/repos').then(function(res){
            $scope.repos = res.data;
        });
	}
]).controller('RepoCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $scope.login = $routeParams.login;
        $scope.name = $routeParams.repo;

        $http.get('https://api.github.com/repos/' + $routeParams.login 
            + '/' + $routeParams.repo + '/branches').then(function(res){
            $scope.branches = res.data;
        });
        /*$http.get('https://api.github.com/repos/' + $routeParams.login 
            + '/' + $routeParams.repo + '/commits').then(function(res){
            $scope.commits = res.data;
        });*/
    }
]).controller('CommitsCtrl', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
        $http.get('https://api.github.com/repos/' + $routeParams.login 
            + '/' + $routeParams.repo + '/commits').then(function(res){
            $scope.commits = res.data;
        });
    }
]).controller('BackCtrl', ['$scope', '$location',
    function($scope, $location) {
        $scope.goBack = function(){
            var curr = $location.path().split("/");

            if(curr.length > 2){
                curr.splice(curr.length - 1, 1);
                $location.path(curr.join("/"));
            }
        }
    }
]).animation('.slide', ['$rootScope',
    function($rootScope){
        var postfix = "-rl";

        $rootScope.$on('$locationChangeSuccess', function(e, newValue, oldValue){
            if(oldValue.length > newValue.length && oldValue.length - newValue.length > 1){
                postfix = "-lr";
            } else {
                postfix = "-rl";
            }
        });

        return {
            enter: function(elem, done){
                elem.addClass("slide" + postfix);
                done();
            },
            leave: function(elem, done){
                elem.removeClass("slide" + postfix);
                done();
            }
        };
    }
]);