import birds from '../data/birds';
import { 
    createNode, 
    shuffle, 
    getRandomArrayElement,
    getArrayElementById,
    clean } from '../utilites/functions';

import Sound from '../components/quiz-player';

import wrongSound from '../../assets/sounds/wrong.wav';
import successSound from '../../assets/sounds/success.wav';
import nLIcon from '../../assets/icons/next-level.svg';

import defaultBirdImage from '../../assets/images/default-bird.png';

const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

import { router } from './route';

export default class Quiz {

    constructor(level) {
        //Current level a game (0, 1, 2, etc.)
        this.currentLevel = level;

        //Current ID a element (randomized ID)
        this.currentId = 0;

        //Current score in level section
        this.currentScore = 5;

        //Last game level or no
        this.lastGame = false;

        //New game selected button
        this.newGame = false;

        //Complete or not a current level
        this.complete = false;

        //Bad ID array (for check if element not multiply selected)
        this.wrongAnswers = [];

        //Sound for bad answer
        this.wrong = new Audio(wrongSound);

        //Sound for success answer
        this.success = new Audio(successSound);

        //Start the current level match quiz
        this.match();

        //Add event listeners for elements
        this.eventHandlers();

        //Create a sound
        this.sound = new Sound(this.getLevel(), this.getElementById());
    }

    match = () => {
        const menu = document.querySelector('.answer-menu');

        //Change opacity next level button
        let nextLevel = document.querySelector('.next-level');
        nextLevel.style.opacity = '0.6';
        nextLevel.style.animation = '';
        
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

        //Output random ID of element
        this.currentId = getRandomArrayElement(birds[this.getLevel()]).id;

        const infoTitle = document.querySelector('.info__title');
        const infoImg = document.querySelector('.info__image');

        const elem = getArrayElementById(birds[this.getLevel()], this.currentId);

        const arr = [];

        for (let i in elem.name) {
            arr.push("*");
        }

        infoTitle.innerHTML = arr.join("");
        infoImg.src = `${defaultBirdImage}`;

        //If level equality last, change text in button 'Next Level'
        if (this.currentLevel == birds.length - 1) {
            nextLevel.replaceWith(nextLevel.cloneNode(false));

            nextLevel = document.querySelector('.next-level');
            const nextLevelTitle = createNode('p', 'next-level__title');
            nextLevelTitle.innerHTML = 'Завершить игру';
            this.lastGame = true;

            nextLevel.append(nextLevelTitle);
        }
    }


    eventHandlers = () => {
        const answerMenu = document.querySelector('.answer-menu');
        answerMenu.addEventListener('click', this.selectElement);

        const nextLevel = document.querySelector('.next-level');
        nextLevel.addEventListener('click', this.next);

        const newGame = document.querySelector('.match-quiz');
        newGame.addEventListener('click', this.new);
    }

    new = () => {
        this.currentLevel = -1;
        this.newGame = true;
        localStorage.setItem('Max', JSON.stringify(0));

        if (this.lastGame == true) {
            const nextLevel = document.querySelector('.next-level');
            const nextLevelTitle = document.querySelector('.next-level__title');
            nextLevelTitle.innerHTML = 'Следующий уровень';

            const nextLevelIcon = createNode('img', 'next-level__icon');
            nextLevelIcon.alt = 'Next Level Icon';
            nextLevelIcon.src = `${nLIcon}`;

            nextLevel.append(nextLevelTitle, nextLevelIcon);
        }

        const score = document.querySelector('.score-quiz__count');
        score.innerHTML = `${this.getScore()}`;
        this.next();
    }

