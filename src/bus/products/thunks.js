import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrigin, fetchData, fetchAllDataFirst } from "../../services/api";
import { setProducts, setOrigins, setTotalProductsCount } from "./reducer";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (dispatch) => {
    return fetchAllDataFirst().then((data) => {
      dispatch(setProducts(data.data.items));
      dispatch(setTotalProductsCount(data.data.totalItems));
    });
  }
);

export const fetchOriginThunk = (dispatch) => {
  fetchOrigin().then((data) => dispatch(setOrigins(data.items)));
};

export const fetchProductsByFilters = (dispatch, a, b, c, d, e) => {
  fetchData(a, b, c, d, e).then((data) => {
    dispatch(setProducts(data.data.items));
    dispatch(setTotalProductsCount(data.data.totalItems));
  });
};
