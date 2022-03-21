import {AbstractView} from './abstract-view';

export class AppView extends AbstractView {
  getAppContainer() {
    return this.getElement().querySelector('.aviasales-app__wrapper');
  }

  getTemplate() {
    return `<section class="aviasales-app">
              <h1 class="visually-hidden">Главная</h1>
              <div class="container">
                <div class="aviasales-app__wrapper"></div>
              </div>
            </section>`;
  }
}
