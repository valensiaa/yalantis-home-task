import React, { useEffect, useCallback } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import style from "./Products.module.css";
import { addToCart } from "../../bus/cart/reducer";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../bus/products/thunks";
import FilterFieldsContainer from "./FilterFields/FilterFieldsContainer";
import Loader from "../../components/loader/Loader";
import { stateProducts } from "../../bus/products/selectors";
import { selectCartIds } from "../../bus/cart/selectors";
import Button from "../../components/button/Button";
import { useSearchParams } from "react-router-dom";

const ProductsContainer = () => {
  
  const state = useSelector(stateProducts);
  const { products, loading, error } = state;
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams(); 
  const paramsV = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch(getProducts(paramsV));
  }, [dispatch, searchParams]);


  const cartIdsArray = useSelector(selectCartIds);
  const addToCartHandler = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  return (
    <div className={style.productsBlock}>
      <h1>Products</h1>
      <FilterFieldsContainer/>
      <div className={style.productsItems}>
        {error !== "" ? (
          <div className={style.errorMessage}>{error}</div>
        ) : loading ? (
          <Loader />
        ) : (
          products.map((p) => (
            <ProductCard key={p.id} product={p}>
              <Button
                onClickHandler={addToCartHandler}
                title={
                  cartIdsArray.includes(p.id) ? "product added" : "add to cart"
                }
                product={p}
                inCart={cartIdsArray.includes(p.id) ? true : false}
                primaryButton={true}
              />
            </ProductCard>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsContainer;
