import birds from '../data/birds';
import { createNode } from '../utilites/functions';

export default class Quiz {
    constructor() {
        this.currentLevel = 2;
        this.match(this.currentLevel);
    }

    match = (level) => {
        const menu = document.querySelector('.answer-menu');
        birds[level].forEach((elem) => {
            const item = createNode('li', 'answer-menu__item');
            const inner = createNode('span');
            inner.innerHTML = elem.name;
            item.append(inner);
            menu.append(item);
        })
    }

}