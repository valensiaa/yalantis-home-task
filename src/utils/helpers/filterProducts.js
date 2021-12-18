export const filterUnique = (arr) => {
  return arr.filter((v, i, a) => a.indexOf(v) === i);
};