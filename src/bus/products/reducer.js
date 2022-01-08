import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./thunks";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: "",
    origins: [],
    totalProductsCount: 0,
    filters: {
      filteredByOrigins: [],
      currentPage: 1,
      productsPerPage: 20,
      minPrice: null,
      maxPrice: null,
    },
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
    setFilteredArrayByOrigins: (state, action) => {
      state.filters.filteredByOrigins = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.filters.currentPage = action.payload;
    },
    setProductsPerPage: (state, action) => {
      state.filters.productsPerPage = action.payload;
    },
    setTotalProductsCount: (state, action) => {
      state.totalProductsCount = action.payload;
    },
    setMinPrice: (state, action) => {
      state.filters.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.filters.maxPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const {
  setProducts,
  setOrigins,
  setCurrentPage,
  setTotalProductsCount,
  setMinPrice,
  setMaxPrice,
  setProductsPerPage,
  setFilteredArrayByOrigins,
} = productsSlice.actions;
export default productsSlice.reducer;
