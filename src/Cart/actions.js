export const filterUnique = (arr) => {
  return arr.filter((v, i, a) => a.indexOf(v) === i);
};
export const sumProducts = (arr) => {
  return arr.map((item) => item.price).reduce((prev, curr) => prev + curr, 0);
};

export const groupProductsInCart = (arrayOfObj) => {
  let result = filterUnique(arrayOfObj).reduce(function (r, a) {
    r[a.origin] = r[a.origin] || [];
    r[a.origin].push(a);
    return r;
  }, {});

  return result;
};
