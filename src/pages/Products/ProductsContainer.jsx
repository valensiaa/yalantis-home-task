import { useEffect, useCallback, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import style from "./Products.module.css";
import { addToCart } from "../../bus/cart/reducer";
import { changeDate } from "../../utils/helpers/date";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchOriginThunk } from "../../bus/products/thunks";
import { filteredProductsBySelect } from "../../utils/helpers/filterProductsBySelectValues";

const ProductsContainer = () => {
  const products = useSelector((state) => state.products.products);
  const origins = useSelector((state) => state.products.origins);
  const [selectedValue, setSelectedValue] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOriginThunk(dispatch);
  }, []);

  const handleChange = (e) => {
    setSelectedValue(e);
  };

  const filteredProducts = filteredProductsBySelect(products, selectedValue);

  const addToCartProduct = useCallback((product) => {
    dispatch(addToCart(product));
  }, []);

  return (
    <div className={style.productsBlock}>
      <h1>Products</h1>
      <div className={style.filterProductsBlock}>
        <div className={style.minMaxBlock}>
          <input defaultValue={'min price'}/>
          <input defaultValue={'max price'}/>
        </div>
      <Select
        isMulti
        name="origin"
        options={origins}
        placeholder="filter products by origin..."
        onChange={handleChange}
      />
      </div>

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
