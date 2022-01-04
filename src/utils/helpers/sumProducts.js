export const sumProducts = (arr) => {
  return arr.map((item) => item.price * item.quantity).reduce((prev, curr) => prev + curr, 0);
};