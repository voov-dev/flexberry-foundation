import {TicketListPresenter} from './ticket-list-presenter';

import {TicketModel} from '../model/ticket-model';
import {UpdateType} from '../const';
import {AppView} from '../view/app-view';
import {render} from '../utils/render';

export class AppPresenter {
  constructor(mainContainer, api) {
    this.mainContainer = mainContainer;
    this.api = api;
    this.ticketsModel = new TicketModel();
    this.appComponent = null;
  }

  async init() {
    this.appComponent = new AppView();
    render(this.mainContainer, this.appComponent);

    this.ticketListPresenter = new TicketListPresenter({
      appContainer: this.appComponent.getAppContainer(),
      ticketsModel: this.ticketsModel,
    });
    this.ticketListPresenter.init();

    await this.api.init();
    this.ticketsModel.setTickets(UpdateType.INIT, await this.api.getTickets());
  }
}
