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
                    <li class="menu__item"><a class="menu__link" href="/" data-link>Главная</a></li>
                    <li class="menu__item"><a class="menu__link" href="/quiz" data-link>Начать игру</a></li>
                    <li class="menu__item menu__item_active">Результаты</li>
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
                <div class="user">
                    <input type="text" placeholder="[Пользователь 1]" class="user__name">
                    <hr class="line">
                    <div class="user-info">
                        <div class="info-name">
                            <p>Всего игр сыграно:</p>
                            <p>Правильных ответов:</p>
                            <p>Неправильных ответов:</p>
                            <p>Текущий счёт:</p>
                        </div>
                        <div class="info-value">
                            <p class="info-value__all">0</p>
                            <p class="info-value__success">0</p>
                            <p class="info-value__wrong">0</p>
                            <p class="info-value__best">0</p>
                        </div>
                    </div>
                </div>
                <div class="copyright content-descr__copyright">
                    <a class="copyright__school-link" target="_blank" href="https://rs.school/js/"><img class="copyright__school-img" src="${rs_logo}" alt="RS School Logo"></a>
                    <p class="copyright__year">2022</p>
                    <a class="copyright__github-link" target="_blank" href="https://github.com/wowblvck"><img class="copyright__github-img" src="${github_logo}" alt="GitHub Logo"></a>
                </div>
            </div>
        </section>
    </main>
`;