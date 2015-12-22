var myApp = angular.module('myApp', []);
myApp.controller('AppController', ['$scope', '$http', function($scope, $http) {


  var refresh = function() {
    $http.get('/contactlist').success(function(response) {
      $scope.userslist = response;
      $scope.user = "";
    });
  };

  refresh();

  $scope.addUser = function() {
    console.log($scope.contact);
    $http.post('/contactlist', $scope.user).success(function(response) {
      console.log(response);
      refresh();
    });
  };

  $scope.remove = function(id) {
    $http.delete('/contactlist/' + id).success(function(response) {
      refresh();
    });
  };

  $scope.edit = function(id) {
    console.log(id);
    $http.get('/contactlist/' + id).success(function(response) {
      $scope.user = response;
    });
  };

  $scope.update = function() {

    $http.put('/contactlist/' + $scope.user._id, $scope.user).success(function(response) {
      refresh();
    })
  };

  $scope.deselect = function() {
    $scope.user = "";
  }

}]);﻿