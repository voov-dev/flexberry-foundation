export const inclineWord = (_number, _case0, _case1, _case2, _case3) => {
  let base = _number - Math.floor(_number / 100) * 100;
  let result;

  if (base === 0) {
    return _case0;
  }

  if (base > 9 && base < 20) {
    result = _case3;
  } else {
    let remainder = _number - Math.floor(_number / 10) * 10;

    if (remainder === 1) {
      result = _case1;
    } else if (remainder > 0 && remainder < 5) {
      result = _case2;
    } else {
      result = _case3;
    }
  }

  return `${_number} ${result}`;
};
