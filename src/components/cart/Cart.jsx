import Counter from "../counter/Counter";
import style from "./Cart.module.css";
import iconDelete from "../../assets/delete-24.png";
import { Link } from "react-router-dom";

const Cart = ({ titleGroup, listGroup, removeFromCart }) => {
  return (
    <div className={style.productsGroupOrigin}>
      <h3>{titleGroup}</h3>
      <ul className={style.productsList}>
        {listGroup.map((u) => (
          <li key={u.id}>
            <Link className={style.titleProduct} to={"/products/" + u.id}>
              <p>{u.name}</p>
            </Link>
            <div className={style.counterBlock}>
              <Counter id={u.id} countQ={u.quantity} />
            </div>
            <span className={style.colorPrice}>{u.price * u.quantity}$</span>
            <div
              className={style.deleteIcon}
              onClick={() => removeFromCart(u.id)}
            >
              <img src={iconDelete} alt="delete-product" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
