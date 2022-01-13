import { createSelector } from "reselect";

const stateCartProducts = (state) => state.cart.cartProducts;

export const selectCartIds = createSelector(stateCartProducts, (cartArr) =>
  cartArr.map((p) => p.id)
);

export const sumProducts = createSelector(stateCartProducts, (cartArr) =>
  cartArr
    .map((item) => item.price * item.quantity)
    .reduce((prev, curr) => prev + curr, 0)
);
export const nProducts = createSelector(stateCartProducts, (cartArr) =>
  cartArr.map((item) => item.quantity).reduce((prev, curr) => prev + curr, 0)
);
export const groupedProducts = createSelector(stateCartProducts, (cartArray) =>
  cartArray.reduce((r, a) => {
    r[a.origin] = r[a.origin] || [];
    r[a.origin].push(a);
    return r;
  }, {})
);
