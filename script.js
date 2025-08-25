'use strict';
//--------------------------------------------------------------
// Selecting elements ------------------------------------------
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//------------------------
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//------------------------
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//------------------------
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let playing = true;
const scores =[0,0];
let currentScore = 0;
let activePlayer = 0;

//--------------------------------------------------------------
// Selecting Functions -----------------------------------------
const swithPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent=0
     currentScore=0;
     activePlayer=activePlayer===0?1:0;
    player1El.classList.toggle('player--active');
    player0El.classList.toggle("player--active");
}
//------------------------
const newGame = function(){
     playing = true;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    document.querySelector(`#name--${activePlayer}`).textContent=`player${activePlayer}`;
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currentScore = 0;
    scores[activePlayer]=0;
    document.getElementById(`score--${activePlayer}`).textContent=
    scores[0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    scores =[0,0];
    activePlayer = 0;
    diceEl.classList.add('hidden');
}

////////////////////////////////////////////////////////////////
///////////////////////// Logic Start //////////////////////////

//--------------------------------------------------------------
// SetUp Rolliing Function -------------------------------------
btnRoll.addEventListener('click',function () {
   // 1. Generating a random dice roll
   if (playing) {
   const dice = Math.trunc(Math.random() * 6) + 1;
   
   // 2. display dice according to the roll number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

   // 3. Check for rolled = 1: if ture,switch th next player
   if (dice !== 1) {
    currentScore +=dice;
    document.getElementById(`current--${activePlayer}`).textContent=currentScore
   } else{
     swithPlayer();
   }}
}); 
//--------------------------------------------------------------
// SetUp Holding Function --------------------------------------
btnHold.addEventListener('click',function () {
    if (playing) {
    // 1.Add current score to active player's score
    scores[activePlayer]+=currentScore;
    document.getElementById(`score--${activePlayer}`).textContent=
    scores[activePlayer];

    // 2.Check if player's score is >= 100 & make player win
    if (scores[activePlayer] >= 100){
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        document.querySelector(`#name--${activePlayer}`).textContent=`player${activePlayer}
        Winns 🏆`
        diceEl.classList.add('hidden');

    }else{
    //3. Swith to next player
    swithPlayer();
    }
   } 
});
//--------------------------------------------------------------
// SetUp NewGame Function --------------------------------------
btnNew.addEventListener('click',newGame);