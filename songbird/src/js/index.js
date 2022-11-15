//Connect reset styles file
import 'normalize.css';

//Connect main styles file
import '../sass/main.scss';

//Connect main html
import '../index.html';

import { router } from './components/route';

import { progressBar } from './components/progress-bar';

import Quiz from './components/quiz-game';
class Application {
    constructor() {
        this.routing();
        this.progressBar();
        this.quiz();
    }
    routing = () => {
        window.addEventListener("popstate", router);
        window.addEventListener("DOMContentLoaded", router);
    }
    progressBar = () => {
        window.addEventListener("DOMContentLoaded", progressBar);
    }
    quiz = () => {
        window.addEventListener("DOMContentLoaded", () => {
            new Quiz();
        })
    }
}

new Application();