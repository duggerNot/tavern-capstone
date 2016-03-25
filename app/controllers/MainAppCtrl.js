"use strict";

TavernApp.controller("MainAppCtrl",
[
  "$scope",
  "$http",
  "authFactory",
  "firebaseAuthURL",

  function($scope, $http, authFactory, firebaseAuthURL) {

  	$scope.object = {};
// this function rolls 4d6 and drops the lowest value and then adds the rest for attribute stats
		$scope.statRoll = (attr) => {
			
			let rollArray = [];
			
			let firstRoll = (Math.floor((Math.random()*6)+1));
			let secondRoll = (Math.floor((Math.random()*6)+1));
			let thirdRoll = (Math.floor((Math.random()*6)+1));
			let fourthRoll = (Math.floor((Math.random()*6)+1));

			rollArray.push(firstRoll);
			rollArray.push(secondRoll);
			rollArray.push(thirdRoll);
			rollArray.push(fourthRoll);

			rollArray.sort(function(a, b) {
  			return a - b;
			});
			
			rollArray.shift();
			let finalRoll = rollArray.reduce(function(a, b) {
 				 return a + b;
			});
			console.log("final", finalRoll);

			$scope.object[attr] = finalRoll;
			console.log("object", $scope.object);
			

		}

		$scope.dwarfSubRaces = ["Hill Dwarf", "Mountain Dwarf"];
		$scope.elfSubRaces = ["High Elf", "Wood Elf", "Dark Elf"];
		$scope.halflingSubRaces = ["Lightfoot", "Stout"];
		$scope.humanSubRaces = ["Calishite", "Chondathan", "Damaran", "Illuskan", "Mulan", "Rashemi", "Shou", "Tethyrian", "Turami"];
		$scope.gnomeSubRaces = ["Forest Gnome", "Rock Gnome"];


		$scope.subRaceFilter = function() {
			switch ($scope.selectedRace) {
				case "Dwarf":
					return $scope.dwarfSubRaces;
					break;
				case "Elf":
					return $scope.elfSubRaces;
					break;
				case "Halfling":
					return $scope.halflingSubRaces;
					break;
				case "Human":
					return $scope.humanSubRaces;
					break;
				case "Gnome":
					return $scope.gnomeSubRaces;
					break;
				default:
					break;
			}
		}


		












	}
]);
