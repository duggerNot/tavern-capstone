"use strict";
TavernApp.controller("ListViewCtrl", [
	"$scope",
  "authFactory",
  "firebaseAuthURL",
  "charFactory",
  "$routeParams",

  function($scope, authFactory, firebaseAuthURL, charFactory, $routeParams) {

  	console.log("List View Controller");
  	

  	$scope.characters = [];
  	

    charFactory().then(
      characterList => {

	      Object.keys(characterList).forEach(key => {
	        characterList[key].id = key;
	        $scope.characters.push(characterList[key]);
	        console.log("list", characterList[key]);        
	      })
	      
	    },
      err => console.log(err)
    );

    
  }]);