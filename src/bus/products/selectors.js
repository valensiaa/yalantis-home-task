import { createSelector } from "reselect";

export const stateProducts = (state) => state.products;
export const stateProductInfo = (state) => state.productInfo.product;

export const paramsQuery = createSelector(
  stateProducts,
  ({ filters }) => filters
);
