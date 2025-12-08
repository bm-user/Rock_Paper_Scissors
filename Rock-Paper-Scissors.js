
const score = JSON.parse(localStorage.getItem(`score`)) || {
    wins : 0,
    losses : 0,
    ties : 0
};
/*if(!score) {
score = {
    wins : 0,
    losses : 0,
    ties : 0
};
}*/

updateScoreElements();

document.querySelector('js-rock-button').addEventListener('click', ()=>{
    playGame('Rock');
    });

document.querySelector('js-paper-button').addEventListener('click', ()=>{
    playGame('Paper');
    });

document.querySelector('js-scissors-button').addEventListener('click', ()=>{
    playGame('Scissors');
    });

document.body.addEventListener('keydown', (event)=>{
    if(event.key === 'r')
        playGame('Rock');
    else if(event.key === 'p')
        playGame('Paper');
    else if(event.key === 's')
        playGame('Scissors');
    });

function playGame(playerMove){
    const computerMove = pickComputerMove();
    let result = '';
    if(playerMove === 'Rock'){

        if(computerMove === 'Rock'){
        result = 'Tie';
        } else if (computerMove === 'Paper'){
        result = 'You lose';
        } else if(computerMove === 'Scissors'){
        result = 'You Win.'
        }

    }
    else if(playerMove === 'Scissors'){
        if(computerMove === 'Scissors'){
        result = 'Tie';
        } else if (computerMove === 'Rock'){
        result = 'You lose';
        } else if(computerMove === 'Paper'){
        result = 'You Win.'
        }

    }
    else if(playerMove === 'Paper'){
        if(computerMove === 'Paper'){
        result = 'Tie';
        } else if (computerMove === 'Scissors'){
        result = 'You lose';
        } else if(computerMove === 'Rock'){
        result = 'You Win.'
        }
    }

    if(result === 'You Win.'){
        score.wins += 1;
    } else if ( result === 'You lose'){
        score.losses += 1;
    }else if( result === 'Tie'){
        score.ties += 1;
    }

    localStorage.setItem(`score`, JSON.stringify(score));

    updateScoreElements();

    document.querySelector('.js-result').innerHTML = result;


    document.querySelector('.js-moves').innerHTML = `You <img src = "images/${playerMove}.png" class = "move-icon">
    <img src = "images/${computerMove}.png" class = "move-icon"> Computer `;

    //alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
    //Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}

function updateScoreElements(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){
    let computerMove = '';
    const randomNumber = Math.random();
    if(randomNumber >=0 && randomNumber <1/3){
        computerMove = 'Rock'
    }
    else if( randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'Paper'
    }
    else if( randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'Scissors'
    }

    return computerMove;
}  

let isAutoPlaying = false;
let intervalId = 0;

function autoPlay(){
    if(!isAutoPlaying)
    {
        intervalId = setInterval(()=>{
        const playerMove = pickComputerMove();
        playGame(playerMove);
        }, 1000);

        isAutoPlaying =true;
    }
    else{
        clearInterval(intervalId);
        isAutoPlaying =false
    }
   

}