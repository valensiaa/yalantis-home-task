import { useCallback } from "react";
import style from "./Cart.module.css";
import Cart from "../../components/cart/Cart";
import { removeFromCart } from "../../bus/cart/reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  sumProducts,
  nProducts,
  groupedProducts,
} from "../../bus/cart/selectors";

const CartContainer = () => {
  const dispatch = useDispatch();

  const nCartProducts = useSelector(nProducts);
  const sumCartProducts = useSelector(sumProducts);
  const groupedProductsInCart = useSelector(groupedProducts);

  const removeFromCartCb = useCallback(
    (id) => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );

  return (
    <div className={style.cartBlock}>
      <h1>Cart</h1>
      {Object.keys(groupedProductsInCart).length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        Object.entries(groupedProductsInCart).map((elem) => (
          <Cart
            key={elem.id}
            titleGroup={elem[0]}
            listGroup={elem[1]}
            removeFromCart={removeFromCartCb}
          />
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
