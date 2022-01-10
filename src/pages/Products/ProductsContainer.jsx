import { useEffect, useCallback } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import style from "./Products.module.css";
import { addToCart } from "../../bus/cart/reducer";
import { changeDate } from "../../utils/helpers/date";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../bus/products/thunks";
import FilterFieldsContainer from "./FilterFields/FilterFieldsContainer";
import Loader from "../../components/loader/Loader";
import { paramsQuery, stateProducts } from "../../bus/products/selectors";
import { selectCartIds } from "../../bus/cart/selectors";

const ProductsContainer = () => {
  const state = useSelector(stateProducts);
  const params = useSelector(paramsQuery);
  const { products, loading, error } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(params));
  }, [dispatch, params]);

  const cartIdsArray = useSelector(selectCartIds);

  const addToCartProductCb = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  return (
    <div className={style.productsBlock}>
      <h1>Products</h1>
      <FilterFieldsContainer />
      <div className={style.productsItems}>
        {error !== "" ? (
          <div className={style.errorMessage}>{error}</div>
        ) : loading ? (
          <Loader />
        ) : (
          products.map((p) => (
            <ProductCard
              cartIdsArray={cartIdsArray}
              key={p.id}
              product={p}
              changeDate={changeDate}
              addToCart={addToCartProductCb}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsContainer;
