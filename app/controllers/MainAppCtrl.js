"use strict";

TavernApp.controller("MainAppCtrl",
[
  "$scope",
  "$http",
  "authFactory",
  "firebaseAuthURL",
  "$location",


  function($scope, $http, authFactory, firebaseAuthURL, $location) {

		$scope.dwarfSubRaces = ["Hill Dwarf", "Mountain Dwarf"];
		$scope.elfSubRaces = ["High Elf", "Wood Elf", "Dark Elf"];
		$scope.halflingSubRaces = ["Lightfoot", "Stout"];
		$scope.humanSubRaces = ["Calishite", "Chondathan", "Damaran", "Illuskan", "Mulan", "Rashemi", "Shou", "Tethyrian", "Turami"];
		$scope.gnomeSubRaces = ["Forest Gnome", "Rock Gnome"];
  	$scope.CharObject = {};
  	$scope.CharObject.profBonus = 2;
  	$scope.applied = false;
  	$scope.selectedSkills = 0;
  	$scope.skillArray = [];
  	$scope.spellList = [];

// 	spell lists
		// cantrips
		$scope.bardCantrips = ["Blade Ward", "Dancing Lights", "Friends", "Light", "Mage Hand", "Mending", "Message", "Minor Illusion", "Prestidigitation", "Thunderclap", "True Strike", "Vicious Mockery"];
		$scope.clericCantrips = ["Guidance", "Light", "Mending", "Resistance", "Sacred Flame", "Spare the Dying", "Thaumaturgy"];
		$scope.druidCantrips = ["Control Flames", "Create Bonfire", "Druidcraft", "Frostbite", "Guidance", "Gust", "Magic Stone", "Mending", "Mold Earth", "Poison Spray", "Produce Flame", "Resistance", "Shape Water", "Shillelagh", "Thorn Whip", "Thnuderclap"];
		$scope.paladinCantrips = ["Paladin Have No Cantrips"];
		$scope.rangerCantrips = ["Rangers Have No Cantrips"];
		$scope.sorcererCantrips = ["Acid Splash", "Blade Ward", "Booming Blade", "Chill Touch", "Control Flames", "Create Bonfire", "Dancing Lights", "Fire Bolt", "Friends", "Frostbite", "Green-Flame Blade", "Gust", "Light", "Lightning Lure", "Mage Hand", "Mending", "Message", "Minor Illusion", "Mold Earth", "Poison Spray", "Prestidigitation", "Ray of Frost", "Shape Water", "Shocking Grasp", "Sword Burst", "Thunderclap", "True Strike"];
		$scope.warlockCantrips = ["Blade Ward", "Booming Blade", "Chill Touch", "Create Bonfire", "Eldritch Blast", "Friends", "Frostbite", "Green-Flame Blade", "Lightning Lure", "Mage Hand", "Magic Stone", "Minor Illusion", "Poison Spray", "Prestidigitation", "Sword Burst", "Thunderclap", "True Strike"];
		$scope.wizardCantrips = ["Acid Splash", "Blade Ward", "Booming Blade", "Chill Touch", "Control Flames", "Create Bonfire", "Dancing Lights", "Fire Bolt", "Friends", "Frostbite", "Green-Flame Blade", "Gust", "Light", "Lightning Lure", "Mage Hand", "Mending", "Message", "Minor Illusion", "Mold Earth", "Poison Spray", "Prestidigitation", "Ray of Frost", "Shape Water", "Shocking Grasp", "Sword Burst", "Thunderclap", "True Strike"];
		// first level
		$scope.bardFirstLevel = ["Animal Friendship", "Bane", "Charm Person", "Comprehend Languages", "Cure Wounds", "Detect Magic", "Disguise Self", "Dissonant Whispers", "Earth Tremor", "Faerie Fire", "Feather Fall", "Healing Word", "Heroism", "Identify", "Illusory Script", "Longstrider", "Silent Image", "Sleep", "Speak with Animals", "Tasha's Hideous Laughter", "Thunderwave", "Unseen Servant"];
		$scope.clericFirstLevel = ["Bane", "Bless", "Command", "Create or Destroy Water", "Cure Wounds", "Detect Evil and Good", "Detect Magic", "Detect Poison and Disease", "Guiding Bolt", "Healing Word", "Inflict Wounds", "Protection from Evil and Good", "Purify Food and Drink", "Sanctuary", "Shield of Faith"];
		$scope.druidFirstLevel = ["Absorb Elements", "Animal Friendship", "Beast Bond", "Charm Person", "Create or Destroy Water", "Cure Wounds", "Detect Magic", "Detect Poison and Disease", "Earth Tremor", "Entangle", "Faerie Fire", "Fog Cloud", "Goodberry", "Healing Word", "Ice Knife", "Jump", "Longstrider", "Purify Food and Drink", "Speak with Animals", "Thunderwave"];
		$scope.paladinFirstLevel = ["Bless", "Command", "Compelled Duel", "Cure Wounds", "Detect Good and Evil", "Detect Magic", "Detect Poison and Disease", "Divine Favor", "Heroism", "Protection from Evil and Good", "Purify Food and Drink", "Searing Smite", "Shield of Faith", "Thunderous Smite", "Wratheful Smite"];
		$scope.rangerFirstLevel = ["Absorb Elements", "Alarm", "Animal Friendship", "Beast Bond", "Cure Wounds", "Detect Magic", "Detect Poison and Disease", "Ensnaring Strike", "Fog Cloud", "Goodberry", "Hail of Thorns", "Hunter's Mark", "Jump", "Longstrider", "Speak with Animals"];
		$scope.sorcererFirstLevel = ["Burning Hands", "Catapult", "Charm Person", "Chromatic Orb", "Color Spray", "Comprehend Languages", "Detect Magic", "Disguise Self", "Earth Tremor", "Expeditious Retreat", "False Life", "Feather Fall", "Fog Cloud", "Ice Knife", "Jump", "Mage Armor", "Magic Missile", "Ray of Sickness", "Shield", "Silent Image", "Sleep", "Thunderwave", "Witch Bolt"];
		$scope.warlockFirstLevel = ["Armor of Agathys", "Arms of Hadar", "Charm Person", "Comprehend Languages", "Expeditious Retreat", "Hellish Rebuke", "Hex", "Illusory Script", "Protection from Evil and Good", "Unseen Servant", "Witch Bolt"];
		$scope.wizardFirstLevel = ["Absorb Elements", "Alarm", "Burning Hands", "Catapult", "Charm Person", "Chromatic Orb", "Color Spray", "Comprehend Languages", "Detect Magic", "Disguise Self", "Earth Tremor", "Expeditius Retreat", "False Life", "Feather Fall", "Find Familiar", "Fog Cloud", "Grease", "Ice Knife", "Identify", "Illusory Script", "Jump", "Longstrider", "Mage Armor", "Magic Missile", "Protection from Evil and Good", "Ray of Sickness", "Shield", "Silent Image", "Sleep", "Tasha's Hideous Laughter", "Tenser's Floating Disk", "Thunderwave", "Unseen Servant", "Witch Bolt"];


// // this function rolls 4d6 and drops the lowest value and then adds the rest for attribute stats
		$scope.statRoll = function(attr) {

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

		$scope.rollAll = function() {
			$scope.statRoll("Strength");
			$scope.statRoll('Dexterity');
			$scope.statRoll('Constitution');
			$scope.statRoll('Intelligence');
			$scope.statRoll('Wisdom');
			$scope.statRoll('Charisma');
			$scope.applied = false;
		}

		$scope.applyBonus = function() {
			if ($scope.applied === false) {
				switch ($scope.selectedRace) {
					case "Human":
						$scope.CharObject.Strength += 1;
						$scope.CharObject.Dexterity += 1;
						$scope.CharObject.Constitution += 1;
						$scope.CharObject.Intelligence += 1;
						$scope.CharObject.Wisdom += 1;
						$scope.CharObject.Charisma += 1;
						break;
					case "Dragonborn":
						$scope.CharObject.Strength += 2;
						$scope.CharObject.Charisma += 1;
						break;
					case "Dwarf":
						$scope.CharObject.Constitution += 2;
						break;
					case "Elf":
						$scope.CharObject.Dexterity += 2;
						break;
					case "Halfling":
						$scope.CharObject.Dexterity += 2;
						break;
					case "Gnome":
						$scope.CharObject.Intelligence += 2;
						break;
					case "Tiefling":
						$scope.CharObject.Charisma += 2;
						$scope.CharObject.Intelligence += 1;
						break;
					case "Half-Elf":  // +1 to two abilities of your choice?
						$scope.CharObject.Charisma += 2;
						break;
					case "Half-Orc":
						$scope.CharObject.Strength += 2;
						$scope.CharObject.Constitution += 1;
						break;
					default:
						console.log("No Race selected, No bonus applied");
						break;
				}
				switch ($scope.subRace) {
					case "Hill Dwarf":
						$scope.CharObject.Wisdom += 1;
						break;
					case "Mountain Dwarf":
						$scope.CharObject.Strength += 2;
						break;
					case "High Elf":
						$scope.CharObject.Intelligence += 1;
						break;
					case "Wood Elf":
						$scope.CharObject.Wisdom += 1;
						break;
					case "Dark Elf":
						$scope.CharObject.Charisma += 1;
						break;
					case "Lightfoot":
						$scope.CharObject.Charisma += 1;
						break;
					case "Stout":
						$scope.CharObject.Constitution += 1;
						break;
					case "Forest Gnome":
						$scope.CharObject.Dexterity += 1;
						break;
					case "Rock Gnome":
						$scope.CharObject.Constitution += 1;
						break;
					default:
						console.log("No Sub Race Bonus");
						break;
				}
			$scope.applied = true;
			}
			};


		$scope.determineMod = function(ability) {
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
		};


		$scope.getHP = function(charObj) {
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
		$scope.savingThrows = function(charObj) {
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
			$scope.CharObject.SavingThrows = $scope.savingThrows($scope.CharObject);
		}

		$scope.skillsCheckBox = {
			Acrobatics: false,
			AnimalHandling: false,
			Arcana: false,
			Athletics: false,
			Deception: false,
			History: false,
			Insight: false,
			Intimidation: false,
			Investigation: false,
			Medicine: false,
			Nature: false,
			Perception: false,
			Performance: false,
			Persuasion: false,
			Religion: false,
			SleightOfHand: false,
			Stealth: false,
			Survival: false
		}





// helper function to disable all skillboxes
		$scope.disableAllSkills = function() {
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

// helper function to uncheck the skills
		$scope.uncheckAllSkills = function() {
			$scope.skillsCheckBox.Acrobatics = false;
			$scope.skillsCheckBox.AnimalHandling = false;
			$scope.skillsCheckBox.Arcana = false;
			$scope.skillsCheckBox.Athletics = false;
			$scope.skillsCheckBox.Deception = false;
			$scope.skillsCheckBox.History = false;
			$scope.skillsCheckBox.Insight = false;
			$scope.skillsCheckBox.Intimidation = false;
			$scope.skillsCheckBox.Investigation = false;
			$scope.skillsCheckBox.Medicine = false;
			$scope.skillsCheckBox.Nature = false;
			$scope.skillsCheckBox.Perception = false;
			$scope.skillsCheckBox.Performance = false;
			$scope.skillsCheckBox.Persuasion = false;
			$scope.skillsCheckBox.Religion = false;
			$scope.skillsCheckBox.SleightOfHand = false;
			$scope.skillsCheckBox.Stealth = false;
			$scope.skillsCheckBox.Survival = false;
			$scope.selectedSkills = 0;
		}

// enable skills based on class
		$scope.skillSelect = function() {
			switch ($scope.class) {
				case "Barbarian":
					$scope.disableAllSkills();
					$scope.uncheckAllSkills();
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
					$scope.uncheckAllSkills();
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
					$scope.uncheckAllSkills();
					angular.element(historySkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(medicineSkill)[0].removeAttribute("disabled");
					angular.element(persuasionSkill)[0].removeAttribute("disabled");
					angular.element(religionSkill)[0].removeAttribute("disabled");
					break;
				case "Druid":
					$scope.disableAllSkills();
					$scope.uncheckAllSkills();
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
					$scope.uncheckAllSkills();
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
					$scope.uncheckAllSkills();
					angular.element(acrobaticsSkill)[0].removeAttribute("disabled");
					angular.element(athleticsSkill)[0].removeAttribute("disabled");
					angular.element(historySkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(religionSkill)[0].removeAttribute("disabled");
					angular.element(stealthSkill)[0].removeAttribute("disabled");
					break;
				case "Paladin":
					$scope.disableAllSkills();
					$scope.uncheckAllSkills();
					angular.element(athleticsSkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(intimidationSkill)[0].removeAttribute("disabled");
					angular.element(medicineSkill)[0].removeAttribute("disabled");
					angular.element(persuasionSkill)[0].removeAttribute("disabled");
					angular.element(religionSkill)[0].removeAttribute("disabled");
					break;
				case "Ranger":
					$scope.disableAllSkills();
					$scope.uncheckAllSkills();
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
					$scope.uncheckAllSkills();
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
					$scope.uncheckAllSkills();
					angular.element(arcanaSkill)[0].removeAttribute("disabled");
					angular.element(deceptionSkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(intimidationSkill)[0].removeAttribute("disabled");
					angular.element(persuasionSkill)[0].removeAttribute("disabled");
					angular.element(religionSkill)[0].removeAttribute("disabled");
					break;
				case "Warlock":
					$scope.disableAllSkills();
					$scope.uncheckAllSkills();
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
					$scope.uncheckAllSkills();
					angular.element(arcanaSkill)[0].removeAttribute("disabled");
					angular.element(historySkill)[0].removeAttribute("disabled");
					angular.element(insightSkill)[0].removeAttribute("disabled");
					angular.element(investigationSkill)[0].removeAttribute("disabled");
					angular.element(medicineSkill)[0].removeAttribute("disabled");
					angular.element(religionSkill)[0].removeAttribute("disabled");

					break;
			}
		}




		$scope.backgroundSkills = function() {
			switch ($scope.background) {
				case "Acolyte":
					$scope.uncheckAllSkills();
					$scope.skillsCheckBox.Insight = true;
					$scope.skillsCheckBox.Religion = true;
					$scope.selectedSkills = 2;
					break;
				case "Charlatan":
					$scope.uncheckAllSkills();
					$scope.skillsCheckBox.Deception = true;
					$scope.skillsCheckBox.SleightOfHand = true;
					$scope.selectedSkills = 2;
					break;
				case "Criminal":
					$scope.uncheckAllSkills();
					$scope.skillsCheckBox.Deception = true;
					$scope.skillsCheckBox.Stealth = true;
					$scope.selectedSkills = 2;
					break;
				case "Entertainer":
					$scope.uncheckAllSkills();
					$scope.skillsCheckBox.Acrobatics = true;
					$scope.skillsCheckBox.Performance = true;
					$scope.selectedSkills = 2;
					break;
				case "Folk Hero":
					$scope.uncheckAllSkills();
					$scope.skillsCheckBox.AnimalHandling = true;
					$scope.skillsCheckBox.Survival = true;
					$scope.selectedSkills = 2;
					break;
				case "Guild Artisan":
					$scope.uncheckAllSkills();
					$scope.skillsCheckBox.Insight = true;
					$scope.skillsCheckBox.Persuasion = true;
					$scope.selectedSkills = 2;
					break;
				case "Hermit":
					$scope.uncheckAllSkills();
					$scope.skillsCheckBox.Medicine = true;
					$scope.skillsCheckBox.Religion = true;
					$scope.selectedSkills = 2;
					break;
				case "Noble":
					$scope.uncheckAllSkills();
					$scope.skillsCheckBox.History = true;
					$scope.skillsCheckBox.Persuasion = true;
					$scope.selectedSkills = 2;
					break;
				case "Outlander":
					$scope.uncheckAllSkills();
					$scope.skillsCheckBox.Athletics = true;
					$scope.skillsCheckBox.Survival = true;
					$scope.selectedSkills = 2;
					break;
				case "Sage":
					$scope.uncheckAllSkills();
					$scope.skillsCheckBox.Arcana = true;
					$scope.skillsCheckBox.History = true;
					$scope.selectedSkills = 2;
					break;
				case "Sailor":
					$scope.uncheckAllSkills();
					$scope.skillsCheckBox.Athletics = true;
					$scope.skillsCheckBox.Perception = true;
					$scope.selectedSkills = 2;
					break;
				case "Soldier":
					$scope.uncheckAllSkills();
					$scope.skillsCheckBox.Athletics = true;
					$scope.skillsCheckBox.Intimidation = true;
					$scope.selectedSkills = 2;
					break;
				case "Urchin":
					$scope.uncheckAllSkills();
					$scope.skillsCheckBox.SleightOfHand = true;
					$scope.skillsCheckBox.Stealth = true;
					$scope.selectedSkills = 2;
					break;
				default:
					break;
			}

		}

		$scope.skillsLimit = function() {
			if ($scope.class === "Bard"){
				if ($scope.selectedSkills <= 3) {
					$scope.selectedSkills++
					console.log("skill #", $scope.selectedSkills);
				} else {
					$scope.disableAllSkills();
				}
			} else if ($scope.class === "Rogue") {
					if ($scope.selectedSkills <= 4) {
						$scope.selectedSkills++
						console.log("skill #", $scope.selectedSkills);
					} else {
						$scope.disableAllSkills();
					}

			} else {
				if ($scope.selectedSkills <= 2) {
					$scope.selectedSkills++
					console.log("skill #", $scope.selectedSkills);
				} else {
					$scope.disableAllSkills();
				}
			}
		};

		$scope.getSpeed = function(charObj) {
			switch (charObj.race){
				case "Dwarf":
					return 25;
					break;
				case "Elf":
					return 30;
					break;
				case "Halfling":
					return 25;
					break;
				case "Human":
					return 30;
					break;
				case "Dragonborn":
					return 30;
					break;
				case "Gnome":
					return 25;
					break;
				case "Half-Elf":
					return 30;
					break;
				case "Half-Orc":
					return 30;
					break;
				case "Tiefling":
					return 30;
					break;
				default:
					break;
			}
		}

		$scope.getSize = function(charObj) {
			switch (charObj.race){
				case "Dwarf":
					return "Medium";
					break;
				case "Elf":
					return "Medium";
					break;
				case "Halfling":
					return "Small";
					break;
				case "Human":
					return "Medium";
					break;
				case "Dragonborn":
					return "Medium";
					break;
				case "Gnome":
					return "Small";
					break;
				case "Half-Elf":
					return "Medium";
					break;
				case "Half-Orc":
					return "Medium";
					break;
				case "Tiefling":
					return "Medium";
					break;
				default:
					break;
			}
		}


		$scope.saveChar = function() {

			$scope.CharObject.name = $scope.charName;
			$scope.CharObject.race = $scope.selectedRace;
			$scope.CharObject.subRace = $scope.subRace;
			$scope.CharObject.class = $scope.class;
			$scope.CharObject.alignment = $scope.alignment;
			$scope.CharObject.background = $scope.background;

			$scope.CharObject.speed = $scope.getSpeed($scope.CharObject);
			$scope.CharObject.size = $scope.getSize($scope.CharObject);

			$scope.CharObject.StrMod = $scope.determineMod($scope.CharObject.Strength);
			$scope.CharObject.DexMod = $scope.determineMod($scope.CharObject.Dexterity);
			$scope.CharObject.ConMod = $scope.determineMod($scope.CharObject.Constitution);
			$scope.CharObject.IntMod = $scope.determineMod($scope.CharObject.Intelligence);
			$scope.CharObject.WisMod = $scope.determineMod($scope.CharObject.Wisdom);
			$scope.CharObject.ChaMod = $scope.determineMod($scope.CharObject.Charisma);

			$scope.CharObject.HitPoints = $scope.getHP($scope.CharObject);
			$scope.CharObject.SavingThrows = $scope.savingThrows($scope.CharObject);

			for (let skill in $scope.skillsCheckBox){
				if ($scope.skillsCheckBox[skill] === true) {
					$scope.skillArray.push(skill);
				}
			}
			$scope.CharObject.skillProfs = $scope.skillArray;
			console.log("object", $scope.CharObject);
      $http.post(
        "https://tavernapp.firebaseio.com/characters.json",
        JSON.stringify($scope.CharObject)
      ).then(
        () => $location.url("/CharList"),
        (response) => console.log(response)
      );
		}

	}
]);
