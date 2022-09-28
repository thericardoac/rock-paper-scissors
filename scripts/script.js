"use strict"

let round = 0;
let pcScore = 0;
let playerScore = 0;

const pageBody = document.querySelector("body");
//let totalRounds = 5; //You can define here how many rounds you want to play. Used by game function.


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
    //Determines the round winner
    if ((playerChoice == "rock" && pcChoice == "scissors") || 
        (playerChoice == "paper" && pcChoice == "rock") ||
        (playerChoice == "scissors" && pcChoice == "paper")) {

        playerScore += 1;        
        //return ("Round #" + round + ". You WON! --- You: " + playerChoice + ", beat AI: " + pcChoice + ".");
        return "player";

    } else if ((playerChoice == "rock" && pcChoice == "paper") || 
        (playerChoice == "paper" && pcChoice == "scissors") || 
        (playerChoice == "scissors" && pcChoice == "rock")) {

        pcScore += 1;
        //return ("Round #" + round + ". You LOST! --- AI: " + pcChoice + ", beats You: " + playerChoice + ".");
        return "pc";

    } else {        
        //return ("Round #" + round + ". It's a TIE! --- You: " + playerChoice + ", equals AI: " + pcChoice + ".");
        return "tie";
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


function displayRoundNumber() {    
    round += 1;
    let roundTagCount = document.querySelectorAll("#round-title").length;    
    let roundTag;

    if (roundTagCount == 0) {
        roundTag = document.createElement("h2");
        roundTag.id = "round-title";
        roundTag.textContent = "Round #" + round;
        pageBody.appendChild(roundTag);

    } else {
        roundTag = document.querySelector("#round-title");
        roundTag.textContent = "Round #" + round;
    }
}


function displayRoundResult(pcChoice, playerChoice, roundWinner) {
    let resultText = "Round Result: ";

    if (roundWinner == "player") {
        resultText += "PLAYER wins! | Player (" + playerChoice + ") beats PC (" + pcChoice + ").";

    } else if (roundWinner == "pc") {
        resultText += "PC Wins! | PC (" + pcChoice + ") beats Player (" + playerChoice + ").";

    } else {
        resultText += "It's a TIE! | Player (" + playerChoice + ") draws the same as PC (" + pcChoice + ").";
    }    

    let resultTagCount = document.querySelectorAll("#round-result").length;
    let resultTag;
    
    if (resultTagCount == 0) {
        resultTag = document.createElement("p");
        resultTag.id = "round-result"; 
        resultTag.textContent = resultText;
        pageBody.appendChild(resultTag);

    } else {
        resultTag = document.querySelector("#round-result");
        resultTag.textContent = resultText;
    }
}


function displayScore(pcScore, playerScore) {
    let scoreText = "Match Score - PLAYER: " + playerScore + " - VS - PC: " + pcScore;
    
    let scoreTagCount = document.querySelectorAll("#match-score").length;
    let scoreTag;

    if (scoreTagCount == 0) {
        scoreTag = document.createElement("h2");
        scoreTag.id = "match-score";
        scoreTag.textContent = scoreText;
        pageBody.appendChild(scoreTag);

    } else {
        scoreTag = document.querySelector("#match-score");
        scoreTag.textContent = scoreText;
    }
}


//Starts the match - Use only with Console implementation
//game();

const btnRock = document.querySelector("#rock-btn");
const btnPaper = document.querySelector("#paper-btn");
const btnScissors = document.querySelector("#scissors-btn");

btnRock.addEventListener('click', function(){
    // Displays the round number on the page
    displayRoundNumber();

    // Saves the computer weapon of choice
    let pcChoice = getComputerChoice();
    
    // Plays the round using computer and player choices
    let roundWinner = playRound(pcChoice, "rock");    

    // Displays result of the round on the page
    displayRoundResult(pcChoice, "rock", roundWinner);

    // Displays the score of the match
    displayScore(pcScore, playerScore);
});


// btnPaper.addEventListener('click', function(){
//     console.log(playRound(getComputerChoice(), "paper"));
// });

// btnScissors.addEventListener('click', function(){
//     console.log(playRound(getComputerChoice(), "scissors"));
// });