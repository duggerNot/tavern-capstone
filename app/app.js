"use strict";

let TavernApp = angular.module("tavern-app", ["ngRoute", "firebase", "ui.materialize"])
  .constant('firebaseAuthURL', "https://tavernapp.firebaseio.com/");

/*
  Define a promise for any view that needs an authenticated user
  before it will resolve (see below)
 */
let isAuth = (authFactory) => new Promise((resolve, reject) => {
  if (authFactory.isAuthenticated()) {
    console.log("User is authenticated");
    resolve();
  } else {
    console.log("User is not authenticated");
    reject();
  }
});


TavernApp.config(["$routeProvider",
  function ($routeProvider) {
    $routeProvider.  
      when("/login", {
        templateUrl: "partials/Login.html",
        controller: "LoginCtrl"
      }).
      when("/logout", {
        templateUrl: "partials/Login.html",
        controller: "LoginCtrl"
      }).
      when("/main", {
        templateUrl: "partials/MainView.html",
        controller: "MainAppCtrl",
        resolve: { isAuth }
      }).
      when("/CharList", {
      	templateUrl: "partials/ListView.html",
      	controller: "ListViewCtrl",
      	resolve: { isAuth }
      }).
      when("/CharList/:charID", {
        templateUrl: "partials/charDetailView.html",
        controller: "CharDetailCtrl",
        resolve: { isAuth }
      }).
      otherwise({
        redirectTo: "/main"
      });
  }]);

/*
  When the application first loads, redirect the user to the login
  form if there is no authentication
 */
TavernApp.run([
  "$location",
  "firebaseAuthURL",

  ($location, firebaseAuthURL) => {
    let TavernAppRef = new Firebase(firebaseAuthURL);

    TavernAppRef.onAuth(authData => {
      if (!authData) {
        $location.path("/login");
      }
    });
  }
]);





