import birds from '../data/birds';
import { getArrayElementById } from '../utilites/functions';

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
        btnPlay.addEventListener('click', (e) => this.playPause(e));

        const playerBar = document.querySelector('.player-control__bar');
        playerBar.addEventListener('input', (e) => this.changeProgressBar(e));

        this.song.addEventListener('ended', this.endPlay);
    }

    changeProgressBar = (e) => {
        this.song.currentTime = e.target.value;
        e.target.style.setProperty('--value', e.target.value);
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
        clearInterval(this.interval);
    }

    updateProgressBar = () => {
        const playerBar = document.querySelector('.player-control__bar');
        playerBar.min = 0;
        playerBar.max = this.song.duration;
        playerBar.value = this.song.currentTime;
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