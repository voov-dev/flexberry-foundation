import {AbstractView} from './abstract-view';

export class TicketLayoutView extends AbstractView {
  constructor() {
    super();
  }

  getSortingContainer() {
    return this.getElement().querySelector('.results__sorting');
  }

  getTicketListContainer() {
    return this.getElement().querySelector('.results__list');
  }

  getTemplate() {
    return `<section class="results aviasales-app__result">
              <h2 class="visually-hidden">Результаты</h2>
              <div class="results__sorting"></div>
              <ol class="results__list"></ol>
            </section>`;
  }
}
