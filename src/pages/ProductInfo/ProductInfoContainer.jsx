import { useEffect, useCallback } from "react";
import ProductInfo from "../../components/productInfo/ProductInfo";
import { useParams } from "react-router";
import { changeDate } from "../../utils/helpers/date";
import { fetchProduct } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../bus/products/reducer";
import { setProduct } from "../../bus/productInfo/reducer";


const ProductInfoContainer = () => {
  const { dispatch } = useDispatch();
  let { productId } = useParams();
  const productInfo = useSelector(state => state.productInfo.product)


  useEffect(() => {
    fetchProduct(productId).then((data) => setProduct(data.data));
  }, []);

  const addToCartProduct = useCallback(() => {
    dispatch(addToCart(productInfo));
  }, [productInfo]);

  return (
    <ProductInfo
      productInfo={productInfo}
      changeDate={changeDate}
      addToCart={addToCartProduct}
    />
  );
};

export default ProductInfoContainer;
