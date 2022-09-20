"use strict"

let pcScore = 0;
let playerScore = 0;
let round;
let totalRounds = 5; //You can define here how many rounds you want to play


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

    //Weapon remains false until player inputs a correct weapon
    do {
        weapon = prompt(("Rock, Paper, Scissors! -- Type your weapon to play: \n\n 1. Rock\n 2. Paper\n 3. Scissors\n\nRound #" + round + "\n"));
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
    
    return weapon;
}


function playRound(pcChoice, playerChoice) {
    //Determines the round winner and increases the score accordingly
    if ((playerChoice == "rock" && pcChoice == "scissors") || 
        (playerChoice == "paper" && pcChoice == "rock") ||
        (playerChoice == "scissors" && pcChoice == "paper")) {

        playerScore += 1;        
        return ("Round #" + round + ". You WON! --- You: " + playerChoice + ", beat AI: " + pcChoice + ".");

    } else if ((playerChoice == "rock" && pcChoice == "paper") || 
        (playerChoice == "paper" && pcChoice == "scissors") || 
        (playerChoice == "scissors" && pcChoice == "rock")) {

        pcScore += 1;
        return ("Round #" + round + ". You LOST! --- AI: " + pcChoice + ", beats You: " + playerChoice + ".");

    } else {        
        return ("Round #" + round + ". It's a TIE! --- You: " + playerChoice + ", equals AI: " + pcChoice + ".");
    }
}


function game(){
    //Plays n rounds of the game, shows the current score.
    for(round = 1; round <= totalRounds; round++){        
        console.log(playRound(getComputerChoice(), getPlayerChoice()));
        console.log("Current score:\nYou: " + playerScore + " --- AI: " + pcScore + "\n\n");             
    }
    
    //Defines the winner of the match.
    if (playerScore > pcScore) {
        console.log("You WON the Match, GG!!");

    } else if (pcScore > playerScore) {
        console.log("You LOST the Match. Better luck next time!");

    } else {
        console.log("The Match is a Tie. Want a rematch?");
    }
    
    console.log("FINAL score:\nYou: " + playerScore + " --- AI: " + pcScore + ".");
}

//Starts the match
game();