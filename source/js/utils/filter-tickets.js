import {FilterStops} from '../const';


export const filterTickets = (tickets, filterStops) => {
  if (filterStops.length === 0) {
    return [];
  }

  if (filterStops.includes(FilterStops.ALL) || filterStops.length === 4) {
    return tickets;
  } else if (
    filterStops.includes(FilterStops.NON_STOP) ||
    filterStops.includes(FilterStops.STOP_ONE) ||
    filterStops.includes(FilterStops.STOP_TWO) ||
    filterStops.includes(FilterStops.STOP_THREE)) {
    let sortTickets = [];

    if (filterStops.includes(FilterStops.NON_STOP)) {
      sortTickets = sortTickets.concat(tickets.slice().filter((item) => {
        return item.segments[0].stops.length === 0 && item.segments[1].stops.length === 0;
      }));
    }

    if (filterStops.includes(FilterStops.STOP_ONE)) {
      sortTickets = sortTickets.concat(tickets.slice().filter((item) => {
        return item.segments[0].stops.length === 1 && item.segments[1].stops.length === 1;
      }));
    }

    if (filterStops.includes(FilterStops.STOP_TWO)) {
      sortTickets = sortTickets.concat(tickets.slice().filter((item) => {
        return item.segments[0].stops.length === 2 && item.segments[1].stops.length === 2;
      }));
    }

    if (filterStops.includes(FilterStops.STOP_THREE)) {
      sortTickets = sortTickets.concat(tickets.slice().filter((item) => {
        return item.segments[0].stops.length === 3 && item.segments[1].stops.length === 3;
      }));
    }

    return sortTickets;
  }
};
