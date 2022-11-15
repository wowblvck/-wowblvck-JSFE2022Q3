import birds from '../data/birds';
import { 
    createNode, 
    shuffle, 
    getRandomArrayElement } from '../utilites/functions';

import Sound from '../components/quiz-player';

let maxScore = 0;
export default class Quiz {

    constructor(level) {
        this.currentLevel = level;
        this.currentId = 0;
        this.currentScore = 5;
        this.items = [];

        this.selectElement = this.selectElement.bind(this);

        this.match();

        this.eventHandlers();
    }

    match = () => {
        const menu = document.querySelector('.answer-menu');
        shuffle(birds[this.getLevel()]);
        birds[this.getLevel()].forEach((elem) => {
            const item = createNode('li', 'answer-menu__item');
            const inner = createNode('span');
            inner.innerHTML = elem.name;
            item.append(inner);
            menu.append(item);
            this.items.push({ id: elem.id });
        });
        this.currentId = getRandomArrayElement(birds[this.getLevel()]).id;
        this.addAudio();
    }

    addAudio = () => {
        new Sound(this.getLevel(), this.getElementById());
    }

    eventHandlers = () => {
        const listItem = document.querySelectorAll('.answer-menu__item');
    
        listItem.forEach((e, i) => {
            e.addEventListener('click', (elem) => this.selectElement(elem, i), { once: true });
        });
    }

    selectElement = (e, i) => {
        const answerItem = e.currentTarget;
        const answerContent = document.querySelector('.answer-content');
        if (i == 0) {
            answerContent.style.borderTopLeftRadius = '0';
        } else if (i == this.items.length - 1) {
            answerContent.style.borderBottomLeftRadius = '0';
        }
        if((this.items[i].id == this.currentId)) {
            if(this.currentScore < 1) this.currentScore = 0;
            maxScore += this.currentScore;
            const scoreCount = document.querySelector('.score-quiz__count');
            scoreCount.innerHTML = maxScore;
            answerItem.classList.add('answer-menu__item_success');
            answerContent.classList.add('answer-content_success');
            // const listItem = document.querySelectorAll('.answer-menu__item');
            // listItem.forEach((e) => {
            //     e.removeEventListener('click', this.selectElementHandler);
            // })
            // const answerMenu = document.querySelector('.answer-menu');
            // const newAnswerMenu = answerMenu.cloneNode(true);
            // answerMenu.parentNode.replaceChild(newAnswerMenu, answerMenu);
        } else {
            this.currentScore -= 1;
            answerItem.classList.add('answer-menu__item_wrong');
            answerContent.classList.add('answer-content_wrong');
        }
    }

    getElementById = () => this.currentId;

    getLevel = () => this.currentLevel;
}