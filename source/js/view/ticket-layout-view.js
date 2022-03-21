import {AbstractView} from './abstract-view';

export class TicketLayoutView extends AbstractView {
  constructor() {
    super();
  }

  getSortingContainer() {
    return this.getElement().querySelector('.sorting__form');
  }

  getTicketListContainer() {
    return this.getElement().querySelector('.results__list');
  }

  getTemplate() {
    return `<section class="results aviasales-app__result">
              <h2 class="visually-hidden">Результаты</h2>
              <div class="results__sorting sorting">
                  <form class="sorting__form"></form>
              </div>
              <ol class="results__list"></ol>
            </section>`;
  }
}
