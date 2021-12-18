import { useMemo, useContext } from "react";
import { Store } from "../../context/storeContext";
import Cart from "../../components/cart/Cart";
import style from "./Cart.module.css";
import { filterUnique } from "../../utils/helpers/filterProducts";
import { sumProducts } from "../../utils/helpers/sumProducts";
import { groupProductsInCart } from "../../utils/helpers/groupProducts";

const CartContainer = () => {
  const { state } = useContext(Store);
  const { cartProducts } = state;

  const nCartProducts = filterUnique(cartProducts).length;
  const sumCartProducts = sumProducts(cartProducts);

  const groupedProductsInCart = useMemo(() => {
    return groupProductsInCart(cartProducts);
  }, [cartProducts]);

  return (
    <div className={style.cartBlock}>
      <h1>Cart</h1>
      {Object.keys(groupedProductsInCart).length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        Object.entries(groupedProductsInCart).map((elem) => (
          <Cart key={elem.id} titleGroup={elem[0]} listGroup={elem[1]} />
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
