import { Link, useLocation } from "react-router-dom";
import style from "./Cart.module.css";
import { Store } from "./../context/createContext";
import { useContext, useMemo } from "react";
import { sumProducts, filterUnique } from "./actions";

const CartIcon = () => {
  const location = useLocation();

  const { state } = useContext(Store);
  const { cartProducts } = state;

  const sum = useMemo(() => {
    return sumProducts(filterUnique(cartProducts));
  }, [cartProducts]);

  return (
    <>
      {location.pathname === "/cart" ? null : (
        <div className={style.cartIconBlock}>
          <Link to={"/cart"}>
            <div>Cart</div>
            <span>{sum}$</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default CartIcon;
