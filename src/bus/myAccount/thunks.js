import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, fetchOrigin } from "../../services/api";

    
export const setMyProducts = createAsyncThunk(
  "myAccount/setMyProducts",
  async (paramsQ) => {
    const objForURL = {...paramsQ, editable:true}
    const response = await fetchData(objForURL);
    return response.data;
  }
);

export const getOrigins = createAsyncThunk("myAccount/getOrigins", async () => {
  const response = await fetchOrigin();
  return response.data;
});
