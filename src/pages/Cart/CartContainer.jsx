import { useMemo, useContext } from "react";
import { Store } from "../../context/storeContext";
import Cart from "../../components/cart/Cart";
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
    <Cart
      cartProducts={groupedProductsInCart}
      sumCartProducts={sumCartProducts}
      nCartProducts={nCartProducts}
    />
  );
};

export default CartContainer;
