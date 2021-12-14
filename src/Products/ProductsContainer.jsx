import { useEffect, useContext } from "react";
import Products from "./Products";
import * as axios from "axios";
import { Store } from "../context/createContext";
import { setProducts, addToCart } from "../context/products-reducer";
import {changeDate} from './actions'

const ProductsContainer = () => {
  const { state, dispatch } = useContext(Store);
  const { products } = state;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://yalantis-react-school-api.yalantis.com/api/v1/products`
      );
      dispatch(setProducts(result.data.items));
    };
    fetchData();
  }, []);

  return (
    <Products products={products} addToCart={addToCart} dispatch={dispatch} changeDate={changeDate} />
  );
};

export default ProductsContainer;
