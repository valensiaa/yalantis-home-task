import { useSelector } from "react-redux";
import style from "./CartIcon.module.css";
import { Link, useLocation } from "react-router-dom";
import { sumProducts } from "../../bus/cart/selectors";

const CartIcon = () => {
   const location = useLocation();
   const { pathname } = location;

  const sumProductsInCart = useSelector(sumProducts);

  return ( pathname !== "/cart" && 
    (
      <div className={style.cartIconBlock}>
        <Link to={"/cart"}>
          <div>Cart</div>
          <span>{sumProductsInCart}$</span>
        </Link>
      </div>
    )
  );
};

export default CartIcon;