    next = () => {
        if(this.complete == true && this.lastGame == true) {
            let allGame = JSON.parse(localStorage.getItem('All'));
            allGame += 1;
            localStorage.setItem('All', JSON.stringify(allGame));
            history.pushState("", "", "/score");
            router();
        }

        if ((this.complete == true && this.lastGame == false) || this.newGame == true) {
            this.currentLevel += 1;
            if (this.currentLevel < birds.length) {

                //Remove event listener new game button
                const nextLevel = document.querySelector('.next-level');
                nextLevel.removeEventListener('click', this.next);
                
                //Remove old element list for new elements
                const answerMenu = document.querySelector('.answer-menu');
                answerMenu.replaceWith(answerMenu.cloneNode(false));

                //Remove event listener play state button
                const playerControlState = document.querySelector('.player-control__state');
                playerControlState.replaceWith(playerControlState.cloneNode(false));

                //Remove event listener play progress bar
                const playerControlInput = document.querySelector('.player-control__bar');
                playerControlInput.replaceWith(playerControlInput.cloneNode(false));

                //Remove success and wrong class selectors from answer content box
                let answerContent = document.querySelector('.answer-content');
                if (answerContent.classList.contains('answer-content_success')) {
                    answerContent.classList.remove('answer-content_success');
                } else if (answerContent.classList.contains('answer-content_wrong')) {
                    answerContent.classList.remove('answer-content_wrong');
                }
                answerContent.replaceWith(answerContent.cloneNode(false));

                //Replace description in answer content box
                const answerDescr = createNode('p', 'answer-content__select')
                answerDescr.innerHTML = 'Послушайте плеер.<br>Выберите птицу из списка';
                answerContent = document.querySelector('.answer-content');
                answerContent.append(answerDescr);

                //Remove event listener from new game button
                const newGame = document.querySelector('.match-quiz');
                newGame.removeEventListener('click', this.new);

                const stepsQuiz = document.querySelector('.menu_quiz');

                //Clean #text from node
                clean(stepsQuiz);

                stepsQuiz.childNodes.forEach((elem, i) => {
                    if (elem.classList.contains('menu__item_active')) {
                        elem.classList.remove('menu__item_active');
                    }

                    if (this.currentLevel == i) {
                        elem.classList.add('menu__item_active');
                    }
                })

                new Quiz(this.currentLevel);
            }
        }
    }

    selectElement = (e) => {

        let el = e.target;

        if (el.tagName != "UL") {
            let answerContent = document.querySelector('.answer-content');
            answerContent.replaceWith(answerContent.cloneNode(false));

            if (el.tagName == "SPAN") el = el.parentNode;

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

            // const playerControl = document.querySelector('.player-control');
            // const answerControl = playerControl.cloneNode(true);

            // answerControl.classList.remove('player-quiz__player-control');


            const answerContentDescr = createNode('p', 'answer-content__description');
            answerContentDescr.innerHTML = `${element.description}`;

            answerContent.append(answerIcon, 
                                answerContentTitle,
                                answerContentSubtitle,
                                // answerControl,
                                answerContentDescr);

            //Get nodes of list elements
            const children = e.currentTarget.childNodes;

            //Remove resize modifier if select another element
            for (let i = 0; i < children.length; i++) {
                if (children[i].classList.contains('answer-menu__item_active')) {
                    children[i].classList.remove('answer-menu__item_active');
                }
            }

            //Set content box radius if select first or last elements
            if (width > 1199) {
                if (el == children[0]) {
                    answerContent.style.borderTopLeftRadius = '0';
                    answerContent.style.borderBottomLeftRadius = '30px';
                } else if (el == children[children.length - 1]) {
                    answerContent.style.borderTopLeftRadius = '30px';
                    answerContent.style.borderBottomLeftRadius = '0';
                } else {
                    answerContent.style.borderRadius = '30px';
                }
            }

            //Check selected element id according to randomized element id
            if ((dataId == this.currentId)) {
                if (this.complete == false) {
                    this.success.play();
                    if (this.currentScore < 1) this.currentScore = 0;

                    //Update score counter
                    let maxScore = JSON.parse(localStorage.getItem('Max'));
                    maxScore += this.currentScore;
                    localStorage.setItem('Max', JSON.stringify(maxScore));
                    
                    const scoreCount = document.querySelector('.score-quiz__count');
                    scoreCount.innerHTML = `${this.getScore()}`;

                    //Add next level button opacity and animation
                    const nextLevel = document.querySelector('.next-level');
                    nextLevel.style.opacity = '1';
                    nextLevel.style.animation = 'zoom-title 1s infinite';

                    const infoTitle = document.querySelector('.info__title');
                    infoTitle.innerHTML = element.name;

                    const infoImg = document.querySelector('.info__image');
                    infoImg.src = element.image;

                    let successAnsw = JSON.parse(localStorage.getItem('Success'));
                    successAnsw += 1;
                    localStorage.setItem('Success', JSON.stringify(successAnsw));

                    //End play sound
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

                        let wrongAnsw = JSON.parse(localStorage.getItem('Wrong'));
                        wrongAnsw += 1;
                        localStorage.setItem('Wrong', JSON.stringify(wrongAnsw));

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

    getScore = () => localStorage.getItem('Max');

    getElementById = () => this.currentId;

    getLevel = () => this.currentLevel;
}