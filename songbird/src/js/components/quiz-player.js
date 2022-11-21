import birds from '../data/birds';
import { getArrayElementById, formatTime } from '../utilites/functions';

export default class Sound {
    constructor(level, id) {
        this.level = level;
        this.id = id;
        this.isPlaying = false;
        this.song;
        this.interval;

        this.init();

        this.eventHandlers();
    }

    init = () => {
        this.song = new Audio();
        this.song.src = getArrayElementById(birds[this.level], this.id).audio;
    }

    eventHandlers = () => {
        const btnPlay = document.querySelector('.player-control__state');
        btnPlay.addEventListener('click', this.playPause);

        const playerBar = document.querySelector('.player-control__bar');
        playerBar.addEventListener('input', (e) => this.changeProgressBar(e));

        this.song.addEventListener('ended', this.endPlay);
    }
    
    changeProgressBar = (e) => {
        this.song.currentTime = e.target.value;
        e.target.style.setProperty('--value', e.target.value);
        const currentTime = document.querySelector('.player-time__current');
        currentTime.innerHTML = (formatTime(Math.floor(this.song.currentTime)));
    }

    endPlay = () => {
        this.song.pause();
        this.isPlaying = false;
        this.song.currentTime = 0;
        const btnPlay = document.querySelector('.player-control__state');
        btnPlay.classList.remove('player-control__state_pause');
        const playerBar = document.querySelector('.player-control__bar');
        playerBar.min = 0;
        playerBar.value = this.song.currentTime;
        playerBar.style.setProperty('--min', playerBar.min);
        playerBar.style.setProperty('--value', playerBar.value);
        const currentTime = document.querySelector('.player-time__current');
        currentTime.innerHTML = '0:00';
        const duration = document.querySelector('.player-time__duration');
        duration.innerHTML = '--:--';
        clearInterval(this.interval);
    }

    updateProgressBar = () => {
        const playerBar = document.querySelector('.player-control__bar');
        playerBar.min = 0;
        playerBar.max = this.song.duration;
        playerBar.value = this.song.currentTime;

        const currentTime = document.querySelector('.player-time__current');
        currentTime.innerHTML = (formatTime(Math.floor(this.song.currentTime)));

        const duration = document.querySelector('.player-time__duration');
        duration.innerHTML = (formatTime(Math.floor(this.song.duration)));
        if (duration.innerHTML === '--:--') {
            duration.innerHTML = '0:00'; 
        } else {
            duration.innerHTML = (formatTime(Math.floor(this.song.duration)));
        }

        playerBar.style.setProperty('--min', playerBar.min);
        playerBar.style.setProperty('--max', playerBar.max);
        playerBar.style.setProperty('--value', playerBar.value);
    }

    playPause = (e) => {
        const btnPlay = e.target;
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.song.play();
            this.interval = setInterval(this.updateProgressBar, 500);
        } else {
            this.isPlaying = false;
            this.song.pause();
            clearInterval(this.interval);
        }
        btnPlay.classList.toggle('player-control__state_pause');
    }
}