//a változónév elé írhatunk $ jelet, ezzel is jelezve, hogy ez egy dokumentum csomópont, de ez nem kötelező
let guessListContainer = document.querySelector('.js-guess-container');  
let currentGuessField = document.querySelector('.js-guess-field');
let newGameButton = document.querySelector('.js-new-game-button');

// Amíg kezdők vagyunk, valahogy kommunikálniuk kell egymással a fgv-eknek, ezért globális változót fogunk használni.
let target;

function generateTarget() {
    return Math.floor(Math.random() * 100 ) + 1;
}

function resetGame() {
    // korábbi tippek törlése
    guessListContainer.innerHTML = "";
    // input mező tartalmának törlése
    currentGuessField.value = "";
}

function startGame() {
    resetGame();
    target = generateTarget();
}

startGame();
newGameButton.addEventListener('click', startGame);

