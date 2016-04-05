"use strict";
TavernApp.controller("CharDetailCtrl", [
	"$scope",
  "firebaseAuthURL",
  "$routeParams",
  "$http",

  function($scope, firebaseAuthURL, $routeParams, $http) {

  	console.log("List View Controller");
  	

  	$scope.character;
  	

    $http.get(
      `${firebaseAuthURL}/characters/${$routeParams.charID}.json`
      ).success(
        character => {
          console.log("char", character);
          $scope.character = character;
        }
      )

    
  }]);