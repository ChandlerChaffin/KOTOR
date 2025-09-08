Array.prototype.sample = function(){
	return this[Math.floor(Math.random()*this.length)];
}
class PlayerCharacter {
	constructor(name, strength, dexterity, intelligence, constitution, wisdom, charisma) {
		this.name = name;
		this.strength = strength;
		this.dexterity = dexterity;
		this.intelligence = intelligence;
		this.constitution = constitution; 
		this.wisdom = wisdom;
		this.charisma = charisma;
		this.maxHealth = 100;
		this.currentHealth = this.maxHealth;
		this.maxMana = 100;
		this.currentMana = this.maxMana;
		this.isDead = false;
		this.resisted = false;
	}
	getModifier(stat) {
		return Math.floor((stat-10)/2);
	}
	checkDeath() {
		if (this.currentHealth <= 0) {
			console.log(`${this.name} has fallen in battle.`)
			this.isDead = true;
		}
	}
	takeDamage(amount) {
		this.currentHealth -= amount;
		if (this.currentHealth <= 0) {
			this.currentHealth = 0;
			this.checkDeath();
		}
	}
	checkResist(target) {
		if (this.wisdom >= target.wisdom)
			this.resisted = false;
	}
	choke(target) {
		target.checkResist(this)
		if (target.resisted == false) {
			const damage = Math.floor(Math.random()*6) + 5 + this.getModifier(this.wisdom);
			console.log(teal+`${this.name} force chokes ${target.name}!`+reset);
			target.takeDamage(damage);
		}
		else {
			console.log(red+`${target.name} resists!`+reset)
		}
	}
	attack(target) {
		const attackRoll = Math.floor(Math.random()*20)+ 1 + this.getModifier(this.strength);
		const damage = Math.floor(Math.random()*6) + 1 + this.getModifier(this.strength);
		console.log(`${this.name} attacks ${target.name} with a roll of ${attackRoll}.`);
		if (attackRoll >= 12) {
			if (attackRoll >= 20) 
			{
				let crit_damage = damage * 2; 
				console.log(red+`Critical strike!`+reset);
				console.log(`${this.name} deals ${crit_damage} to ${target.name}.`);
				target.takeDamage(crit_damage);
			}
			else {
			console.log(`${this.name} deals ${damage} to ${target.name}.`);
			target.takeDamage(damage);
			}
		}
		else {
			console.log(`${this.name} misses!`);
		}
	}
}
class Nonplayer_Character {
	constructor(name, strength, dexterity, intelligence, constitution, wisdom, charisma) {
		this.name = name;
		this.strength = strength;
		this.dexterity = dexterity;
		this.intelligence = intelligence;
		this.constitution = constitution; 
		this.wisdom = wisdom;
		this.charisma = charisma;
		this.maxHealth = 50;
		this.currentHealth = this.maxHealth;
		this.maxMana = 100;
		this.currentMana = this.maxMana;
		this.isDead = false;
		this.resisted = false;
	}
	getModifier(stat) {
		return Math.floor((stat-10)/2);
	}
	checkDeath() {
		if (this.currentHealth <= 0) {
			console.log(`${this.name} has fallen in battle.`)
			this.isDead = true;
		}
	}
	takeDamage(amount) {
		this.currentHealth -= amount;
		if (this.currentHealth <= 0) {
			this.currentHealth = 0;
			this.checkDeath();
		}
	}
	checkResist(target) {
		if (this.wisdom >= target.wisdom)
			this.resisted = true;
	}
	attack(target) {
		const attackRoll = Math.floor(Math.random()*20)+ 1 + this.getModifier(this.strength);
		const damage = Math.floor(Math.random()*6) + 1 + this.getModifier(this.strength);
		console.log(`${this.name} attacks ${target.name} with a roll of ${attackRoll}.`);
		if (attackRoll >= 12) {
			if (attackRoll >= 20) 
			{
				let crit_damage = damage * 2; 
				console.log(red+`Critical strike!`+reset);
				console.log(`${this.name} deals ${crit_damage} to ${target.name}.`);
				target.takeDamage(crit_damage);
			}
			else {
			console.log(`${this.name} deals ${damage} to ${target.name}.`);
			target.takeDamage(damage);
			}
		}
		else {
			console.log(`${this.name} misses!`);
		}
	}
}
const teal = '\x1b[36m';
const red = '\x1b[31m';
const green = '\x1b[32m';
const reset = '\x1b[0m';
const prompt = require('prompt-sync')({sigint: true});
const first_names = ['Sya', 'Feri', 'Pyell', 'Augus', 'Shex', 'Killian', 'Jali', 'Atton', 'Carth','Meetra'];
const last_names = ['Tane', 'Bibble', 'Harand', 'Shule', 'Zapal', 'Horne', 'Vane', 'Roolek', 'Chekkoo','Surik'];

