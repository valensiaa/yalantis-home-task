import { createSelector } from "reselect";

export const stateProducts = (state) => state.products;
export const stateProductInfo = (state) => state.productInfo.product;

export const selectStringQueryOrigins = createSelector(stateProducts, (s) =>
  s.filters.filteredByOrigins.map((o) => o.value).join(",")
);

