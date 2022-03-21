import {AbstractView} from '../view/abstract-view';

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const getElement = (obj) => {
  if (obj instanceof AbstractView) {
    return obj.getElement();
  }

  return obj;
}

// const handleBeforeRenderCallback = {obj} => {
//   if (obj instanceof AbstractView) {
//     obj.handleBeforeRenderCallback();
//   }
// }
//
// const handleAfterRenderCallback = {obj} => {
//   if (obj instanceof AbstractView) {
//     obj.handleAfterRenderCallback();
//   }
// }

export const render = (container, child, plase = RenderPosition.BEFOREEND) => {
  // handleBeforeRenderCallback(child);
  switch (plase) {
    case RenderPosition.AFTERBEGIN: {
      getElement(container).prepend(getElement(child));
      break;
    }
    case RenderPosition.BEFOREEND:
    default: getElement(container).append(getElement(child));
  }
  // handleAfterRenderCallback(child);
}

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
}
