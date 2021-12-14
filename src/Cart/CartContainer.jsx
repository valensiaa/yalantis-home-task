import { useMemo, useContext } from "react";
import { Store } from "../context/createContext";
import Cart from "./Cart";
import { groupProductsInCart, filterUnique, sumProducts } from "./actions";

const CartContainer = () => {
   
  const { state } = useContext(Store);
  const { cartProducts } = state;

  const nCartProducts = filterUnique(cartProducts).length;
  const sumCartProducts = sumProducts(cartProducts);

  const groupedProductsInCart = useMemo(() => {
    return groupProductsInCart(cartProducts);
  }, [cartProducts]);

  return (
    <Cart
      cartProducts={groupedProductsInCart}
      sumCartProducts={sumCartProducts}
      nCartProducts={nCartProducts}
    />
  );
};

export default CartContainer;
