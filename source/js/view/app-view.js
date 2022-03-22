import {AbstractView} from './abstract-view';

export class AppView extends AbstractView {
  constructor() {
    super();
  }

  getAppContainer() {
    return this.getElement().querySelector('.aviasales-app__wrapper');
  }

  getFilterContainer() {
    return this.getElement().querySelector('.aviasales-app__filter');
  }

  getTemplate() {
    return `<section class="aviasales-app">
              <h1 class="visually-hidden">Главная</h1>
              <div class="container">
                <div class="aviasales-app__wrapper">
                    <section class="aviasales-app__filter"></section>
                </div>
              </div>
            </section>`;
  }
}
