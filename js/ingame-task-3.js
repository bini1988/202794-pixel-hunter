
import * as utils from './utils';
import * as game from './game';

import header from './ingame-header';
import stats from './ingame-stats';
import footer from './footer';

const templateGameOption = (option, index) => `\
  <div class="game__option">
    <img alt="Option ${index}" data-src="${option.src}" >
  </div>`;

const templateGame = (state, options) => `\
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${options.map((option, index) => templateGameOption(option, index + 1)).join(``)}
    </form>
    <div class="stats">
      ${stats(state.results)}
    </div>
  </div>`;

const template = (state, options) => `\
  ${header(state)}
  ${templateGame(state, options)}
  ${footer()}`;

const IMG_WIDTH = 304;
const IMG_HEIGHT = 455;


export default (state, options) => {

  const element = utils.getScreenFromTemplate(template(state, options));

  const gameContent = element.querySelector(`.game__content`);
  const gameAnswers = gameContent.querySelectorAll(`.game__option`);

  utils.loadImages(gameContent, IMG_WIDTH, IMG_HEIGHT);

  Array.from(gameAnswers).forEach((answer) => {
    answer.addEventListener(`click`, () => {
      game.renderNextLevel(state);
    });
  });


  const backButton = element.querySelector(`.header__back`);

  backButton.addEventListener(`click`, () => {
    game.reset();
  });

  return element;
};
