/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/







var scores, roundScore, activePlayer, prevRoll1, prevRoll2, gamePlaying;

init();


// document.querySelector('#current-' + activePlayer).textContent = dice;

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';


// var x = document.querySelector('#score-' + activePlayer).textContent;
// console.log(x);


document.querySelector('.btn-roll').addEventListener('click', function() {

    if(gamePlaying) {
        //1.Generate dice random no
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2.Display the result
        var dice1DOM = document.querySelector('.dice-1');
        var dice2DOM = document.querySelector('.dice-2');

        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';

        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + dice2 + '.png';

        //3.update the round score is the rolled number is not a 1
        if(prevRoll1 === 6 && dice1 === 6 && prevRoll2 === 6 && dice2 === 6) {
            //Player looses score
            scores[activePlayer] = 0;

            document.querySelector('#score-' + activePlayer).textContent = '0';

            nextPlayer();

        } else if(dice1 !== 1 && dice2 !== 1) {
            //Add Score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            prevRoll1 = dice1;
            prevRoll2 = dice2;
        } else {
            //Next Player
            nextPlayer();
        }


    }

    
});

document.querySelector('.btn-hold').addEventListener('click', function() {


    if(gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;


        //Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.finalScore').value;
        var winningScore;

        //undefined, 0, null, '' are coerced tof false
        //anything else is coerced to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //Check if player WON
        if(scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else nextPlayer();
    }

      

});

function nextPlayer()
{
    document.querySelector('#current-' + activePlayer).textContent = 0;

    activePlayer = (activePlayer === 0) ? 1 : 0;

    roundScore = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.dice-1').style.display = 'none';
    // document.querySelector('.dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    prevRoll1 = 0;
    prevRoll2 = 0;

    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
