export default class Score {
    constructor() {
        this.getScore();
    }

    getScore = () => {
        const infoValueAll = document.querySelector('.info-value__all');
        const infoValueSuccess = document.querySelector('.info-value__success');
        const infoValueWrong = document.querySelector('.info-value__wrong');
        const infoValueBest = document.querySelector('.info-value__best');
        infoValueAll.innerHTML = JSON.parse(localStorage.getItem('All'));
        infoValueSuccess.innerHTML = JSON.parse(localStorage.getItem('Success'));
        infoValueWrong.innerHTML = JSON.parse(localStorage.getItem('Wrong'));
        infoValueBest.innerHTML = JSON.parse(localStorage.getItem('Max'));
    }
}