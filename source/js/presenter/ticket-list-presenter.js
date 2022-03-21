import {sortTickets} from '../utils/sort-tickets';
import {SortingOrder, UpdateType} from '../const';
import {render} from '../utils/render';
import {TicketLayoutView} from '../view/ticket-layout-view';
import {TicketItemPresenter} from './ticket-item-presenter';

export class TicketListPresenter {
  constructor({appContainer, ticketsModel}) {
    this.appContainer = appContainer;
    this.ticketsModel = ticketsModel;
    this.ticketPresenters = {};
    this.selectedSortingOrder = SortingOrder.CHEAP;
  }

  init() {
    this.ticketLayoutComponent = new TicketLayoutView();
    render(this.appContainer, this.ticketLayoutComponent);

    this.handleModelEvent = this.handleModelEvent.bind(this);

    this.ticketsModel.addSubscriber(this.handleModelEvent);
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
    // Object
    //     .values(this.ticketPresenters)
    //     .forEach((presenter) => presenter.destroy());
    this.ticketPresenters = {};
  }

  renderTicket(ticket) {
    const ticketPresenter = new TicketItemPresenter(this.appContainer, this.ticketLayoutComponent.getTicketListContainer(), this.ticketsModel);
    ticketPresenter.init(ticket);
    this.ticketPresenters[ticket.id] = ticketPresenter;
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

    this.renderTickets(tickets.slice(0, 10));
  }
}
