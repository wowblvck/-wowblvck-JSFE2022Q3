import birds from '../data/birds';
import { 
    createNode, 
    shuffle, 
    getRandomArrayElement,
    getArrayElementById } from '../utilites/functions';

import Sound from '../components/quiz-player';

import wrongSound from '../../assets/sounds/wrong.wav';
import successSound from '../../assets/sounds/success.wav';

let maxScore = 0;
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
        this.addAudio();
    }

    addAudio = () => {
        new Sound(this.getLevel(), this.getElementById());
    }

    eventHandlers = () => {
        const answerMenu = document.querySelector('.answer-menu');
        answerMenu.addEventListener('click', this.selectElement);
    }

    selectElement = (e) => {

        let answerContent = document.querySelector('.answer-content');
        answerContent.replaceWith(answerContent.cloneNode(false));

        let el = e.target;

        if (el.tagName != "UL") {
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

            //Check if quiz not completed (no chosen successful element)
            if (this.complete == false) {

                //Check if selected element first or last in list, give content box topLeft and bottomLeft radius is null (0)
                if(el == children[1]) {
                    answerContent.style.borderTopLeftRadius = '0';
                } else if (el == children[children.length - 1]) {
                    answerContent.style.borderBottomLeftRadius = '0';
                }

                //Check ID select element according to random ID generate in match()
                if ((dataId == this.currentId)) {

                    //If score rating < 1 give score rating is null (0)
                    if (this.currentScore < 1) this.currentScore = 0;
                    maxScore += this.currentScore;
                    const scoreCount = document.querySelector('.score-quiz__count');
                    scoreCount.innerHTML = maxScore;

                    //Set borderRadius content box if selected elements not first or last
                    if (el != children[1] || el != children[children.length - 1]) {
                        answerContent.style.borderRadius = '30px';
                    }

                    //If selected element first or last set borderRadius is null (0)
                    if (el == children[1]) {
                        answerContent.style.borderTopLeftRadius = '0';
                    } else if (el == children[children.length - 1]) {
                        answerContent.style.borderBottomLeftRadius = '0';
                    }

                    //Remove wrong selector from content box if ID of selected element according to random ID generate
                    if (answerContent.classList.contains('answer-content_wrong')) {
                        answerContent.classList.remove('answer-content_wrong');
                    }

                    //Remove resize button selecttor from list item if ID fof selected element according to random ID generate
                    for (let i = 1; i < children.length; i++) {
                        if (children[i].classList.contains('answer-menu__item_wrong')) {
                            children[i].classList.remove('answer-menu__item_size-m');
                        }
                    }
                    el.classList.add('answer-menu__item_size-m');
                    el.classList.add('answer-menu__item_success');
                    answerContent.classList.add('answer-content_success');
                    this.complete = true;
                    this.success.play();
                } else {

                    //Check array on bad (wrong) ID if previously selected
                    const badId = this.wrongAnswers.includes(dataId);
                    if (badId == false) {
                        this.currentScore -= 1;
                        el.classList.add('answer-menu__item_size-m');
                        el.classList.add('answer-menu__item_wrong');
                        answerContent.classList.add('answer-content_wrong');
                        this.wrong.play();
                        const answerQuiz = document.querySelector('.answer-quiz');
                        answerQuiz.classList.add('answer-quiz_shake');

                        //Remove class shake animation
                        answerQuiz.addEventListener('animationend', () => {
                            answerQuiz.classList.remove('answer-quiz_shake');
                        });

                        //Push bad (wrong) ID in array
                        this.wrongAnswers.push(dataId);
                    }
                }
            } else {
                if (dataId == this.currentId) {
                    answerContent.classList.remove('answer-content_wrong');
                    answerContent.classList.add('answer-content_success');
                } else {
                    answerContent.classList.remove('answer-content_success');
                    answerContent.classList.add('answer-content_wrong');
                }
            }
        }
    }

    getElementById = () => this.currentId;

    getLevel = () => this.currentLevel;
}