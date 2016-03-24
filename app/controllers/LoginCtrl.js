"use strict";

TavernApp.controller("LoginCtrl",
[
  "$scope",
  "$location",
  "$http",
  "authFactory",
  "firebaseAuthURL",

  function($scope, $location, $http, authFactory, firebaseAuthURL) {


    let ref = new Firebase(firebaseAuthURL);
    $scope.account = { email: "", password: "" };


    $scope.register = () => {
      ref.createUser({
        email    : $scope.account.email,
        password : $scope.account.password
      }, (error, userData) => {
        if (error) {
          console.log(`Error creating user: ${error}`);
        } else {
          console.log(`Created user account with uid: ${userData.uid}`);
          $scope.login();
        }
      });
    };


    $scope.login = () => 
      authFactory
        .authenticate($scope.account)
        .then(() => {
          $location.path("/main");
          $scope.$apply();  
        });


  }
]);