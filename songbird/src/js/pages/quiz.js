import nextLevelIcon from '../../assets/icons/next-level.svg';
import defaultBirdImage from '../../assets/images/default-bird.png';

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
            <img class="content-quiz__image" src=${defaultBirdImage} alt="Default Bird Image">
            <div class="player-quiz content-quiz__player-quiz">
                <p class="player-quiz__title">Прослушайте плеер и выберите птицу из списка:</p>
                <div class="player-control player-quiz__player-control">
                    <button class="player-control__state"></button>
                    <input 
                        type="range" 
                        class="player-control__bar"
                        min="0"
                        value="0"
                    />
                </div>
            </div>
            <div class="answer-quiz content-quiz__answer-quiz">
                <ul class="answer-menu">
                </ul>
                <div class="answer-content">
                    <p class="answer-content__select">Послушайте плеер.<br>Выберите птицу из списка</p>
                </div>
            </div>
            <div class="next-level content-quiz__next-level">
                <p class="next-level__title">Следующий уровень</p>
                <img class="next-level__icon" src=${nextLevelIcon} alt="Next Level Icon">
            </div>
        </section>
    </main>
`;

//Content for answer-content
{/* <img class="answer-content__icon" src=${birdImage} alt="Bird Icon">
<p class="answer-content__title">Ворон</p>
<p class="answer-content__subtitle">Corvus corax</p>
<div class="answer-player answer-content__answer-player">
    <button class="answer-player__state"></button>
    <div class="answer-progress">
        <input 
            type="range" 
            class="answer-progress__bar"
        />
        <div class="answer-time">
            <p class="answer-time__current">00:00</p>
            <p class="answer-time__duration">--:--</p>
        </div>
    </div>
</div>
<p class="answer-content__description">
    Ворон — крупная птица. Длина тела достигает 70 сантиметров, размах крыльев — до полутора метров. Вороны населяют окрестности Тауэра. В Англии бытует поверье, что в день, когда черные вороны улетят от Тауэра, монархия рухнет.
</p>
</div> */}