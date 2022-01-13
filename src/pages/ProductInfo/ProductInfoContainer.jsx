import { useEffect, useCallback, useMemo } from "react";
import ProductInfo from "../../components/productInfo/ProductInfo";
import { useParams } from "react-router";
import { changeDate } from "../../utils/helpers/date";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../bus/cart/reducer";
import { fetchProductInfo } from "../../bus/productInfo/thunks";
import {stateProductInfo } from "../../bus/productInfo/selectors";
import { selectCartIds} from "../../bus/cart/selectors";


const ProductInfoContainer = () => {
  const dispatch = useDispatch();
  let { productId } = useParams();
  const productInfo = useSelector(stateProductInfo)

  useEffect(() => {
    fetchProductInfo(productId, dispatch)
  }, [productId, dispatch]);

  const cartIdsArray = useSelector(selectCartIds)
  const isInArray = useMemo(() => {
    return cartIdsArray.includes(productId)
  },[productId, cartIdsArray])
  
  const addToCartProduct = useCallback(() => {
    dispatch(addToCart(productInfo));
  }, [dispatch,productInfo]);

  return (
    <ProductInfo
      cartIdsArray={cartIdsArray}
      isInArray = {isInArray}
      productInfo={productInfo}
      changeDate={changeDate}
      addToCart={addToCartProduct}
    />
  );
};

export default ProductInfoContainer;
