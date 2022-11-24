//Connect reset styles file
import 'normalize.css';

import '../sass/main.scss';

//Connect main html
import '../index.html';

import { router } from './components/route';

class Application {
    
    constructor() {
        this.routing();
        this.default();
    }

    routing = () => {
        window.addEventListener("popstate", router);
        window.addEventListener("DOMContentLoaded", router);
    }

    default = () => {
        const allCount = JSON.parse(localStorage.getItem('All'));
        if (!allCount) {
            localStorage.setItem('All', JSON.stringify(0));
        }

        const successAnsw = JSON.parse(localStorage.getItem('Success'));
        if (!successAnsw) {
            localStorage.setItem('Success', JSON.stringify(0));
        }
        
        const wrongAnsw = JSON.parse(localStorage.getItem('Wrong'));
        if (!wrongAnsw) {
            localStorage.setItem('Wrong', JSON.stringify(0));
        }
    }
}

new Application();