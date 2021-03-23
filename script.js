'use strict';

// -- Variables

let p0Current = document.querySelector('#current--0');
let p1Current = document.querySelector('#current--1');
let score = document.querySelectorAll('.score');
const current = document.querySelectorAll('.current-score');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const player = document.querySelectorAll('.player');
const diceImg = document.querySelector('.dice');
let currentScore = 0;
let activeState = true;
let p0total = 0;
let p1total = 0;  

// -- Functions
let switchActivePlayer = function () {
    for(let i = 0; i < player.length; i++) {
        player[i].classList.toggle('player--active')
    }
}

let resetCurrentScores = function() {
    for(let i = 0; i < current.length; i++) {
        current[i].textContent = 0;
        currentScore = 0;
    }
}

let init = function () {
    currentScore = 0;
    activeState = true;
    p0total = 0;
    p1total = 0;    
    diceImg.classList.add('hidden');
    resetCurrentScores();
    
    for(let i = 0; i < score.length; i++ ) {
        score[i].textContent = 0;
    }
    
    if (player[1].classList.contains('player--active')) {
        player[0].classList.toggle('player--active');
        player[1].classList.toggle('player--active');
    }
    for(let i = 0; i < player.length; i++) {
        if(player[i].classList.contains('player--winner')) {
            player[i].classList.remove('player--winner');
        }
    }
}

init();



// -- Event Listeners



rollBtn.addEventListener('click', () => {
    if (activeState) {
        // Generate Random Number
        let roll = Math.trunc(6*Math.random()+1);
        
        // Display Dice Img
        diceImg.classList.remove('hidden');
        diceImg.src = `dice-${roll}.png`;
        
        // Check for one, switch players
        if (roll === 1) {
            switchActivePlayer();
            resetCurrentScores();
        //  Add roll to current score;
        } else {
            currentScore += roll;
            for(let i = 0; i < player.length; i++) {
                if(player[i].classList.contains('player--active')) {
                    current[i].textContent = currentScore;
                }
            }
        }
    }
});

newBtn.addEventListener('click', init);

holdBtn.addEventListener('click', function() {
    if(activeState) {
        // --Adds current score to active player total
    for(let i = 0; i < player.length; i++) {
            if(player[i].classList.contains('player--active')) {
                if(i === 0) {
                    p0total += currentScore;
                    score[0].innerHTML = p0total;
                } else {
                    p1total += currentScore;
                    score[1].innerHTML = p1total;
                }
            }
        }
        resetCurrentScores();
        // Checks for win
        if(p0total >= 100 || p1total >= 100) {
            for(let i = 0; i < player.length; i++)
            if(player[i].classList.contains('player--active')) {
                player[i].classList.add('player--winner');
                activeState = false;
                diceImg.classList.add('hidden');
            }
        } else {
            switchActivePlayer();
        }
    }
});

// --Starts game at load
init();