import { fetchOrigin, fetchData } from "../../services/api";
import {
  setProducts,
  setOrigins,
  setTotalProductsCount,
  setCurrentPage,
  setMaxPrice,
  setMinPrice,
  setProductsPerPage
} from "./reducer";

export const fetchProductsFirstRenderThunk = (dispatch, a, b, c, d) => {
  fetchOrigin().then((data) => dispatch(setOrigins(data.items)));
  fetchData(a, b, c, d).then((data) => {
    dispatch(setProducts(data.data.items));
    dispatch(setTotalProductsCount(data.data.totalItems));
  });
};

export const fetchProductsByFilters = (dispatch, a, b, c, d) => {
   dispatch(setCurrentPage(a))
   dispatch(setProductsPerPage(b))
   dispatch(setMinPrice(c))
   dispatch(setMaxPrice(d))
  fetchData(a, b, c, d).then((data) => {
    dispatch(setProducts(data.data.items));
    dispatch(setTotalProductsCount(data.data.totalItems));
  });
};

