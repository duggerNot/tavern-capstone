"use strict";

TavernApp.controller("MainAppCtrl",
[
  "$scope",
  "$http",
  "authFactory",
  "firebaseAuthURL",

  function($scope, $http, authFactory, firebaseAuthURL) {

		$scope.dwarfSubRaces = ["Hill Dwarf", "Mountain Dwarf"];
		$scope.elfSubRaces = ["High Elf", "Wood Elf", "Dark Elf"];
		$scope.halflingSubRaces = ["Lightfoot", "Stout"];
		$scope.humanSubRaces = ["Calishite", "Chondathan", "Damaran", "Illuskan", "Mulan", "Rashemi", "Shou", "Tethyrian", "Turami"];
		$scope.gnomeSubRaces = ["Forest Gnome", "Rock Gnome"];
  	$scope.CharObject = {};
  	$scope.CharObject.profBonus = 2;

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
			

			$scope.CharObject[attr] = finalRoll;
		}

		$scope.rollAll = () => {
			$scope.statRoll("Strength");
			$scope.statRoll('Dexterity');
			$scope.statRoll('Constitution');
			$scope.statRoll('Intelligence');
			$scope.statRoll('Wisdom');
			$scope.statRoll('Charisma');
		}

		$scope.determineMod = (ability) => {
			switch (true) {
				case (ability === 1):
					return -5;
					break;
				case (ability === 2 || ability === 3):
					return -4;
					break;
				case (ability === 4 || ability === 5):
					return -3;
					break;
				case (ability === 6 || ability === 7):
					return -2;
					break;
				case (ability === 8 || ability === 9):
					return -1;
					break;
				case (ability === 10 || ability === 11):
					return 0;
					break;
				case (ability === 12 || ability === 13):
					return 1;
					break;
				case (ability === 14 || ability === 15):
					return 2;
					break;
				case (ability === 16 || ability === 17):
					return 3;
					break;
				case (ability === 18 || ability === 19):
					return 4;
					break;
				case (ability === 20 || ability === 21):
					return 5;
					break;
				case (ability === 22 || ability === 23):
					return 6;
					break;
				case (ability === 24 || ability === 25):
					return 7;
					break;
				case (ability === 26 || ability === 27):
					return 8;
					break;
				case (ability === 28 || ability === 29):
					return 9;
					break;
				case (ability === 30):
					return 10;
					break;	
			}
		}

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


		$scope.getHP = (charObj) => {
			switch (charObj.class) {
				case "Barbarian":
					return (12 + charObj.ConMod);
					break;
				case "Bard":
					return (8 + charObj.ConMod);
					break;
				case "Cleric":
					return (8 + charObj.ConMod);
					break;
				case "Druid":
					return (8 + charObj.ConMod);
					break;
				case "Fighter":
					return (10 + charObj.ConMod);
					break;
				case "Monk":
					return (8 + charObj.ConMod);
					break;
				case "Paladin":
					return (10 + charObj.ConMod);
					break;
				case "Ranger":
					return (10 + charObj.ConMod);
					break;
				case "Rogue":
					return (8 + charObj.ConMod);
					break;
				case "Sorcerer":
					return (6 + charObj.ConMod);
					break;
				case "Warlock":
					return (8 + charObj.ConMod);
					break;
				case "Wizard":
					return (6 + charObj.ConMod);
					break;
			}

		}
		$scope.savingThrows = (charObj) => {
			switch (charObj.class) {
				case "Barbarian":
					return "Strength & Constitution"
					break;
				case "Bard":
					return "Dexterity & Charisma"
					break;
				case "Cleric":
					return "Wisdom & Charisma"
					break;
				case "Druid":
					return "Intelligence & Wisdom"
					break;
				case "Fighter":
					return "Strength & Constitution"
					break;
				case "Monk":
					return "Strength & Dexterity"
					break;
				case "Paladin":
					return "Wisdom & Charisma"
					break;
				case "Ranger":
					return "Strength & Dexterity"
					break;
				case "Rogue":
					return "Dexterity & Intelligence"
					break;
				case "Sorcerer":
					return "Constitution & Charisma"
					break;
				case "Warlock":
					return "Wisdom & Charisma"
					break;
				case "Wizard":
					return "Intelligence & Wisdom"
					break;
			}
		}
		

		$scope.saveChar = () => {
			$scope.CharObject.name = $scope.charName;
			$scope.CharObject.race = $scope.selectedRace;
			$scope.CharObject.subRace = $scope.subRace;
			$scope.CharObject.class = $scope.class;
			$scope.CharObject.alignment = $scope.alignment;

			$scope.CharObject.StrMod = $scope.determineMod($scope.CharObject.Strength);
			$scope.CharObject.DexMod = $scope.determineMod($scope.CharObject.Dexterity);
			$scope.CharObject.ConMod = $scope.determineMod($scope.CharObject.Constitution);
			$scope.CharObject.IntMod = $scope.determineMod($scope.CharObject.Intelligence);
			$scope.CharObject.WisMod = $scope.determineMod($scope.CharObject.Wisdom);
			$scope.CharObject.ChaMod = $scope.determineMod($scope.CharObject.Charisma);

			$scope.CharObject.HitPoints = $scope.getHP($scope.CharObject);
			$scope.CharObject.SavingThrows = $scope.savingThrows($scope.CharObject);
			console.log("object", $scope.CharObject);
		}










	}
]);
