import {sortTickets} from '../utils/sort-tickets';
import {SortingOrder, UpdateType} from '../const';
import {render, remove, replace, RenderPosition} from '../utils/render';
import {TicketLayoutView} from '../view/ticket-layout-view';
import {SortingOrderView} from '../view/sorting-order-view';
import {TicketItemPresenter} from './ticket-item-presenter';
import {getDateMilliseconds} from '../utils/get-date';

export class TicketListPresenter {
  constructor({appContainer, ticketsModel}) {
    this.appContainer = appContainer;
    this.ticketsModel = ticketsModel;
    this.ticketPresenters = {};
    this.selectedSortingOrder = SortingOrder.CHEAP;
    this.sortingOrderComponent = null;

    this.handleModelEvent = this.handleModelEvent.bind(this);
    this.handleSortingOrderChange = this.handleSortingOrderChange.bind(this);
  }

  init() {
    this.ticketLayoutComponent = new TicketLayoutView();
    render(this.appContainer, this.ticketLayoutComponent);

    this.renderSortingOrder();

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

  handleSortingOrderChange(sortingOrder) {
    this.selectedSortingOrder = sortingOrder;
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
    const tickets = this.ticketsModel.getTickets();

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
