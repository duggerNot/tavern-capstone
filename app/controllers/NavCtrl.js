"use strict";
TavernApp.controller("NavCtrl",[
  "$scope",
  "authFactory",
  "firebaseAuthURL",

  function($scope, authFactory, firebaseAuthURL) {


    let ref = new Firebase(firebaseAuthURL);

    $scope.logout = () => {
    	console.log("log out called");
    	ref.unauth();
    }

		// // mobile view
  //   $(".button-collapse").sideNav({
		// 	closeOnClick: true
		// });



  }]);