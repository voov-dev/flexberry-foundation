import {createElement} from '../utils/render';

export class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }

    this.element = null;
    this.callbacks = {};
  }

  getTemplate() {
    throw new Error('AbstractView method not implemented: getTemplate');
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
