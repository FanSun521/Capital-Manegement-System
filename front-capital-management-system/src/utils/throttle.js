function throttle(callback, wait) {
  let start = 0;
  return function () {
    const end = Date.now();
    if (end - start > wait) {
      callback.apply(this, arguments);
      start = end;
    }
  };
}

export default throttle;
