import {SortingOrder} from '../const';

const sortByPrice = (ticket1, ticket2) => ticket1.price - ticket2.price;

const sortByFast = (ticket1, ticket2) => ticket1.segments[0].duration - ticket2.segments[0].duration;

export const sortTickets = (tickets, sortingOrder) => {
  switch (sortingOrder) {
    case SortingOrder.CHEAP:
      return tickets.slice().sort(sortByPrice);
    case SortingOrder.FAST:
      return tickets.slice().sort(sortByFast);
    default:
      return tickets;
  }
};
