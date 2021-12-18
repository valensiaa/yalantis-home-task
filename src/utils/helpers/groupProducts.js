import {filterUnique} from './filterProducts'

export const groupProductsInCart = (arrayOfObj) => {
  let result = filterUnique(arrayOfObj).reduce(function (r, a) {
    r[a.origin] = r[a.origin] || [];
    r[a.origin].push(a);
    return r;
  }, {});

  return result;
};