import {render, RenderPosition} from '../utils/render';
import {TicketItemView} from '../view/ticket-item-view';

export class TicketItemPresenter {
  constructor(appContainer, ticketListContainer, ticketModel) {
    this.appContainer = appContainer;
    this.ticketsListContainer = ticketListContainer;
    this.ticketModel = ticketModel;
  }

  init(ticket) {
    this.ticket = ticket;
    this.ticketItemComponent = new TicketItemView(ticket);

    render(this.ticketsListContainer, this.ticketItemComponent, RenderPosition.BEFOREEND);
  }
}
