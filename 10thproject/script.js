const container = document.getElementById('container');
const songtitle = document.getElementById('song-title');
const progress = document.getElementById('progress');
const progressbar = document.getElementById('progress-bar');
const albumart = document.getElementById('album-art');
const previousbtn = document.getElementById('previous');
const playbtn = document.getElementById('play');
const nextbtn = document.getElementById('next');
const audio = document.getElementById('audio');

const songs = ['Nescafe Basement - Aadat Instrumental', 'Strings - Mera Bichra Yaar', 'Vital Signs - Aitebaar'];
let songindex = 0;

loadsong(songs[songindex]);

function loadsong(songindex) {
    songtitle.innerText = songindex;
    audio.src = `Music/${songindex}.mp3`;
    albumart.src = `images/${songindex}.jpg`;
}

function playtrack() {
    container.classList.add('play');

    playbtn.innerHTML = '<i class="fas fa-pause"></i>';

    audio.play();
}

function pausetrack() {
    container.classList.remove('play');

    playbtn.innerHTML = '<i class="fas fa-play"></i>';

    audio.pause();
}

function prevsong() {
    songindex--;
    if (songindex < 0 ) {
        songindex = songs.length - 1;
    }
    loadsong(songs[songindex]); 
    playtrack();
}

function nextsong() {
    songindex++;
    if (songindex > (songs.length - 1) ) {
        songindex = 0;
    }
    loadsong(songs[songindex]); 
    playtrack();
}

playbtn.addEventListener('click', () => {
    const isplaying = container.classList.contains('play');

    if (isplaying) {
        pausetrack();
    } else {
        playtrack();
    }
})

previousbtn.addEventListener('click', prevsong)


nextbtn.addEventListener('click', nextsong)

audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;

    const progresspercentage = currentTime/duration * 100;

    progressbar.style.width = `${progresspercentage}%`; 
})

progress.addEventListener('click', (e) => {
    const clicklocation = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = clicklocation / 150 * duration;
})

audio.addEventListener('ended', nextsong);