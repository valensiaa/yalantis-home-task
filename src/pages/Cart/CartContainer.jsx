import { useCallback } from "react";
import style from "./Cart.module.css";
import Cart from "../../components/cart/Cart";
import { removeFromCart } from "../../bus/cart/reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  sumProducts,
  nProducts,
  groupedProducts,
  productsForOrder,
  stateCart,
} from "../../bus/cart/selectors";
import { Redirect } from "react-router";
import { checkOutThunk } from "../../bus/cart/thunks";
import { ButtonStyled } from "../../components/button/ButtonStyled";

const CartContainer = () => {
  const dispatch = useDispatch();

  const nCartProducts = useSelector(nProducts);
  const sumCartProducts = useSelector(sumProducts);
  const groupedProductsInCart = useSelector(groupedProducts);
  const state = useSelector(stateCart);
  const { redirect } = state;

  const removeFromCartCb = useCallback(
    (id) => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );

  const dataCartForOrder = useSelector(productsForOrder);
  const checkoutCb = useCallback(() => {
    checkOutThunk(dataCartForOrder, dispatch);
  }, [dispatch, dataCartForOrder]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

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
      {nCartProducts !== 0 && (
        <ButtonStyled primary onClick={() => checkoutCb()} className={style.productsCheckout}>
          Checkout
        </ButtonStyled>
      )}
    </div>
  );
};

export default CartContainer;
