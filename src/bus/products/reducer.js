import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getOrigins } from "./thunks";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: "",
    originsArr: [],
    totalProductsCount: 0,
    filters: {
      origins: "",
      page: 1,
      perPage: 20,
      minPrice: "",
      maxPrice: "",
    },
  },
  reducers: {
    setFilteredStrByOrigins: {
      reducer: (state, action) => {
        state.filters.origins = action.payload;
      },
      prepare: (params) => {
        return { payload: params.map((o) => o.value).join(",") };
      },
    },
    setCurrentPage: (state, action) => {
      state.filters.page = action.payload;
    },
    setProductsPerPage: (state, action) => {
      state.filters.perPage = action.payload;
    },
    setMinPrice: (state, action) => {
      state.filters.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.filters.maxPrice = action.payload;
    },
    reset: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.items;
        state.totalProductsCount = action.payload.totalItems;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getOrigins.fulfilled, (state, action) => {
        state.originsArr = action.payload.items.map((o) => ({
          value: o.value,
          label: o.displayName,
        }));
      });
  },
});

export const {
  reset,
  setOrigins,
  setCurrentPage,
  setMinPrice,
  setMaxPrice,
  setProductsPerPage,
  setFilteredStrByOrigins,
} = productsSlice.actions;
export default productsSlice.reducer;
