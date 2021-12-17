import { useEffect, useState, useContext, useCallback } from "react";
import ProductInfo from "../../components/productInfo/ProductInfo";
import { Store } from "../../context/storeContext";
import { useParams } from "react-router";
import { changeDate } from "../../utils/helpers/date";
import { fetchProduct } from "../../services/api";
import { addToCart } from "../../bus/products/reducer";

const ProductInfoContainer = () => {
  const { dispatch } = useContext(Store);

  const [data, setData] = useState({});
  let { productId } = useParams();

  useEffect(() => {
    fetchProduct(productId).then((data) => setData(data.data));
  }, []);

  const addToCartProduct = useCallback(() => {
    dispatch(addToCart(data));
  }, [data]);

  return (
    <ProductInfo
      productInfo={data}
      changeDate={changeDate}
      addToCart={addToCartProduct}
    />
  );
};

export default ProductInfoContainer;
