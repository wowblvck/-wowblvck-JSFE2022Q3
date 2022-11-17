import birds from '../data/birds';
import { 
    createNode, 
    shuffle, 
    getRandomArrayElement,
    getArrayElementById } from '../utilites/functions';

import Sound from '../components/quiz-player';

import wrongSound from '../../assets/sounds/wrong.wav';
import successSound from '../../assets/sounds/success.wav';

export let maxScore = 0;
export default class Quiz {

    constructor(level) {
        this.currentLevel = level;
        this.currentId = 0;
        this.currentScore = 5;
        this.complete = false;
        this.wrongAnswers = [];
        this.wrong = new Audio(wrongSound);
        this.success = new Audio(successSound);

        this.match();

        this.eventHandlers();

        this.sound = new Sound(this.getLevel(), this.getElementById());
    }

    match = () => {
        const menu = document.querySelector('.answer-menu');
        
        //Shuffle birds in level module
        shuffle(birds[this.getLevel()]);
        birds[this.getLevel()].forEach((elem) => {
            const item = createNode('li', 'answer-menu__item');
            item.setAttribute('data-id', elem.id);
            const inner = createNode('span');
            inner.innerHTML = elem.name;
            item.append(inner);
            menu.append(item);
        });

        //Output random ID of bird
        this.currentId = getRandomArrayElement(birds[this.getLevel()]).id;
    }


    eventHandlers = () => {
        const answerMenu = document.querySelector('.answer-menu');
        answerMenu.addEventListener('click', this.selectElement);
    }

    selectElement = (e) => {

        let el = e.target;

        if (el.tagName != "UL") {
            let answerContent = document.querySelector('.answer-content');
            answerContent.replaceWith(answerContent.cloneNode(false));

            if (el.tagName == "SPAN") el = el.parentNode;

            //Fill box content depending on the chosen element
            answerContent = document.querySelector('.answer-content');

            //Get ID of selected element
            const dataId = el.getAttribute('data-id');

            //Get element information depending on the chosen element
            const element = getArrayElementById(birds[this.getLevel()], dataId);

            const answerIcon = createNode('div', 'answer-content__icon');
            answerIcon.style.backgroundImage = `url(${element.image})`;

            const answerContentTitle = createNode('p', 'answer-content__title');
            answerContentTitle.innerHTML = `${element.name}`;

            const answerContentSubtitle = createNode('p', 'answer-content__subtitle');
            answerContentSubtitle.innerHTML = `${element.species}`;

            const answerContentDescr = createNode('p', 'answer-content__description');
            answerContentDescr.innerHTML = `${element.description}`;

            answerContent.append(answerIcon, 
                                answerContentTitle,
                                answerContentSubtitle,
                                answerContentDescr);

            //Get nodes of list elements
            const children = e.currentTarget.childNodes;

            //Remove resize modifier if select another element
            for (let i = 1; i < children.length; i++) children[i].classList.remove('answer-menu__item_active');

            //Set content box radius if select first or last elements
            if (el == children[1]) {
                answerContent.style.borderTopLeftRadius = '0';
                answerContent.style.borderBottomLeftRadius = '30px';
            } else if (el == children[children.length - 1]) {
                answerContent.style.borderTopLeftRadius = '30px';
                answerContent.style.borderBottomLeftRadius = '0';
            } else {
                answerContent.style.borderRadius = '30px';
            }

            if ((dataId == this.currentId)) {
                if (this.complete == false) {
                    this.success.play();
                    if (this.currentScore < 1) this.currentScore = 0;
                    maxScore += this.currentScore;
                    const scoreCount = document.querySelector('.score-quiz__count');
                    scoreCount.innerHTML = maxScore;
                    this.sound.endPlay();
                    this.complete = true;
                }
                el.classList.add('answer-menu__item_success');

                if (answerContent.classList.contains('answer-content_wrong')) {
                    answerContent.classList.remove('answer-content_wrong');
                }
                answerContent.classList.add('answer-content_success');
            } else {
                if (this.complete == false) {

                    //Check array on bad (wrong) ID if previously selected
                    const wrongAnswer = this.wrongAnswers.includes(dataId);
                    if (wrongAnswer == false) {
                        this.wrong.play();
                        this.currentScore -= 1;

                        el.classList.add('answer-menu__item_wrong');

                        const answerQuiz = document.querySelector('.answer-quiz');
                        answerQuiz.classList.add('answer-quiz_shake');
                        //Remove class shake animation
                        answerQuiz.addEventListener('animationend', () => {
                            answerQuiz.classList.remove('answer-quiz_shake');
                        });

                        //Push bad (wrong) ID in array
                        this.wrongAnswers.push(dataId);
                    }

                    answerContent.classList.add('answer-content_wrong');
                    
                } else {
                    
                    if (answerContent.classList.contains('answer-content_success')) {
                        answerContent.classList.remove('answer-content_success');
                    }

                    if (el.classList.contains('answer-menu__item_wrong')) {
                        answerContent.classList.add('answer-content_wrong');
                    } else {
                        answerContent.classList.remove('answer-content_wrong');
                    }
                }
            }

            el.classList.add('answer-menu__item_active');
        }
    }

    getElementById = () => this.currentId;

    getLevel = () => this.currentLevel;
}