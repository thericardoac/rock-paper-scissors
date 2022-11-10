"use strict"

// *************************** GLOBAL VARIABLES **********************************
let round = 0;
let pcScore = 0;
let playerScore = 0;
const SCORE_LIMIT = 5; // Defines here the points a player needs to win the match.

//Creates an object with the body of the document.
const pageBody = document.querySelector("body");

// Adds game buttons.
const btnRock = document.querySelector("#rock-btn");
const btnPaper = document.querySelector("#paper-btn");
const btnScissors = document.querySelector("#scissors-btn");


// ************************* FUNCTION DECLARATIONS ********************************
// Randomly generates the AI weapon of choice.
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

// Plays a round of the game, receives Player and PC choices.
function playRound(pcChoice, playerChoice) {    
    //Determines the round winner
    if ((playerChoice == "rock" && pcChoice == "scissors") || 
        (playerChoice == "paper" && pcChoice == "rock") ||
        (playerChoice == "scissors" && pcChoice == "paper")) {

        playerScore += 1;                
        return "player";

    } else if ((playerChoice == "rock" && pcChoice == "paper") || 
        (playerChoice == "paper" && pcChoice == "scissors") || 
        (playerChoice == "scissors" && pcChoice == "rock")) {

        pcScore += 1;        
        return "pc";

    } else {                
        return "tie";
    }
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

// *************************** UI BUTTONS *********************************
// ROCK BUTTON.
btnRock.addEventListener('click', function(){
    //If the score limit is reached, asks to play again.
    if (playerScore == SCORE_LIMIT || pcScore == SCORE_LIMIT) {                
        playAgain();

    } else {        
        displayRoundNumber();        
        let pcChoice = getComputerChoice();
        let roundWinner = playRound(pcChoice, "rock");        
        displayRoundResult(pcChoice, "rock", roundWinner);        
        displayScore();
        declareWinner();
    }    
});

// ROCK BUTTON.
btnPaper.addEventListener('click', function(){
    //If the score limit is reached, asks to play again.
    if (playerScore == SCORE_LIMIT || pcScore == SCORE_LIMIT) {                
        playAgain();

    } else {
        
        displayRoundNumber();
        let pcChoice = getComputerChoice();
        let roundWinner = playRound(pcChoice, "paper");    
        displayRoundResult(pcChoice, "paper", roundWinner);
        displayScore();
        declareWinner();
    }
});

// SCISSORS BUTTON
btnScissors.addEventListener('click', function(){
    //If the score limit is reached, asks to play again.
    if (playerScore == SCORE_LIMIT || pcScore == SCORE_LIMIT) {                
        playAgain();

    } else {        
        displayRoundNumber();
        let pcChoice = getComputerChoice();
        let roundWinner = playRound(pcChoice, "scissors");    
        displayRoundResult(pcChoice, "scissors", roundWinner);
        displayScore();
        declareWinner();
    }
});