import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrigin, fetchData } from "../../services/api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (paramsQ) => {
    const response = await fetchData(paramsQ)
    return response.data;
  }
);

export const getOrigins = createAsyncThunk("products/getOrigins", async () => {
  const response = await fetchOrigin();
  return response.data;
});
