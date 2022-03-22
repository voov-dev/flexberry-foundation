import {AbstractView} from './abstract-view';
import {inclineWord} from '../utils/incline-word';
import {getDate, getDuration} from '../utils/get-date';

const createTicketTemplate = (ticket) => {
  const price = ticket.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1&thinsp;') + ' ₽';
  let tables = '';

  ticket.segments.forEach((segment) => {
    tables += `<table class="product__table">
                <tr>
                  <th class="product__table-col product__table-title">${segment.origin} – ${segment.destination}</th>
                  <th class="product__table-col product__table-title">В пути</th>
                  <th class="product__table-col product__table-title">${inclineWord(segment.stops.length, 'без пересадок', 'пересадка', 'пересадки', 'пересадок')}</th>
                </tr>
                <tr>
                  <td class="product__table-col product__table-value">${getDate(segment.date, segment.duration)}</td>
                  <td class="product__table-col product__table-value">${getDuration(segment.duration)}</td>
                  <td class="product__table-col product__table-value">${segment.stops.join(', ')}</td>
                </tr>
              </table>`;
  });

  return `<li class="results__item product">
      <div class="product__header">
        <div class="product__price">${price}</div>
        <div class="product__image">
          <picture>
            <source type="image/webp" srcset="https://pics.avs.io/99/36/${ticket.carrier}.webp, https://pics.avs.io/99/36/${ticket.carrier}@2x.webp 2x">
            <img src="https://pics.avs.io/99/36/${ticket.carrier}.png" srcset="https://pics.avs.io/99/36/${ticket.carrier}2x.png 2x" width="110" height="36" alt="S7">
          </picture>
        </div>
      </div>
      <div class="product__content">
        ${tables}
      </div>
    </li>`;
}

export class TicketItemView extends AbstractView {
  constructor(ticket) {
    super();
    this.ticket = ticket;
  }

  getTemplate() {
    return createTicketTemplate(this.ticket);
  }
}
