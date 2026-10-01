// ===============================
// Game Variables
// ===============================

let randomNumber = Math.floor(Math.random() * 100) + 1;

let previousGuesses = [];

let attempts = 0;

const maxAttempts = 10;

let gameActive = true;


// ===============================
// DOM Elements
// ===============================

const guessForm =
    document.querySelector("#guessForm");

const guessField =
    document.querySelector("#guessField");

const submitButton =
    document.querySelector("#subt");

const guessesContainer =
    document.querySelector("#guesses");

const remainingElement =
    document.querySelector("#remaining");

const message =
    document.querySelector(".lowOrHi");

const guessCount =
    document.querySelector("#guessCount");

const progress =
    document.querySelector("#progress");

const progressText =
    document.querySelector("#progressText");

const gameOver =
    document.querySelector("#gameOver");

const finalMessage =
    document.querySelector("#finalMessage");

const finalDescription =
    document.querySelector("#finalDescription");

const newGameButton =
    document.querySelector("#newGame");


// ===============================
// Submit Guess
// ===============================

guessForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        if (!gameActive) {
            return;
        }

        const guess =
            Number(guessField.value);

        validateGuess(guess);

    }
);


// ===============================
// Validate Guess
// ===============================

function validateGuess(guess) {

    if (
        guess === "" ||
        !Number.isInteger(guess)
    ) {

        showMessage(
            "Please enter a valid number.",
            "high"
        );

        return;

    }


    if (guess < 1 || guess > 100) {

        showMessage(
            "Please enter a number between 1 and 100.",
            "high"
        );

        return;

    }


    // Prevent duplicate guesses
    if (previousGuesses.includes(guess)) {

        showMessage(
            "You already guessed this number.",
            "high"
        );

        guessField.select();

        return;

    }


    processGuess(guess);

}


// ===============================
// Process Guess
// ===============================

function processGuess(guess) {

    attempts++;

    previousGuesses.push(guess);


    displayGuess(guess);

    updateGameProgress();


    if (guess === randomNumber) {

        handleWin();

        return;

    }


    if (attempts >= maxAttempts) {

        handleGameOver();

        return;

    }


    if (guess < randomNumber) {

        showMessage(
            "Too low! Try a higher number.",
            "low"
        );

    } else {

        showMessage(
            "Too high! Try a lower number.",
            "high"
        );

    }


    guessField.value = "";

    guessField.focus();

}


// ===============================
// Display Guess
// ===============================

function displayGuess(guess) {

    // Remove empty message
    const emptyMessage =
        guessesContainer.querySelector(
            ".empty-guesses"
        );

    if (emptyMessage) {
        emptyMessage.remove();
    }


    const guessElement =
        document.createElement("span");

    guessElement.classList.add(
        "guess-number"
    );

    guessElement.innerText = guess;


    guessesContainer.appendChild(
        guessElement
    );


    guessCount.innerText =
        previousGuesses.length;

}


// ===============================
// Update Progress
// ===============================

function updateGameProgress() {

    const remaining =
        maxAttempts - attempts;


    remainingElement.innerText =
        remaining;


    progressText.innerText =
        `${attempts} / ${maxAttempts}`;


    const percentage =
        (attempts / maxAttempts) * 100;


    progress.style.width =
        `${percentage}%`;

}


// ===============================
// Show Message
// ===============================

function showMessage(
    text,
    type = ""
) {

    message.innerText = text;

    message.className =
        "lowOrHi";


    if (type) {

        message.classList.add(type);

    }

}


// ===============================
// Player Wins
// ===============================

function handleWin() {

    gameActive = false;


    showMessage(
        "You found the number!",
        "success"
    );


    finalMessage.innerText =
        "You Got It! 🎉";


    finalDescription.innerText =
        `The number was ${randomNumber}. You found it in ${attempts} ${attempts === 1 ? "attempt" : "attempts"}!`;


    gameOver.classList.remove(
        "hidden"
    );


    disableGame();

}


// ===============================
// Game Over
// ===============================

function handleGameOver() {

    gameActive = false;


    showMessage(
        `Game over! The number was ${randomNumber}.`,
        "high"
    );


    finalMessage.innerText =
        "Game Over!";


    finalDescription.innerText =
        `The correct number was ${randomNumber}. Better luck next time!`;


    gameOver.classList.remove(
        "hidden"
    );


    disableGame();

}


// ===============================
// Disable Game
// ===============================

function disableGame() {

    guessField.disabled = true;

    submitButton.disabled = true;

}


// ===============================
// Start New Game
// ===============================

function startNewGame() {

    randomNumber =
        Math.floor(Math.random() * 100) + 1;


    previousGuesses = [];

    attempts = 0;

    gameActive = true;


    guessField.disabled = false;

    submitButton.disabled = false;


    guessField.value = "";

    guessField.focus();


    guessesContainer.innerHTML =
        `
        <span class="empty-guesses">
            Your guesses will appear here
        </span>
        `;


    guessCount.innerText = "0";

    remainingElement.innerText =
        maxAttempts;


    progressText.innerText =
        `0 / ${maxAttempts}`;


    progress.style.width = "0%";


    gameOver.classList.add(
        "hidden"
    );


    showMessage(
        "Make your first guess!"
    );

}


// ===============================
// New Game Button
// ===============================

newGameButton.addEventListener(
    "click",
    startNewGame
);


// ===============================
// Initial Focus
// ===============================

guessField.focus();
