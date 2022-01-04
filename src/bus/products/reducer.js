import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    origins: [],
    currentPage: 1,
    productsPerPage: 20,
    minPrice: null,
    maxPrice: null,
    totalProductsCount: 0,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setOrigins: (state, action) => {
      state.origins = action.payload.map((o) => ({
        value: o.value,
        label: o.displayName,
      }));
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setProductsPerPage: (state, action) => {
      state.productsPerPage = action.payload;
    },
    setTotalProductsCount: (state, action) => {
      state.totalProductsCount = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
  },
});

export const {
  setProducts,
  setOrigins,
  setCurrentPage,
  setTotalProductsCount,
  setMinPrice,
  setMaxPrice,
  setProductsPerPage
} = productsSlice.actions;
export default productsSlice.reducer;
