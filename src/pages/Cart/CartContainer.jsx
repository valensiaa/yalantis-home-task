import { useCallback, useEffect } from "react";
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

// Change logic according to HM#4
//import { checkOutThunk } from "../../bus/cart/thunks";

import { ButtonStyled } from "../../components/button/ButtonStyled";
import { checkoutActions } from "../../bus/cart/constants";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const dataCartForOrder = useSelector(productsForOrder);
  const state = useSelector(stateCart);
  const { redirect } = state;
  const checkoutCb = useCallback(() => {
    // Change logic according to HM#4
    //checkOutThunk(dataCartForOrder, dispatch);

    const body = {
      order: {
        pieces: dataCartForOrder,
      },
    };
    dispatch(checkoutActions.init({ body }));
  }, [dispatch, dataCartForOrder]);

  useEffect(() => {
    if (redirect) navigate(redirect.url);
  }, [navigate, redirect]);

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
        <ButtonStyled
          primary
          onClick={checkoutCb}
          className={style.productsCheckout}
        >
          Checkout
        </ButtonStyled>
      )}
    </div>
  );
};

export default CartContainer;
