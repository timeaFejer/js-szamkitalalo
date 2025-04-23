let guessListContainer = document.querySelector('js-guess-container');  //a változónév elé írhatunk $ jelet, ezzel is jelölve, hogy dokumentum csomópont 
let currentGuessField = document.querySelector('js-guess-field');
let newGameButton = document.querySelector('js-new-game-button');

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
newGameButton.addEventListener('click', startGame)

