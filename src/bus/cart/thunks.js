import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrders } from "../../services/api";

// Change logic according to HM#4
//import { checkoutOrder} from "../../services/api";

// Change logic according to HM#4
//import { redirectAfterCheckOut, removeProductsAfterCheckout } from "./reducer";


export const getOrders = createAsyncThunk("cart/getOrders", async () => {
  const response = await fetchOrders();
  return response.data;
});


// Change logic according to HM#4

// export const checkOutThunk = (data, dispatch) => {
//     const body = {
//       order: {
//         pieces: data
//       }
//     }
//     checkoutOrder(body)
//     dispatch(redirectAfterCheckOut("/orders"));
//     dispatch(removeProductsAfterCheckout())
// }


