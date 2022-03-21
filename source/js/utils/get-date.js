export const getDate = (date, duration) => {
  let timeMilliseconds = new Date(date).getTime();

  return `${new Date(date).toLocaleTimeString().slice(0, -3)} - ${new Date(timeMilliseconds + duration * 60 * 1000).toLocaleTimeString().slice(0, -3)}`;
};

export const getDuration = (duration) => {
  return `${Math.trunc(duration / 60)}ч ${duration % 60}м`;
}
