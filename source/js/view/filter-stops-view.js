import {AbstractView} from './abstract-view';

const createFilterStopTemplate = (disabled = '', selectedFilters = []) => `<section class="filter">
      <h2 class="visually-hidden">Фильтр</h2>
      <form class="filter__form">
        <div class="filter__transfer">
          <fieldset class="filter__type filter__type--transfer">
            <legend class="filter__title">Количество пересадок</legend>
            <ul class="filter__checkboxes-list">
              <li class="filter__checkboxes-item">
                <div class="custom-toggle custom-toggle--checkbox" data-validate-type="checkbox">
                  <label>
                    <input
                        type="checkbox"
                        name="transfer"
                        value="all"
                        ${disabled}
                        ${selectedFilters.includes('all') ? 'checked' : ''}
                        />
                        <span class="custom-toggle__icon"></span>
                        <span class="custom-toggle__label">Все</span>
                  </label>
                </div>
              </li>
              <li class="filter__checkboxes-item">
                <div class="custom-toggle custom-toggle--checkbox" data-validate-type="checkbox">
                  <label>
                    <input
                        type="checkbox"
                        name="transfer"
                        value="non-stop"
                        ${disabled}
                        ${selectedFilters.includes('non-stop') ? 'checked' : ''}
                        />
                        <span class="custom-toggle__icon"></span>
                        <span class="custom-toggle__label">Без пересадок</span>
                  </label>
                </div>
              </li>
              <li class="filter__checkboxes-item">
                <div class="custom-toggle custom-toggle--checkbox" data-validate-type="checkbox">
                  <label>
                    <input
                        type="checkbox"
                        name="transfer"
                        value="stops-1"
                        ${disabled}
                        ${selectedFilters.includes('stops-1') ? 'checked' : ''}
                        />
                        <span class="custom-toggle__icon"></span>
                        <span class="custom-toggle__label">1 пересадка</span>
                  </label>
                </div>
              </li>
              <li class="filter__checkboxes-item">
                <div class="custom-toggle custom-toggle--checkbox" data-validate-type="checkbox">
                  <label>
                    <input
                        type="checkbox"
                        name="transfer"
                        value="stops-2"
                        ${disabled}
                        ${selectedFilters.includes('stops-2') ? 'checked' : ''}
                        />
                        <span class="custom-toggle__icon"></span>
                        <span class="custom-toggle__label">2 пересадки</span>
                  </label>
                </div>
              </li>
              <li class="filter__checkboxes-item">
                <div class="custom-toggle custom-toggle--checkbox" data-validate-type="checkbox">
                  <label>
                    <input
                        type="checkbox"
                        name="transfer"
                        value="stops-3"
                        ${disabled}
                        ${selectedFilters.includes('stops-3') ? 'checked' : ''}
                        />
                        <span class="custom-toggle__icon"></span>
                        <span class="custom-toggle__label">3 пересадки</span>
                  </label>
                </div>
              </li>
            </ul>
          </fieldset>
        </div>
      </form>
    </section>`;

export class FilterStopsView extends AbstractView {
  constructor(disabled, selectedFilterStops) {
    super();
    this.disabled = disabled ? 'disabled' : '';
    this.selectedFilterStops = selectedFilterStops;

    this.filterStopChangeHandler = this.filterStopChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterStopTemplate(this.disabled, this.selectedFilterStops);
  }

  setFilterStopChangeHandler(callback) {
    this.callbacks.filterStopChange = callback;
    this.getElement().querySelector('.filter__checkboxes-list').addEventListener('change', this.filterStopChangeHandler);
  }

  filterStopChangeHandler(evt) {
    evt.preventDefault();
    this.callbacks.filterStopChange(evt.target.value, evt.target.checked);
  }
}
