import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrigin, fetchData } from "../../services/api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (paramsQ) => {
    const params = {
      page: paramsQ.currentPage,
      perPage: paramsQ.productsPerPage,
      origins: paramsQ.filteredByOrigins,
      minPrice: paramsQ.minPrice,
      maxPrice: paramsQ.maxPrice,
    };
    const response = await fetchData(params);
    return response.data;
  }
);

export const getOrigins = createAsyncThunk("products/getOrigins", async () => {
  const response = await fetchOrigin();
  return response.data;
});
