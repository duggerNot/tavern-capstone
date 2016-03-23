"use strict";


TavernApp.controller("MainAppCtrl",
[
  "$scope",
  "$http",
  "authFactory",
  "firebaseAuthURL",

  function($scope, $http, authFactory, firebaseAuthURL) {

		// mobile view
		$(".button-collapse").sideNav({
			closeOnClick: true
		});

		$('select').material_select();


		  }
]);
