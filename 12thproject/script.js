const settingsbtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const difficultydropdown = document.getElementById('difficulty');
const word = document.getElementById('word');
const userword = document.getElementById('user-word');
const timecontainer = document.getElementById('time');
const scorecontainer = document.getElementById('score');
const gameover = document.getElementById('gameover');
const finalscore = document.getElementById('finalscore');
const restart = document.getElementById('restart');
const mode = document.getElementById('mode');
const instructionsbtn = document.getElementById('instructions-btn');
const instructions = document.getElementById('instructions');

let randomword;
let score = 0;
let time = 60;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

difficultydropdown.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

mode.innerText = difficulty;

function randomwordgetter() {
    fetch('https://random-words-api.vercel.app/word',{
    method : "GET",
    })
    .then(res => res.json())
    .then(data => {
        randomword = data[0].word.toLowerCase();
        word.innerText = randomword;
        });
}

randomwordgetter();

userword.focus();

function incrementscore () {
    score++;
    scorecontainer.innerText = score;
}

function Gameover() {
    clearInterval(timerinterval);
    gameover.style.display = 'flex';
    finalscore.innerText = score;
}

const timerinterval = setInterval(decrementtimer, 1000);

function decrementtimer () {
    time--;
    
    timecontainer.innerText =`${time}s`;

    if (time === 0) {
       Gameover();
    }
}

settingsbtn.addEventListener('click', () => settings.classList.toggle('show'));

userword.addEventListener('input', e => {

    const userinput = e.target.value;

    if ( userinput === randomword ) {
        
        randomwordgetter();
        
        incrementscore();

        e.target.value = '';

        if ( difficulty == 'easy' ) {
            time += 3;
        }else if( difficulty == 'medium' ) {
            time += 2;
        }else if( difficulty == 'hard' ) {
            time += 1;
        }

        timecontainer.innerText =`${time}s`;
    }
})

restart.addEventListener('click', () => {
    location.reload();
})

difficultydropdown.addEventListener('change', () => { 
    difficulty = difficultydropdown.value;

    mode.innerText = difficulty;

    localStorage.setItem('difficulty' , difficulty);

    location.reload();
})

instructionsbtn.addEventListener('click', () => {
    instructions.classList.add('show');
})

window.addEventListener('click', (e) => {
    if (e.target === instructions) {
        instructions.classList.remove('show');
    }
})