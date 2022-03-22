import {sortTickets} from '../utils/sort-tickets';
import {filterTickets} from '../utils/filter-tickets';
import {SortingOrder, FilterStops, UpdateType} from '../const';
import {render, remove, replace, RenderPosition} from '../utils/render';
import {TicketLayoutView} from '../view/ticket-layout-view';
import {SortingOrderView} from '../view/sorting-order-view';
import {FilterStopsView} from '../view/filter-stops-view';
import {TicketItemPresenter} from './ticket-item-presenter';
import {getDateMilliseconds} from '../utils/get-date';

export class TicketListPresenter {
  constructor({appContainer, ticketsModel, filterContainer}) {
    this.appContainer = appContainer;
    this.filterContainer = filterContainer;
    this.ticketsModel = ticketsModel;
    this.ticketPresenters = {};
    this.selectedSortingOrder = SortingOrder.CHEAP;
    this.selectedFilterStops = [FilterStops.ALL, FilterStops.NON_STOP, FilterStops.STOP_ONE, FilterStops.STOP_TWO, FilterStops.STOP_THREE];
    this.sortingOrderComponent = null;
    this.filterStopsComponent = null;

    this.handleModelEvent = this.handleModelEvent.bind(this);
    this.handleSortingOrderChange = this.handleSortingOrderChange.bind(this);
    this.handleFilterStopsChange = this.handleFilterStopsChange.bind(this);
  }

  init() {
    this.ticketLayoutComponent = new TicketLayoutView();
    render(this.appContainer, this.ticketLayoutComponent);

    this.renderSortingOrder();
    this.renderFilterStops();

    this.ticketsModel.addSubscriber(this.handleModelEvent);
  }

  renderSortingOrder() {
    const disabled = false;
    const previous = this.sortingOrderComponent;

    this.sortingOrderComponent = new SortingOrderView(disabled, this.selectedSortingOrder);
    this.sortingOrderComponent.setSortingOrderChangeHandler(this.handleSortingOrderChange);

    if (previous === null) {
      render(this.ticketLayoutComponent.getSortingContainer(), this.sortingOrderComponent, RenderPosition.BEFOREEND);

      return;
    }

    replace(this.sortingOrderComponent, previous);
    remove(previous);
  }

  renderFilterStops() {
    const disabled = false;
    const previous = this.filterStopsComponent;

    this.filterStopsComponent = new FilterStopsView(disabled, this.selectedFilterStops);
    this.filterStopsComponent.setFilterStopChangeHandler(this.handleFilterStopsChange);

    if (previous === null) {
      render(this.filterContainer, this.filterStopsComponent, RenderPosition.BEFOREEND);

      return;
    }

    replace(this.filterStopsComponent, previous);
    remove(previous);
  }

  handleSortingOrderChange(sortingOrder) {
    this.selectedSortingOrder = sortingOrder;
    this.renderListTickets();
  }

  handleFilterStopsChange(value, checked) {
    if (checked) {
      this.selectedFilterStops.push(value);

      if (this.selectedFilterStops.includes(FilterStops.ALL)) {
        this.selectedFilterStops = [FilterStops.ALL, FilterStops.NON_STOP, FilterStops.STOP_ONE, FilterStops.STOP_TWO, FilterStops.STOP_THREE];
        this.renderFilterStops();
      }
    } else {
      this.selectedFilterStops = this.selectedFilterStops.filter((key) => key !== value);

      if (this.selectedFilterStops.includes(FilterStops.ALL)) {
        this.selectedFilterStops = this.selectedFilterStops.filter((key) => key !== FilterStops.ALL);
      }

      this.renderFilterStops();
    }

    this.renderListTickets();
  }

  handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.MINOR: {
        this.ticketPresenters[data.id].init(data);
        break;
      }
      default: {
        this.renderListTickets();
      }
    }
  }

  getTickets() {
    let tickets = this.ticketsModel.getTickets();

    if (!this.selectedFilterStops) {
      this.selectedFilterStops = FilterStops.ALL;
    }

    tickets = filterTickets(tickets, this.selectedFilterStops);

    return sortTickets(tickets, this.selectedSortingOrder);
  }

  clearProducts() {
    Object.values(this.ticketPresenters)
        .forEach((presenter) => presenter.destroy());
    this.ticketPresenters = {};
  }

  renderTicket(ticket) {
    const key = ticket.carrier + ticket.price + getDateMilliseconds(ticket.segments[0].date) + '-' + ticket.segments[0].duration;
    const ticketPresenter = new TicketItemPresenter(this.appContainer, this.ticketLayoutComponent.getTicketListContainer(), this.ticketsModel);

    ticketPresenter.init(ticket);

    this.ticketPresenters[key] = ticketPresenter;
  }

  renderTickets(tickets) {
    tickets.forEach((item) => this.renderTicket(item));
  }

  renderListTickets() {
    this.clearProducts();
    const tickets = this.getTickets();

    if (tickets === 0) {
      return;
    }

    this.renderTickets(tickets.slice(0, 5));
  }
}