function start_game() { 
	let intro = "Welcome to Star Wars Knights of the Old Republic \n" 
	let menu = "1. New Game \n2. Load Game \n3. Exit \n"
	console.log(intro);
	console.log(menu);
	let choice = prompt("Enter an integer to proceed:");
	if (choice == 1) {
		let character_menu = "\nCharacter Creation Options\n 1. Custom \n 2. Quick \n"
		console.log(character_menu);
		let character_choice = prompt("Enter an integer to proceed:")
		if (character_choice == 1) { 
			let character_name= prompt("Enter your character name: "); 
			console.log(`\nClass Options \n 1. Soldier \n 2. Scout \n 3. Scoundrel \n`);
			var choice_class = Number(prompt(`Enter an integer to proceed:`));
			if (choice_class == 1) {
				const Main = new PlayerCharacter(character_name,17,14,12,16,10,8);
				console.log(`\nYou are ${Main.name}, a former Republic soldier. You find yourself alone on the floor of a medical bay \nwith little recollection of how you got there.`);
				return Main;
			}
			else if (choice_class == 2) {
				const Main = new PlayerCharacter(character_name, 14, 17, 16, 10, 15, 17);
				console.log(`\nYou are ${Main.name}, a scout for an underground smuggling buisiness. You find yourself alone on the floor of a medical bay \nwith little recollection of how you got there.`);
				return Main;
			}
			else if (choice_class == 3){
				const Main = new PlayerCharacter(character_name, 12,18,14,10,17,18);
				console.log(`\nYou are ${Main.name}, a scoundrel whose only loyalty is to galactic credits. You find yourself alone on the floor of a medical bay \nwith little recollection of how you got there.`);
				return Main;
			}
			else {
			console.log(`\nInvalid Entry.`);
			return null;
		}
	}
		else if (character_choice == 2) {
			let character_name = first_names.sample() + " " + last_names.sample();
			const Main = new PlayerCharacter(character_name, 16, 12, 14, 13, 16, 8);
			console.log(`\nClass Options\n 1. Soldier \n 2. Scout \n 3. Scoundrel\n`);
			var choice_class = Number(prompt(`Enter an integer to proceed:`));
			if (choice_class == 1) {
				console.log(`\nYou are ${Main.name}, a former Republic soldier. You find yourself alone on the floor of a medical bay \nwith little recollection of how you got there.`);
				return Main;
			}
			else if (choice_class == 2) {
				console.log(`\nYou are ${Main.name}, a scout for an underground smuggling buisiness. You find yourself alone on the floor of a medical bay \nwith little recollection of how you got there.`);
				return Main;
			}
			else if (choice_class == 3) {
				console.log(`\nYou are ${Main.name}, a scoundrel whose only loyalty is to galactic credits. You find yourself alone on the floor of a medical bay \nwith little recollection of how you got there.`);
				return Main;
			}
			else {
				console.log('Error. Game exiting..');
				return null;
			}
		}
		else { 
			console.log('Error. Game exiting..');
			return null;
		}
	}

	else if (choice == 2) {
		console.log("No Saved Games");
		return null;
	}
	else if (choice == 3) {
		console.log("Exiting game..");
		return null;
	
	}
	else {
		console.log("Input Error... Exiting")
		return null;
	}
}

function fight_menu(pc) {
	console.log(`\nChoose your opponent. \n1. Darth Sion \n2. Darth Nihilus \n3. Darth Treya \n`);
	fight_choice = new Number(prompt(``));
	if (fight_choice == 1) { 
		console.log(red + '\nThe call of Korriban is strong but is it the call of the dead. It is fitting that you came here.\n'+ reset);
		const Sion = new Nonplayer_Character('Darth Sion', 16,16,16,16,10,16); 
		return Sion;
	}
	else if (fight_choice == 2){
		console.log(red + '\nI am the darkness in which all life  dies' + reset);
		const Nihilus = new Nonplayer_Character('Darth Nihilus', 15, 15, 15, 18, 12, 18);
		return Nihilus; 
	}
	else if (fight_choice == 3) {
		console.log(green + `\nAt last you have arrived.. is Malachor as you remember? You no doubt have many questions.\nI would be a poor teacher if I did not give you the answers you seek here.` + reset);
		const Treya = new Nonplayer_Character('Darth Treya', 14, 14, 19, 20, 20, 20);
		return Treya; 
	}
	else { 
		console.log('\nInput Error... Exiting');
		return null; 
	}
}

mycharacter = start_game();
if (mycharacter != null) {
enemy = fight_menu(mycharacter);
while (mycharacter.isDead == false) {
console.log(`\nPlayer HP: ${mycharacter.currentHealth} / ${mycharacter.maxHealth}\n`);
console.log(`Enemy HP: ${enemy.currentHealth} / ${enemy.maxHealth}\n`);
console.log("\nAction Menu\n1.Attack\n2.Force Crush\n3.Use a medpac(+50hp)");
action_choice = prompt('Enter an integer to proceed:');
console.log('\n');
if (action_choice == 1) {
		mycharacter.attack(enemy);
		if (enemy.isDead == false) {
			enemy.attack(mycharacter);
		}
		else {
			console.log(green +'You Win!'+reset);
			break;
		}
	}
	else if (action_choice == 2) {
		mycharacter.choke(enemy);
		if(enemy.isDead == false && enemy.resisted == true) {
			enemy.attack(mycharacter);
		}
		else {
			if (enemy.isDead == true){
				console.log(green+`You Win!`+reset);
				break;
			}
			else {
				console.log(`${enemy.name} collapses to the ground clutching their throat`);
			}
		}
	}
	else if (action_choice == 3) { 
		console.log(green+`${mycharacter.name} uses a medpac!`+reset);
		if (mycharacter.currentHealth <= 50) {
			mycharacter.currentHealth = mycharacter.currentHealth + 50;
			if (enemy.isDead == false) {
				enemy.attack(mycharacter);
			}
		}
		else {
			let maxheal = 100-mycharacter.currentHealth;
			mycharacter.currentHealth = mycharacter.currentHealth + maxheal;
			if (enemy.isDead == false) {
				enemy.attack(mycharacter);
			}
		}
	}
else {
	console.log(red + 'Invalid Input'+reset)
}
}
}
