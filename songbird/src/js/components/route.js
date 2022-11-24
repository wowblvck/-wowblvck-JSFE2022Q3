import home from "../pages/home";
import quiz from "../pages/quiz";
import score from "../pages/score";

import Quiz from '../components/quiz-game';

export const routes = {
    "/": { name: "home", title: "Добро пожаловать", render: home },
    "/quiz": { name: "quiz", title: "Викторина", render: quiz },
    "/score": { name: "score", title: "Результаты", render: score },
};

export const router = () => {
    let view = routes[location.pathname];

    if (view) {
        document.title = view.title;
        document.body.innerHTML = view.render();
        document.body.classList.add(`page`);

        if (view.name === 'quiz') {
            new Quiz(0);
        }

    } else {
        history.replaceState("", "", "/");
        router();
    }
};

// Handle navigation
window.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        history.pushState("", "", e.target.href);
        router();
    }
});
