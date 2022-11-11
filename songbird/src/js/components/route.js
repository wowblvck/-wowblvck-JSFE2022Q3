import home from "../pages/home";
import quiz from "../pages/quiz";
import score from "../pages/score";

const routes = {
    "/": { name: "quiz", title: "Добро пожаловать", render: quiz },
    "/quiz": { name: "quiz", title: "Викторина", render: quiz },
    "/score": { name: "score", title: "Результаты", render: score },
};

function router() {
    let view = routes[location.pathname];

    if (view) {
        document.title = view.title;
        document.body.innerHTML = view.render();
        document.body.classList.add(`page-${view.name}`);
    } else {
        history.replaceState("", "", "/");
        router();
    }
};

// // Handle navigation
// window.addEventListener("click", e => {
//     if (e.target.matches("[data-link]")) {
//         e.preventDefault();
//         history.pushState("", "", e.target.href);
//         router();
//     }
// });

// // Update router
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);