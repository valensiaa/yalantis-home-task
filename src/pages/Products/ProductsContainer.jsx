import { useEffect, useContext, useCallback } from "react";
import Products from "../../components/products/Products";
import { Store } from "../../context/storeContext";
import { setProducts, addToCart } from "../../bus/products/reducer";
import { changeDate } from "../../utils/helpers/date";
import { fetchData } from "../../services/api";

const ProductsContainer = () => {
  const { state, dispatch } = useContext(Store);
  const { products } = state;

  useEffect(() => {
    fetchData().then((data) => dispatch(setProducts(data.items)));
  }, []);

  const addToCartProduct = useCallback((product) => {
    dispatch(addToCart(product));
  }, []);

  return (
    <Products
      products={products}
      addToCart={addToCartProduct}
      changeDate={changeDate}
    />
  );
};

export default ProductsContainer;
