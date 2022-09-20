"use strict"

function getComputerChoice() {
    //Generates a random number between 1 and 3. 1=Rock, 2=Paper, 3=Scissors
    let weaponNumber = Math.floor(Math.random() * 3 + 1);
    let weapon;

    switch (weaponNumber) {
        case 1:
            weapon = "rock";
            break;

        case 2:
            weapon = "paper";
            break;

        case 3:
            weapon = "scissors";            
    }

    return weapon;
}


function getPlayerChoice() {
    let weapon;
    let isValidWeapon = false;

    do {
        weapon = prompt("Rock, Paper, Scissors game!\nType your weapon to play: \n\n 1. Rock\n 2. Paper\n 3. Scissors\n");
        weapon = weapon.toLowerCase();

        if (weapon == "rock") {
            isValidWeapon = true;

        } else if (weapon == "paper") {
            isValidWeapon = true;

        } else if (weapon == "scissors") {
            isValidWeapon = true;

        } else {
            alert("Please, type a correct weapon from the list!");
        }
        
    } while (!isValidWeapon);
    
    return weapon
}


function playRound(pcChoice, playerChoice) {
    if ((playerChoice == "rock" && pcChoice == "scissors") || 
        (playerChoice == "paper" && pcChoice == "rock") ||
        (playerChoice == "scissors" && pcChoice == "paper")) {
        
        return ("You Won!! -- You: " + playerChoice + ", beat IA: " + pcChoice + ".");

    } else if ((playerChoice == "rock" && pcChoice == "paper") || 
        (playerChoice == "paper" && pcChoice == "scissors") || 
        (playerChoice == "scissors" && pcChoice == "rock")) {
        
        return ("You Lost!! -- IA: " + pcChoice + ", beats You: " + playerChoice + ".");

    } else {

        return ("It's a Tie!! - IA: " + pcChoice + ", You: " + playerChoice + ".");
    }
}


console.log(playRound(getComputerChoice(), getPlayerChoice()));