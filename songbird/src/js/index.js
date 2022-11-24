//Connect reset styles file
import 'normalize.css';

import '../sass/main.scss';

//Connect main html
import '../index.html';

import { router } from './components/route';

class Application {
    
    constructor() {
        this.routing();
    }

    routing = () => {
        window.addEventListener("popstate", router);
        window.addEventListener("DOMContentLoaded", router);
    }
}

new Application();

// alert("Приветствую тебя Студент. Я не успел доделать все вовремя, но надеюсь, что ты с пониманием отнесешься. Если есть возможность, и оставь свои данные, чтобы я мог тебе написать. Спасибо. Мой Discord: Indar Basto#4840, Telegram: @wowblvck.");