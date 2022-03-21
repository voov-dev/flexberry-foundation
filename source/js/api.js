import "babel-polyfill"

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export class Api {
  constructor(endPoint) {
    this.endPoint = endPoint;
    this.controller = new AbortController();
  }

  async init() {
    this.searchId = await this.getSearchId();
  }

  async getSearchId() {
    const resKey = await this.load({url: 'search'});

    return resKey.searchId;
  };

  async getTickets() {
    let stop = false;
    let tickets = [];

    while (!stop) {
      let part = await this.getPartTickets();
      stop = part.stop;
      tickets.push(...part.tickets);
    }

    this.controller.abort();

    return tickets;
  }

  async getPartTickets() {
    return await this.load({url: `tickets?searchId=${this.searchId}`});
  }

  async load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
    signal = this.controller.signal,
  }) {
    try {
      const res = await fetch(`${this.endPoint}/${url}`, {method, body, headers, signal});

      Api.checkStatus(res);

      return await res.json();
    } catch (error) {
      await this.sleep(5000);
      return await this.load({url});
    }
  }

  static checkStatus(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError(err) {
    throw err;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
