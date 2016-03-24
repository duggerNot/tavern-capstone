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


		// I need a function that will 'roll' 4d6 and drop the lowest roll
		// the rest of the rolls will be added together

















	}
]);
