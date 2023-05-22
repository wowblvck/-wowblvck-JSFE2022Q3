import flamingo from '../../assets/images/flamingo.jpg';
import owl from '../../assets/images/owl.jpg';
import eagle from '../../assets/images/eagle.jpg';
import hummingbirds from '../../assets/images/hummingbirds.jpg'
import bird from '../../assets/images/bird.jpg';
import rs_logo from '../../assets/icons/rsschool_logo.svg';
import github_logo from '../../assets/icons/github.png';

export default () => `
    <main class="main main-home page__main-home">
        <section class="sidebox">
            <h1 class="logo sidebox__logo">SongBird</h1>
            <nav class="nav sidebox__nav">
                <ul class="menu menu_home">
                    <li class="menu__item menu__item_active">Главная</li>
                    <li class="menu__item"><a class="menu__link" href="/quiz" data-link>Начать игру</a></li>
                    <li class="menu__item"><a class="menu__link" href="/score" data-link>Результаты</a></li>
                </ul>
            </nav>
        </section>
        <section class="content content-home main__content-home">
            <ul class="content-gallery">
                <li class="content-gallery__item"><img src="${flamingo}" class="content-gallery__image" alt="Flamingo Image"></li>
                <li class="content-gallery__item"><img src="${bird}" class="content-gallery__image" alt="Bird Image"></li>
                <li class="content-gallery__item"><img src="${hummingbirds}" class="content-gallery__image" alt="Hummingbirds Image"></li>
                <li class="content-gallery__item"><img src="${eagle}" class="content-gallery__image" alt="Eagle Image"></li>
                <li class="content-gallery__item"><img src="${owl}" class="content-gallery__image" alt="Owl Image"></li>
            </ul>
            <div class="content-descr">
                <h2 class="content-descr__title">SongBird</h2>
                <p class="content-descr__subtitle">- это веселая и познавательная викторина, в которой игроку нужно прослушать аудиозапись и угадать, какой птице принадлежит загаданная песня.</p>
                <p class="content-descr__about">
                    В процессе вы узнаете много новых и интересных фактов о птицах: их размеры, места обитания, привычки, а самое главное - как звучат их голоса! <span class="emoji">🤓</span><br><br>
                    Это отличная игра для тех, кто:<br>
                    <span class="emoji">😊</span> ценит окружающий его мир и хочет быть ближе к природе;<br>
                    <span class="emoji">👩‍🎓</span> интересуется орнитологией и хочет проверить свои знания;<br>
                    <span class="emoji">🤩</span> хочет весело провести время и любит квизы!<br><br>
                    Не теряй время зря! Пора начинать игру! <span class="emoji">🥳</span>
                </p>
                <div class="copyright content-descr__copyright">
                    <a class="copyright__school-link" target="_blank" href="https://rs.school/js/"><img class="copyright__school-img" src="${rs_logo}" alt="RS School Logo"></a>
                    <p class="copyright__year">2022</p>
                    <a class="copyright__github-link" target="_blank" href="https://github.com/wowblvck"><img class="copyright__github-img" src="${github_logo}" alt="GitHub Logo"></a>
                </div>
            </div>
        </section>
    </main>
`;