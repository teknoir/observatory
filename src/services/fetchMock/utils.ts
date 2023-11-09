// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const dataWithDelay = (data, ms: number = 500) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, ms)
  );

export const getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4();
};
