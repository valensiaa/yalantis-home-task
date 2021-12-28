import { useEffect, useCallback } from "react";
import ProductInfo from "../../components/productInfo/ProductInfo";
import { useParams } from "react-router";
import { changeDate } from "../../utils/helpers/date";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../bus/cart/reducer";
import { fetchProductInfo } from "../../bus/productInfo/thunks";


const ProductInfoContainer = () => {
  //debugger
  const dispatch = useDispatch();
  let { productId } = useParams();
  const productInfo = useSelector(state => state.productInfo.product)

  useEffect(() => {
    fetchProductInfo(productId, dispatch)
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
