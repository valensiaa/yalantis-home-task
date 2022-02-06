import { createSlice } from "@reduxjs/toolkit";
import { checkoutActions, getOrdersActions } from "./constants";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
    orders: [],
    loading: false,
    error: "",
    redirect: null,
  },
  reducers: {
    // Change logic according to HM#4
    // removeProductsAfterCheckout: (state) => {
    //   state.cartProducts = [];
    // },
    addToCart: (state, action) => {
      action.payload = { ...action.payload, quantity: 1 };
      state.cartProducts = [...state.cartProducts, action.payload];
    },
    setCurrentCountForId: (state, action) => {
      state.cartProducts = state.cartProducts.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = action.payload.count;
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (obj) => obj.id !== action.payload
      );
    },
    setEmptyRedirect: (state) => {
      state.redirect = null
    }
    // Change logic according to HM#4
    // redirectAfterCheckOut: (state, action) => {
    //   state.redirect = action.payload
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutActions.start, (state) => {
        state.loading = true;
      })
      .addCase(checkoutActions.success, (state, action) => {
        const {stringRedirect} = action.payload
        state.loading = false;
        state.redirect = stringRedirect
        state.cartProducts = []
      })
      .addCase(checkoutActions.error, (state, action) => {
        state.error = action;
        state.loading = false;
      })
      .addCase(getOrdersActions.start, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersActions.success, (state, action) => {
        state.loading = false;
        state.orders = action.payload.reverse();
      });

    // Change logic according to HM#4
    //   builder
    //     .addCase(getOrders.pending, (state) => {
    //       state.loading = true
    //     })
    //     .addCase(getOrders.fulfilled, (state, action) => {
    //       state.loading = false;
    //       state.orders = action.payload.items.reverse()
    //     })
    //     .addCase(getOrders.rejected, (state, action) => {
    //       state.error = action.error.message
    //       state.loading=false
    //     })
  },
});

export const {
  setEmptyRedirect,
  addToCart,
  setCurrentCountForId,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;