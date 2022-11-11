export default () => `
    <header class="header-quiz page-quiz__header">
        <p class="score-quiz header-quiz__score">Счет:<span class="score-quiz__count">0</span></p>
    </header>
    <main class="main-quiz page-quiz__main">
        <section class="sidebox-quiz">
            <h1 class="logo sidebox-quiz__logo">SongBird</h1>
            <ul class="steps-quiz sidebox-quiz__steps">
                <li class="steps-quiz__item steps-quiz__item_active">Разминка</li>
                <li class="steps-quiz__item">Воробьиные</li>
                <li class="steps-quiz__item">Лестные птицы</li>
                <li class="steps-quiz__item">Певчие птицы</li>
                <li class="steps-quiz__item">Хищные птицы</li>
                <li class="steps-quiz__item">Морские птицы</li>
            </ul>
            <h2 class="match-quiz sidebox-quiz__match">Новая игра</h2>
        </section>
        <section class="content-quiz">
        </section>
    </main>
`;