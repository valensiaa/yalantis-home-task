import { useEffect, useCallback, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import style from "./Products.module.css";
import { addToCart } from "../../bus/cart/reducer";
import { changeDate } from "../../utils/helpers/date";
import { useDispatch, useSelector } from "react-redux";
import { fetchOriginThunk } from "../../bus/products/thunks";
import FilterFieldsContainer from "./FilterFields/FilterFieldsContainer";
import { filteredProductsBySelect } from "../../utils/helpers/filterProductsBySelectValues";

const ProductsContainer = () => {
  const products = useSelector((state) => state.products.products);
  const [selectedValue, setSelectedValue] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOriginThunk(dispatch);
  }, [dispatch]);

  const handleChangeSelectOrigin = useCallback((e) => {
    setSelectedValue(e);
  }, []);
  const filteredProducts = filteredProductsBySelect(products, selectedValue);

  const addToCartProduct = useCallback((product) => {
    dispatch(addToCart(product));
  }, []);

  return (
    <div className={style.productsBlock}>
      <h1>Products</h1>
      <FilterFieldsContainer
        handleChangeSelectOrigin={handleChangeSelectOrigin}
        products={products}
      />
      <div className={style.productsItems}>
        {selectedValue.length === 0
          ? products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                changeDate={changeDate}
                addToCart={addToCartProduct}
              />
            ))
          : filteredProducts.map((p) => (
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
