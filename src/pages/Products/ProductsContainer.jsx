import { useEffect, useCallback, useState, useMemo } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import style from "./Products.module.css";
import { addToCart } from "../../bus/cart/reducer";
import { changeDate } from "../../utils/helpers/date";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsFirstRenderThunk } from "../../bus/products/thunks";
import FilterFieldsContainer from "./FilterFields/FilterFieldsContainer";
import { filteredProductsBySelect } from "../../utils/helpers/filterProductsBySelectValues";
import { setProducts } from "../../bus/products/reducer";

const ProductsContainer = () => {
  const state = useSelector((state) => state.products);
  const { products, currentPage, productsPerPage, minPrice, maxPrice } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductsFirstRenderThunk(
      dispatch,
      currentPage,
      productsPerPage,
      minPrice,
      maxPrice
    );
  }, [dispatch]);

  const handleChangeSelectOrigin = useCallback((e) => {
    const filteredProducts = filteredProductsBySelect(products, e)
      if(filteredProducts.length !== 0) {
    dispatch(setProducts(filteredProducts));
  }
  }, [dispatch, products]);


  const addToCartProduct = useCallback((product) => {
    dispatch(addToCart(product));
  }, []);

  return (
    <div className={style.productsBlock}>
      <h1>Products</h1>
      <FilterFieldsContainer handleChangeSelectOrigin={handleChangeSelectOrigin}/>
      <div className={style.productsItems}>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            changeDate={changeDate}
            addToCart={addToCartProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsContainer;
