import { useCallback, useMemo } from "react";
import Cart from "../../components/cart/Cart";
import style from "./Cart.module.css";
import { filterUnique } from "../../utils/helpers/filterProducts";
import { sumProducts } from "../../utils/helpers/sumProducts";
import { groupProductsInCart } from "../../utils/helpers/groupProducts";
import { useDispatch, useSelector } from "react-redux";
import {removeFromCart} from '../../bus/cart/reducer'

const CartContainer = () => {
  const cartProducts = useSelector(state => state.cart.cartProducts)
  const dispatch = useDispatch()

  const nCartProducts = filterUnique(cartProducts).map((item) => item.quantity).reduce((prev, curr) => prev + curr, 0);
  const sumCartProducts = sumProducts(cartProducts);

  const groupedProductsInCart = useMemo(() => {
    return groupProductsInCart(cartProducts);
  }, [cartProducts]);

  const removeFromCartCb = useCallback((id) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);

  return (
    <div className={style.cartBlock}>
      <h1>Cart</h1>
      {Object.keys(groupedProductsInCart).length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        Object.entries(groupedProductsInCart).map((elem) => (
          <Cart key={elem.id} titleGroup={elem[0]} listGroup={elem[1]} removeFromCart={removeFromCartCb}/>
        ))
      )}
      <p className={style.productsSum}>
        Currently {nCartProducts} products in the cart with summary
        <span> {sumCartProducts}$</span>
      </p>
    </div>
  );
};

export default CartContainer;
