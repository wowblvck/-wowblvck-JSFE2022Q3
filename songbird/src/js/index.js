//Connect reset styles file
import 'normalize.css';

//Connect main styles file
import '../sass/main.scss';

//Connect main html
import '../index.html';

import { router } from './components/route';

import Quiz from './components/quiz-game';
class Application {
    constructor() {
        this.routing();
        this.quiz();
    }
    routing = () => {
        window.addEventListener("popstate", router);
        window.addEventListener("DOMContentLoaded", router);
    }
    quiz = () => {
        window.addEventListener("DOMContentLoaded", () => {
            new Quiz(0);
        })
    }
}

new Application();