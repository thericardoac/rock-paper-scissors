"use strict"

// *************************** GLOBAL VARIABLES **********************************
let round = 0;
let pcScore = 0;
let playerScore = 0;
const SCORE_LIMIT = 5; //Define here the points a player needs to win the match.
//const MAX_ROUNDS = 5; //Define here how many rounds you want to play. Used by game() function.

//Creates an object based on the body of the document.
const pageBody = document.querySelector("body");


// ************************* FUNCTION DECLARATIONS ********************************
// Randomly generates the PC weapon of choice.
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


// Gets player weapon of choice. Console implementation only.
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


// Plays a round of the game, receives Player and PC choices.
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


// Plays the game and declares a winner. Console implementation only.
function game(){
    //Plays n rounds of the game, shows the current score.
    for(round = 1; round <= MAX_ROUNDS; round++){        
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


// Renders the round number on the web page.
function displayRoundNumber() {
    round += 1;
    
    // Checks if there are is a tag displaying the round number.
    // If not, displays the tag. If there is, updates the text.
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


// Renders the result of the round on the web page.
function displayRoundResult(pcChoice, playerChoice, roundWinner) {
    //Updates the round result text based on the result
    let resultText = "Round Result: ";

    if (roundWinner == "player") {
        resultText += "PLAYER scores! | Player (" + playerChoice + ") beats PC (" + pcChoice + ").";

    } else if (roundWinner == "pc") {
        resultText += "PC scores! | PC (" + pcChoice + ") beats Player (" + playerChoice + ").";

    } else {
        resultText += "It's a TIE! | Player (" + playerChoice + ") draws the same as PC (" + pcChoice + ").";
    }   
    
    // Checks if there are is a tag displaying the round result.
    // If not, displays the tag. If there is, updates the text.
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


// Renders the current match score on the web page.
function displayScore() {
    let scoreText = "Match Score - PLAYER: " + playerScore + " - VS - PC: " + pcScore;
    
    // Checks if there are is a tag displaying the score.
    // If not, displays the tag. If there is, updates the text.
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


// Renders the winner text on the page and adds a play again button.
function declareWinner() {
    // Checks if player or PC have reached the score limit.
    if (playerScore == SCORE_LIMIT || pcScore == SCORE_LIMIT) {
        let scoreTag = document.querySelector("#match-score");
        let winner;        

        // Declares the winner
        if (playerScore == SCORE_LIMIT) {
            winner = "Player";            

        } else {
            winner = "PC";                        
        }        

        // Updates the score tag with the result of the match and the final score.
        scoreTag.textContent = "The " + winner + " wins the match! - FINAL SCORE: PLAYER: " +
        playerScore + " - VS - PC: " + pcScore;

        // Adds a play again button
        const btnPlayAgain = document.createElement("button");
        btnPlayAgain.id = "btn-play-again";
        btnPlayAgain.textContent = "Play Again!";
        pageBody.appendChild(btnPlayAgain);

        btnPlayAgain.addEventListener("click", function(){
            playAgain();
        });
    }
}

// Resets the round number, the scores and clears the web page.
function playAgain() {
    if (confirm("Do you want to play again?")) {
        round = 0;
        playerScore = 0;
        pcScore = 0;

        let roundTag = document.querySelector("#round-title");
        let roundResultTag = document.querySelector("#round-result");
        let scoreTag = document.querySelector("#match-score");
        const btnPlayAgain = document.querySelector("#btn-play-again"); 

        roundTag.remove();
        roundResultTag.remove();
        scoreTag.remove();
        btnPlayAgain.remove();
    }    
}



// *************************** RUNTIME STARTS HERE ************************************
//Starts the match - Use only with Console implementation.
//game();

// Adds game buttons.
const btnRock = document.querySelector("#rock-btn");
const btnPaper = document.querySelector("#paper-btn");
const btnScissors = document.querySelector("#scissors-btn");

// Rock button.
btnRock.addEventListener('click', function(){
    //If the score limit is reached, asks to play again.
    if (playerScore == SCORE_LIMIT || pcScore == SCORE_LIMIT) {        
        // play again
        playAgain();

    } else {
        // Displays the round number on the page.
        displayRoundNumber();

        // Saves the computer weapon of choice.
        let pcChoice = getComputerChoice();
        
        // Plays the round using computer and player choices.
        let roundWinner = playRound(pcChoice, "rock");    

        // Displays result of the round on the web page.
        displayRoundResult(pcChoice, "rock", roundWinner);

        // Displays the score of the match on the web page.
        displayScore();

        // Declares the winner and in case the match is over, calls the playAgain() function.
        declareWinner();
    }    
});

// Paper button.
btnPaper.addEventListener('click', function(){
    //If the score limit is reached, asks to play again.
    if (playerScore == SCORE_LIMIT || pcScore == SCORE_LIMIT) {        
        // play again
        playAgain();

    } else {
        // Displays the round number on the page.
        displayRoundNumber();

        // Saves the computer weapon of choice.
        let pcChoice = getComputerChoice();
        
        // Plays the round using computer and player choices.
        let roundWinner = playRound(pcChoice, "paper");    

        // Displays result of the round on the web page.
        displayRoundResult(pcChoice, "paper", roundWinner);

        // Displays the score of the match on the web page.
        displayScore();

        // Declares the winner and in case the match is over, calls the playAgain() function.
        declareWinner();
    }
});

// Scissors button
btnScissors.addEventListener('click', function(){
    //If the score limit is reached, asks to play again.
    if (playerScore == SCORE_LIMIT || pcScore == SCORE_LIMIT) {        
        // play again
        playAgain();

    } else {
        // Displays the round number on the page.
        displayRoundNumber();

        // Saves the computer weapon of choice.
        let pcChoice = getComputerChoice();
        
        // Plays the round using computer and player choices.
        let roundWinner = playRound(pcChoice, "scissors");    

        // Displays result of the round on the web page.
        displayRoundResult(pcChoice, "scissors", roundWinner);

        // Displays the score of the match on the web page.
        displayScore();

        // Declares the winner and in case the match is over, calls the playAgain() function.
        declareWinner();
    }
});