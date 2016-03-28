"use strict";

TavernApp.controller("MainAppCtrl",
[
  "$scope",
  "$http",
  "authFactory",
  "firebaseAuthURL",
  "$document",

  function($scope, $http, authFactory, firebaseAuthURL, $document) {
 
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

		$scope.subRaceFilter = () => {
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
// helper function to disable all skillboxes
		$scope.disableAllSkills = () => {
			angular.element(acrobaticsSkill)[0].setAttribute("disabled", "disabled");
			angular.element(animalhandlingSkill)[0].setAttribute("disabled", "disabled");
			angular.element(arcanaSkill)[0].setAttribute("disabled", "disabled");
			angular.element(athleticsSkill)[0].setAttribute("disabled", "disabled");
			angular.element(deceptionSkill)[0].setAttribute("disabled", "disabled");
			angular.element(historySkill)[0].setAttribute("disabled", "disabled");
			angular.element(insightSkill)[0].setAttribute("disabled", "disabled");
			angular.element(intimidationSkill)[0].setAttribute("disabled", "disabled");
			angular.element(investigationSkill)[0].setAttribute("disabled", "disabled");
			angular.element(medicineSkill)[0].setAttribute("disabled", "disabled");
			angular.element(natureSkill)[0].setAttribute("disabled", "disabled");
			angular.element(perceptionSkill)[0].setAttribute("disabled", "disabled");
			angular.element(performanceSkill)[0].setAttribute("disabled", "disabled");
			angular.element(persuasionSkill)[0].setAttribute("disabled", "disabled");
			angular.element(religionSkill)[0].setAttribute("disabled", "disabled");
			angular.element(sleightofhandSkill)[0].setAttribute("disabled", "disabled");
			angular.element(stealthSkill)[0].setAttribute("disabled", "disabled");
			angular.element(survivalSkill)[0].setAttribute("disabled", "disabled");
		}

// enable skills based on class
		$scope.skillSelect = () => {
			switch ($scope.class) {
				case "Barbarian":
					$scope.disableAllSkills();
					angular.element(animalhandlingSkill)[0].removeAttribute("disabled");
					angular.element(athleticsSkill)[0].removeAttribute("disabled");
					angular.element(intimidationSkill)[0].removeAttribute("disabled");
					angular.element(natureSkill)[0].removeAttribute("disabled");
					angular.element(perceptionSkill)[0].removeAttribute("disabled");
					angular.element(survivalSkill)[0].removeAttribute("disabled");
					break;
				case "Bard":
					// Bards can choose 3 of ANY skill
					$scope.disableAllSkills();
					angular.element(acrobaticsSkill)[0].removeAttribute("disabled");
					angular.element(animalhandlingSkill)[0].removeAttribute("disabled");
					angular.element(arcanaSkill)[0].removeAttribute("disabled");
					angular.element(athleticsSkill)[0].removeAttribute("disabled");
					angular.element(deceptionSkill)[0].removeAttribute("disabled");
					angular.element(historySkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(intimidationSkill)[0].removeAttribute("disabled");
					angular.element(investigationSkill)[0].removeAttribute("disabled");
					angular.element(medicineSkill)[0].removeAttribute("disabled");
					angular.element(natureSkill)[0].removeAttribute("disabled");
					angular.element(perceptionSkill)[0].removeAttribute("disabled");
					angular.element(performanceSkill)[0].removeAttribute("disabled");
					angular.element(persuasionSkill)[0].removeAttribute("disabled");
					angular.element(religionSkill)[0].removeAttribute("disabled");
					angular.element(sleightofhandSkill)[0].removeAttribute("disabled");
					angular.element(stealthSkill)[0].removeAttribute("disabled");
					angular.element(survivalSkill)[0].removeAttribute("disabled");

					break;
				case "Cleric":
					$scope.disableAllSkills();
					angular.element(historySkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(medicineSkill)[0].removeAttribute("disabled");
					angular.element(persuasionSkill)[0].removeAttribute("disabled");
					angular.element(religionSkill)[0].removeAttribute("disabled");
					break;
				case "Druid":
					$scope.disableAllSkills();
					angular.element(arcanaSkill)[0].removeAttribute("disabled");
					angular.element(animalhandlingSkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(medicineSkill)[0].removeAttribute("disabled");
					angular.element(natureSkill)[0].removeAttribute("disabled");
					angular.element(perceptionSkill)[0].removeAttribute("disabled");
					angular.element(religionSkill)[0].removeAttribute("disabled");
					angular.element(survivalSkill)[0].removeAttribute("disabled");
					break;
				case "Fighter":
					$scope.disableAllSkills();
					angular.element(acrobaticsSkill)[0].removeAttribute("disabled");
					angular.element(animalhandlingSkill)[0].removeAttribute("disabled");
					angular.element(athleticsSkill)[0].removeAttribute("disabled");
					angular.element(historySkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(intimidationSkill)[0].removeAttribute("disabled");
					angular.element(perceptionSkill)[0].removeAttribute("disabled");
					angular.element(survivalSkill)[0].removeAttribute("disabled");
					break;
				case "Monk":
					$scope.disableAllSkills();
					angular.element(acrobaticsSkill)[0].removeAttribute("disabled");
					angular.element(athleticsSkill)[0].removeAttribute("disabled");
					angular.element(historySkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(religionSkill)[0].removeAttribute("disabled");
					angular.element(stealthSkill)[0].removeAttribute("disabled");
					break;
				case "Paladin":
					$scope.disableAllSkills();
					angular.element(athleticsSkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(intimidationSkill)[0].removeAttribute("disabled");
					angular.element(medicineSkill)[0].removeAttribute("disabled");
					angular.element(persuasionSkill)[0].removeAttribute("disabled");
					angular.element(religionSkill)[0].removeAttribute("disabled");
					break;
				case "Ranger":
					$scope.disableAllSkills();
					angular.element(animalhandlingSkill)[0].removeAttribute("disabled");
					angular.element(athleticsSkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(investigationSkill)[0].removeAttribute("disabled");
					angular.element(natureSkill)[0].removeAttribute("disabled");
					angular.element(perceptionSkill)[0].removeAttribute("disabled");
					angular.element(stealthSkill)[0].removeAttribute("disabled");
					angular.element(survivalSkill)[0].removeAttribute("disabled");
					break;
				case "Rogue": // rogues get 4 skills
					$scope.disableAllSkills();
					angular.element(acrobaticsSkill)[0].removeAttribute("disabled");
					angular.element(athleticsSkill)[0].removeAttribute("disabled");
					angular.element(deceptionSkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(intimidationSkill)[0].removeAttribute("disabled");
					angular.element(investigationSkill)[0].removeAttribute("disabled");
					angular.element(perceptionSkill)[0].removeAttribute("disabled");
					angular.element(performanceSkill)[0].removeAttribute("disabled");
					angular.element(persuasionSkill)[0].removeAttribute("disabled");
					angular.element(sleightofhandSkill)[0].removeAttribute("disabled");
					angular.element(stealthSkill)[0].removeAttribute("disabled");
					break;
				case "Sorcerer":
					$scope.disableAllSkills();
					angular.element(arcanaSkill)[0].removeAttribute("disabled");
					angular.element(deceptionSkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(intimidationSkill)[0].removeAttribute("disabled");
					angular.element(persuasionSkill)[0].removeAttribute("disabled");
					angular.element(religionSkill)[0].removeAttribute("disabled");
					break;
				case "Warlock":
					$scope.disableAllSkills();
					angular.element(arcanaSkill)[0].removeAttribute("disabled");
					angular.element(deceptionSkill)[0].removeAttribute("disabled");
					angular.element(historySkill)[0].removeAttribute("disabled");
					angular.element(intimidationSkill)[0].removeAttribute("disabled");
					angular.element(investigationSkill)[0].removeAttribute("disabled");
					angular.element(natureSkill)[0].removeAttribute("disabled");
					angular.element(religionSkill)[0].removeAttribute("disabled");

					break;
				case "Wizard":
					$scope.disableAllSkills();
					angular.element(arcanaSkill)[0].removeAttribute("disabled");
					angular.element(historySkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(investigationSkill)[0].removeAttribute("disabled");
					angular.element(medicineSkill)[0].removeAttribute("disabled");
					angular.element(religionSkill)[0].removeAttribute("disabled");

					break;
			}
		}

		$scope.backgroundSkills = () => {
			switch ($scope.background) {
				case "Acolyte":
					angular.element(insightSkill)[0].setAttribute("checked", true);
					angular.element(religionSkill)[0].setAttribute("checked", true);
					break;
				case "Charlatan":
					angular.element(deceptionSkill)[0].setAttribute("checked", true);
					angular.element(sleightofhandSkill)[0].setAttribute("checked", true);
					break;
				case "Criminal":
					angular.element(deceptionSkill)[0].setAttribute("checked", true);
					angular.element(stealthSkill)[0].setAttribute("checked", true);
					break;
				case "Entertainer":
					angular.element(acrobaticsSkill)[0].setAttribute("checked", true);
					angular.element(performanceSkill)[0].setAttribute("checked", true);
					break;
				case "Folk Hero":
					angular.element(animalhandlingSkill)[0].setAttribute("checked", true);
					angular.element(survivalSkill)[0].setAttribute("checked", true);
					break;
				case "Guild Artisan":
					angular.element(insightSkill)[0].setAttribute("checked", true);
					angular.element(persuasionSkill)[0].setAttribute("checked", true);
					break;
				case "Hermit":
					angular.element(medicineSkill)[0].setAttribute("checked", true);
					angular.element(religionSkill)[0].setAttribute("checked", true);
					break;
				case "Noble":
					angular.element(historySkill)[0].setAttribute("checked", true);
					angular.element(persuasionSkill)[0].setAttribute("checked", true);
					break;
				case "Outlander":
					angular.element(athleticsSkill)[0].setAttribute("checked", true);
					angular.element(survivalSkill)[0].setAttribute("checked", true);
					break;
				case "Sage":
					angular.element(arcanaSkill)[0].setAttribute("checked", true);
					angular.element(historySkill)[0].setAttribute("checked", true);
					break;
				case "Sailor":
					angular.element(athleticsSkill)[0].setAttribute("checked", true);
					angular.element(perceptionSkill)[0].setAttribute("checked", true);
					break;
				case "Soldier":
					angular.element(athleticsSkill)[0].setAttribute("checked", true);
					angular.element(intimidationSkill)[0].setAttribute("checked", true);
					break;
				case "Urchin":
					angular.element(sleightofhandSkill)[0].setAttribute("checked", true);
					angular.element(stealthSkill)[0].setAttribute("checked", true);
					break;
				default:
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
