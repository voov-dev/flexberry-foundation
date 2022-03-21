import {AbstractView} from './abstract-view';

const createSortingOrderTemplate = (disabled = '', selectedSortingOrder) => `<fieldset class="sorting__order">
          <legend class="visually-hidden">Показать сначала:</legend>
          <ul class="sorting__order-list">
            <li class="sorting__order-tab">
              <input
                id="sort-cheap"
                class="visually-hidden"
                type="radio"
                name="sorting-order"
                value="cheap"
                ${disabled}
                ${selectedSortingOrder === 'cheap' ? 'checked' : ''} />
              <label for="sort-cheap">Самый дешевый</label>
            </li>
            <li class="sorting__order-tab">
              <input
                id="sort-fast"
                class="visually-hidden"
                type="radio"
                name="sorting-order"
                value="fast"
                ${disabled}
                ${selectedSortingOrder === 'fast' ? 'checked' : ''} />
              <label for="sort-fast">Самый быстрый</label>
            </li>
          </ul>
        </fieldset>`;

export class SortingOrderView extends AbstractView {
  constructor(disabled, selectedSortingOrder) {
    super();
    this.disabled = disabled ? 'disabled' : '';
    this.selectedSortingOrder = selectedSortingOrder;

    this.sortingOrderChangeHandler = this.sortingOrderChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingOrderTemplate(this.disabled, this.selectedSortingOrder);
  }

  setSortingOrderChangeHandler(callback) {
    this.callbacks.sortingOrderChange = callback;
    this.getElement().querySelector('.sorting__order-list').addEventListener('change', this.sortingOrderChangeHandler);
  }

  sortingOrderChangeHandler(evt) {
    evt.preventDefault();
    this.callbacks.sortingOrderChange(evt.target.value);
  }
}
