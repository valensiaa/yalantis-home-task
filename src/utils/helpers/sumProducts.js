export const sumProducts = (arr) => {
  return arr.map((item) => item.price).reduce((prev, curr) => prev + curr, 0);
};