import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrigin } from "../../services/api";

export const getOrigins = createAsyncThunk("origins/getOrigins", async () => {
  const response = await fetchOrigin();
  return response.data;
});
