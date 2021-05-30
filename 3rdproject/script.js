const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const timestamp2 = document.getElementById('timestamp2');

const togglevideostatus = () => {
    if(video.paused) {
        video.play();
    }  else {
        video.pause();
    }
}

const updateplayicon = () => {
    if(video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'; 
    }  else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }    
}

const updateprogress = () => {
    progress.value = (video.currentTime / video.duration) * 100;  
    
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10){
        mins = '0' + String(mins);
    }
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10){
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;

    let mins2 = Math.floor(video.duration / 60);
    if (mins2 < 10){
        mins2 = '0' + String(mins2);
    }
    let secs2 = Math.floor(video.duration % 60);
    if (secs2 < 10){
        secs2 = '0' + String(secs2);
    }

    timestamp2.innerHTML = `${mins2}:${secs2}`;
}

const stopvideo = () => {
    video.currentTime = 0;
    video.pause();
}


const setvideoprogress = () => {
    video.currentTime = (+progress.value * video.duration) / 100;   
}

video.addEventListener('click', togglevideostatus);
video.addEventListener('play', updateplayicon);
video.addEventListener('pause', updateplayicon);
video.addEventListener('timeupdate', updateprogress);

play.addEventListener('click', togglevideostatus);

stop.addEventListener('click', stopvideo);

progress.addEventListener('change', setvideoprogress);