"use strict"

// *************************** GLOBAL VARIABLES DECLARATIONS **********************************
let round = 0;
let pcScore = 0;
let playerScore = 0;
const SCORE_LIMIT = 8; // Defines here the points a player needs to win the match.

// Game buttons declarations.
const btnRock = document.querySelector("#rock-btn");
const btnPaper = document.querySelector("#paper-btn");
const btnScissors = document.querySelector("#scissors-btn");

// Max Score span tag
const spanMaxScore = document.querySelector("#max-score");
spanMaxScore.textContent = SCORE_LIMIT;



// ********************************** FUNCTION DECLARATIONS ***********************************
// Randomly chooses and returns the A.I. weapon of choice.
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

// Displays placeholders below the weapon buttons to show the player's and A.I's choices.
function displayChoicePlaceHolders(pcChoice, playerChoice) {
    let rockPlaceHolder, paperPlaceHolder, scissorsPlaceHolder;
    let placeHolderToUse;

    rockPlaceHolder = document.querySelector("#rock-placeholder");
    paperPlaceHolder = document.querySelector("#paper-placeholder");
    scissorsPlaceHolder = document.querySelector("#scissors-placeholder");

    rockPlaceHolder.textContent = "hidden";
    rockPlaceHolder.classList.add("hidden");
    rockPlaceHolder.classList.remove("player-color", "ai-color");

    paperPlaceHolder.textContent = "hidden";
    paperPlaceHolder.classList.add("hidden");
    paperPlaceHolder.classList.remove("player-color", "ai-color");

    scissorsPlaceHolder.textContent = "hidden";
    scissorsPlaceHolder.classList.add("hidden");
    scissorsPlaceHolder.classList.remove("player-color", "ai-color");
    
    // Writes to the selected weapon placeholder, who chose which weapon.
    function writeToPlaceHolder(choice, whoChose) {
        switch (choice) {
            case "rock":
                placeHolderToUse = rockPlaceHolder;
                break;
    
            case "paper":
                placeHolderToUse = paperPlaceHolder;
                break;
            
            case "scissors":
                placeHolderToUse = scissorsPlaceHolder;
        }

        placeHolderToUse.textContent = whoChose;
        placeHolderToUse.classList.remove("hidden");
    }

    // Colors green the weapon placeholder chosen by the user and red by the A.I.
    function colorPlaceHolder() {
        let placeHolders = document.querySelectorAll(".placeholder");

        placeHolders.forEach(placeHolder => {
            if (placeHolder.textContent === "YOU") {
                placeHolder.classList.add("player-color");

            } else if (placeHolder.textContent === "A.I.") {
                placeHolder.classList.add("ai-color");

            } else {
                placeHolder.classList.remove("player-color", "ai-color");
            }
        });
    }

    // Writes first the player selection.
    writeToPlaceHolder(playerChoice, "YOU");
    colorPlaceHolder();
    
    // Edits the placeholder if player and A.I chose the same.
    if (pcChoice == playerChoice) {
        let playerAndPC = placeHolderToUse.textContent + " & A.I.";
        writeToPlaceHolder(pcChoice, playerAndPC);
        colorPlaceHolder();

    } else {
        writeToPlaceHolder(pcChoice, "A.I.");
        colorPlaceHolder();
    }
}

// Receives Player and PC choices. Increases the scores and determines the round winner.
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

// Writes the round number on the web page.
function displayRoundNumber() {
    round += 1;
    
    // Checks if there is a tag displaying the round number.
    // If not, Creates a round-summary div and inserts a span with round title.
    let roundTitleCount = document.querySelectorAll("#round-title").length;    
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
    roundTitle.textContent = "Round #" + round;
}

// Writes the result of the round on the web page.
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

// Writes match scores on the web page.
function displayScore() {
    let playerScoreTag = document.querySelector("#player-score");
    let pcScoreTag = document.querySelector("#ai-score");

    playerScoreTag.textContent = playerScore;
    pcScoreTag.textContent = pcScore;
}

// Writes the match winner on the page and calls the askToPlayAgain function.
function declareMatchWinner() {
    // Checks if player or PC have reached the score limit.
    if (playerScore == SCORE_LIMIT || pcScore == SCORE_LIMIT) {
        let matchWinner;
        
        // Declares the match winner
        if (playerScore == SCORE_LIMIT) {
            matchWinner = "YOU";            

        } else {
            matchWinner = "A.I.";                        
        }
        
        let roundSummary = document.querySelector("#round-summary");
        let matchResult = document.createElement("span");
        matchResult.id = "match-result";
        matchResult.className = "funny-font round-description";        
        roundSummary.appendChild(matchResult);

        matchResult.textContent = "The match is over. " + matchWinner + " won the match!";

        // Color green the match result text if the player wins the match, red if A.I. does.
        if (matchWinner == "YOU") {
            matchResult.classList.add("player-color");
        } else {
            matchResult.classList.add("ai-color");
        }

        askToPlayAgain();
    }
}

// Plays a round of the game. Call all the necessary functions.
function playRound(playerChoice) {            
    displayRoundNumber();      
    let pcChoice = getComputerChoice();
    displayChoicePlaceHolders(pcChoice, playerChoice);
    let roundWinner = declareRoundWinner(pcChoice, playerChoice);        
    displayRoundResult(pcChoice, playerChoice, roundWinner);        
    displayScore();
    declareMatchWinner();
}

// Hides the weapon numbers, adds a play again button, and change the instructions text.
function askToPlayAgain() {
    let weaponBtns = document.querySelectorAll(".weapon");

    weaponBtns.forEach(WeaponBtn => {
        WeaponBtn.style.display = "none";
    });

    let buttonRow = document.querySelector("#button-row");
    let btnPlayAgain = document.createElement("button");
    btnPlayAgain.id = "play-again-btn";
    btnPlayAgain.className = "btn btn-play-again material-symbols-outlined";
    btnPlayAgain.textContent = "replay";
    buttonRow.appendChild(btnPlayAgain);

    // Starts to play a new match.
    btnPlayAgain.addEventListener("click", function() {
        playAgain();
    });

    let instructions = document.querySelector("#instructions");
    instructions.textContent = "Play again?";
}

// Resets the round number and scores, deletes the round summary and playAgain button.
// Shows the weapon buttons, deletes the placeholders content,
// and change the instructions text content.
function playAgain() {
    round = 0;
    pcScore = 0;
    playerScore = 0;

    displayScore();

    let roundSummary = document.querySelector("#round-summary");
    roundSummary.remove();

    let btnPlayAgain = document.querySelector("#play-again-btn");
    btnPlayAgain.remove();

    let weaponBtns = document.querySelectorAll(".weapon");
    weaponBtns.forEach(WeaponBtn => {
        WeaponBtn.style.display = "flex";
    });

    let placeHolders = document.querySelectorAll(".placeholder");
    placeHolders.forEach(placeHolder => {
        placeHolder.textContent = "";
    });

    let instructions = document.querySelector("#instructions");
    instructions.textContent = "Choose your weapon";
}



// ****************************** GAME UI BUTTONS *************************************
// ROCK BUTTON.
btnRock.addEventListener('click', function(){
    playRound("rock");
});

// PAPER BUTTON.
btnPaper.addEventListener('click', function(){
    playRound("paper");
});

// SCISSORS BUTTON
btnScissors.addEventListener('click', function(){
    playRound("scissors");
});