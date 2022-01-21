import { createSelector } from "reselect";

const stateProducts = (state) => state.products.products;
export const stateMyAccount = (state) => state.myAccount;

export const paramsQuery = createSelector(
  stateMyAccount,
  ({ filters }) => filters
);

export const myProductsSelector = createSelector(stateProducts, products => products.filter(p => p.isEditable === true))
//export const idsArray = createSelector(stateMyAccount, products => products.myProducts.map(p => p.id))