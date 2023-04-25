'use strict';

// Selection of elements
const playerOneEL = document.querySelector('.player--1');
const playerTwoEL = document.querySelector('.player--2');
const playerOneScoreEL = document.getElementById('score--1');
const playerTwoScoreEL = document.getElementById('score--2');
const playerOneCurrScoreEL = document.getElementById('current--1');
const playerTwoCurrScoreEL = document.getElementById('current--2');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRules = document.querySelector('.btn--rules');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const rulesModal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');

// Inital state
playerOneScoreEL.textContent = playerTwoScoreEL.textContent = 0; // setting the initial scores to zero for both the players
playerOneCurrScoreEL.textContent = playerTwoCurrScoreEL.textContent = 0; // setting the initial current scores to zero for both the players
diceEL.classList.add('hidden'); // Hiding the dice initially

// Each player current score
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 1;
let playingEnabled = true;

// Switching players function
const switchPlayers = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 1 ? 2 : 1;
    playerOneEL.classList.toggle('player--active');
    playerTwoEL.classList.toggle('player--active');
}

// Rolling a dice
btnRoll.addEventListener('click', () => {

    if (!playingEnabled) return alert('Start a new Game!');

    if (playingEnabled) {
        // Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display dice in the middle
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;

        // Check for rolled number -> if number is 1, switch to next player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }

        else if (dice === 1) {
            switchPlayers();
        }
    }
});


// Function for handling the scores hold
const holdScores = (player) => {
    if (!playingEnabled) return alert('Start a new Game!');

    const playerScoreEL = player === 1 ? playerOneScoreEL : playerTwoScoreEL;
    const playerEL = player === 1 ? playerOneEL : playerTwoEL;

    scores[player - 1] += currentScore;
    playerScoreEL.textContent = scores[player - 1];

    if (scores[player - 1] < 100) {
        switchPlayers();
    }

    else {
        playerEL.classList.add('player--winner');
        playingEnabled = false;
    }
}

// Holding scores
btnHold.addEventListener('click', () => {
    if (playingEnabled) {
        if (activePlayer === 1) {
            holdScores(1);
        }
        else if (activePlayer == 2) {
            holdScores(2);
        }
    }
})

// Restting the game
btnNew.addEventListener('click', () => {
    document.location.reload();
});

const toggleHidden = function () {
    rulesModal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}

// Rules Modal pop up
btnRules.addEventListener('click', toggleHidden);

// Closing pop up with close button
btnCloseModal.addEventListener('click', toggleHidden);

// closing the pop up with esc key!
document.addEventListener('keydown', function (e) {
    if (!rulesModal.classList.contains('hidden') && e.key === 'Escape') {
        toggleHidden();
    }
});



