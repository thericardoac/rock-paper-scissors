"use strict"

// *************************** GLOBAL VARIABLES **********************************
let round = 0;
let pcScore = 0;
let playerScore = 0;
const SCORE_LIMIT = 5; // Defines here the points a player needs to win the match.

//Creates an object with the body of the document.
const pageBody = document.querySelector("body");
const sectionGameBoard = document.querySelector("#game-board");

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

// Receives Player and PC choices. Determines the round winner
function declareRoundWinner(pcChoice, playerChoice) {        
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
    
    // Checks if there is a tag displaying the round number.
    // If not, Creates a round-summary div and inserts a span with round title.
    let roundTitleCount = sectionGameBoard.querySelectorAll("#round-title").length;    
    let roundTitle;
    
    if (roundTitleCount == 0) {
        let divMatchScore = document.querySelector("#match-score");

        let roundSummary = document.createElement("div");
        roundSummary.id = "round-summary";
        divMatchScore.after(roundSummary);

        roundTitle = document.createElement("span");
        roundTitle.id = "round-title";
        roundTitle.className = "funny-font round-description";        
        roundSummary.appendChild(roundTitle);
    }

    //Updates round title.
    roundTitle = document.querySelector("#round-title");
    roundTitle.textContent = "Round #" + round + " result";
}

// Renders the result of the round on the web page.
function displayRoundResult(pcChoice, playerChoice, roundWinner) {
    let resultText;

    if (roundWinner == "player") {
        resultText = "YOU scored a point! " + playerChoice + " beats " + pcChoice + ".";

    } else if (roundWinner == "pc") {
        resultText = "A.I. scored a point! " + pcChoice + " beats " + playerChoice + ".";

    } else {
        resultText = "It's a TIE! Both YOU and the A.I. drew " + playerChoice + ".";
    }

    // Checks if there are is a tag displaying the round result.    
    // If not, creates it inside round-summary div.
    let roundResultCount = document.querySelectorAll("#round-result").length;
    let roundResult;
    
    if (roundResultCount == 0) {
        let roundSummary = document.querySelector("#round-summary");
        roundResult = document.createElement("span");
        roundResult.id = "round-result";
        roundResult.className = "funny-font round-description";        
        roundSummary.appendChild(roundResult);
    }

    //Updates round result.    
    roundResult = document.querySelector("#round-result");
    roundResult.textContent = resultText;    
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
function declareMatchWinner() {
    // Checks if player or PC have reached the score limit.
    if (playerScore == SCORE_LIMIT || pcScore == SCORE_LIMIT) {
        let scoreTag = document.querySelector("#match-score");
        let winner;        

        // Declares the match winner
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
            askToPlayAgain();
        });
    }
}

// Plays a round of the game.
function playRound() {            
    displayRoundNumber();      
    let pcChoice = getComputerChoice();
    let roundWinner = declareRoundWinner(pcChoice, "rock");        
    displayRoundResult(pcChoice, "rock", roundWinner);        
    // displayScore();
    // declareMatchWinner();  
}

// Resets the round number, the scores and clears the web page.
function askToPlayAgain() {
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
    playRound();
});

// // PAPER BUTTON.
// btnPaper.addEventListener('click', function(){
//     //If the score limit is reached, asks to play again.
//     if (playerScore == SCORE_LIMIT || pcScore == SCORE_LIMIT) {                
//         playAgain();

//     } else {
        
//         displayRoundNumber();
//         let pcChoice = getComputerChoice();
//         let roundWinner = playRound(pcChoice, "paper");    
//         displayRoundResult(pcChoice, "paper", roundWinner);
//         displayScore();
//         declareWinner();
//     }
// });

// // SCISSORS BUTTON
// btnScissors.addEventListener('click', function(){
//     //If the score limit is reached, asks to play again.
//     if (playerScore == SCORE_LIMIT || pcScore == SCORE_LIMIT) {                
//         playAgain();

//     } else {        
//         displayRoundNumber();
//         let pcChoice = getComputerChoice();
//         let roundWinner = playRound(pcChoice, "scissors");    
//         displayRoundResult(pcChoice, "scissors", roundWinner);
//         displayScore();
//         declareWinner();
//     }
// });