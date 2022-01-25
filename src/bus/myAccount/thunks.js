import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, fetchOrigin } from "../../services/api";

export const setMyProducts = createAsyncThunk(
  "myAccount/setMyProducts",
  async (paramsQ) => {
    const params = {
      page: paramsQ.currentPage,
      perPage: paramsQ.productsPerPage,
      origins: paramsQ.filteredByOrigins,
      minPrice: paramsQ.minPrice,
      maxPrice: paramsQ.maxPrice,
      editable: true,
    };
    const response = await fetchData(params);
    return response.data;
  }
);

export const getOrigins = createAsyncThunk("myAccount/getOrigins", async () => {
  const response = await fetchOrigin();
  return response.data;
});
