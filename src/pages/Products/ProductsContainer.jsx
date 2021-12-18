import { useEffect, useContext, useCallback } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import style from './Products.module.css'
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
    <div className={style.productsBlock}>
      <h1>Products</h1>
      <div className={style.productsItems}>
        {products.map(p => <ProductCard key={p.id} product ={p} changeDate={changeDate} addToCart={addToCartProduct}/>)}
      </div>
    </div>
  );
};

export default ProductsContainer;
