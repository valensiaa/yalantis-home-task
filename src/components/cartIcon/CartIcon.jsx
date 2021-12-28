import { Link, useLocation } from "react-router-dom";
import style from "./CartIcon.module.css";
import { useMemo } from "react";
import { sumProducts } from "../../utils/helpers/sumProducts";
import { filterUnique } from '../../utils/helpers/filterProducts'
import { useSelector } from "react-redux";

const CartIcon = () => {
  const location = useLocation();
  const {pathname} = location

  const cartProducts = useSelector(state => state.cart.cartProducts)

  const sum = useMemo(() => {
    return sumProducts(filterUnique(cartProducts));
  }, [cartProducts]);

  return pathname !== "/cart" && 
        <div className={style.cartIconBlock}>
          <Link to={"/cart"}>
            <div>Cart</div>
            <span>{sum}$</span>
          </Link>
        </div>
};

export default CartIcon;
