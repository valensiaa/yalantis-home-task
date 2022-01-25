import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkoutOrder, fetchOrders } from "../../services/api";
import { redirectAfterCheckOut, removeProductsAfterCheckout } from "./reducer";


export const getOrders = createAsyncThunk("cart/getOrders", async () => {
  const response = await fetchOrders();
  return response.data;
});

export const checkOutThunk = (data, dispatch) => {
    const body = {
      order: {
        pieces: data
      }
    }
    checkoutOrder(body)
    dispatch(redirectAfterCheckOut("/orders"));
    dispatch(removeProductsAfterCheckout())
}

