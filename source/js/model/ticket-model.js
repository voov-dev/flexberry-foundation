import {AbstractModel} from './abstract-model.js';

export class TicketModel extends AbstractModel {
  constructor() {
    super();
    this.tickets = [];
  }

  setTickets(updateType, tickets) {
    this.tickets = tickets.slice();

    this.observer.notify(updateType, tickets);
  }

  getTickets() {
    return this.tickets;
  }
}
