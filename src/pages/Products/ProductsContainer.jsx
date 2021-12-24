import { useEffect, useCallback } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import style from './Products.module.css'
//import { Store } from "../../context/storeContext";
import { setProducts, addToCart } from "../../bus/products/reducer";
import { changeDate } from "../../utils/helpers/date";
import { fetchData } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";

const ProductsContainer = () => {
  const products = useSelector(state => state.products.products)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchData().then((data) => dispatch(setProducts(data.items)));
  }, []);

  const addToCartProduct = useCallback((product) => {
    dispatch(addToCart(product));
  }, []);
 console.log(products)
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
