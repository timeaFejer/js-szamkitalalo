//a változónév elé írhatunk $ jelet, ezzel is jelezve, hogy ez egy dokumentum csomópont, de ez nem kötelező
let guessListContainer = document.querySelector('.js-guess-container');  
let currentGuessField = document.querySelector('.js-guess-field');
let newGameButton = document.querySelector('.js-new-game-button');
let guessSubmitButton = document.querySelector('.js-submit-guess');

// Amíg kezdők vagyunk, valahogy kommunikálniuk kell egymással a fgv-eknek, ezért globális változót fogunk használni.
let target;
let gameOver = false;
let guessList = [];

const guessResults = {
    KISEBB: 'kisebb',
    NAGYOBB: 'nagyobb',
    HELYES: 'talált'
}

function generateTarget() {
    return Math.floor(Math.random() * 100 ) + 1;
}

function resetGame() {
    // korábbi tippek törlése
    guessList = [];
    renderGuessList();
    // input mező tartalmának törlése
    currentGuessField.value = "";
    // engedünk tippelni
    gameOver = false;
}

function startGame() {
    resetGame();
    target = generateTarget();
}

function addGuess(guessValue, result) {
    guessList.unshift({guessValue, result});
}

function compareGuessToTarget(guess) {
    if (guess < target) {
        addGuess(guess, guessResults.NAGYOBB);
    } else if ( guess> target) {
        addGuess(guess, guessResults.KISEBB);
    } else {
        addGuess(guess, guessResults.HELYES);
        gameOver = true;
    }
    renderGuessList();
}

function submitGuess(event) {
    event.preventDefault();
    if (!gameOver) {
        let guessValue = Number.parseInt(currentGuessField.value);
        if (validateGuess()) {
            compareGuessToTarget(guessValue);
        } 
    }
}

function addGuessValidation() {
    currentGuessField.classList.add("is-invalid");
}

function removeGuessValidation() {
    currentGuessField.classList.remove("is-invalid");
}

function validateGuess() {
    let guessValue = Number.parseInt(currentGuessField.value);
    currentGuessField.value = guessValue;
    if ( Number.isNaN(guessValue) || guessValue < 1 || guessValue > 100) {
        addGuessValidation();
        return false;
    }
    removeGuessValidation();
    return true;
}

function renderGuessList() {
    let html = "";
    let guessType, guessText;

    for (let {guessValue, result} of guessList) {
        if (result === guessResults.KISEBB) {
            guessType = 'warning';
            guessText = "A keresett szám kisebb.";
        } else if (result === guessResults.NAGYOBB) {
            guessType = 'primary';
            guessText = "A keresett szám nagyobb.";
        } else {
            guessType = 'success';
            guessText = `Gratulálok, eltaláltad! Tippek száma: ${guessList.length}`;
        }
        html += `
            <div class="row">
                <div class="col col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 alert alert-${guessType}" role="alert">
                    ${guessValue} - ${guessText}
                </div>
            </div>
        `;
    }

    guessListContainer.innerHTML = html;
}

startGame();
newGameButton.addEventListener('click', startGame);
guessSubmitButton.addEventListener('click', submitGuess);
currentGuessField.addEventListener('focus', removeGuessValidation);
currentGuessField.addEventListener('change', validateGuess);