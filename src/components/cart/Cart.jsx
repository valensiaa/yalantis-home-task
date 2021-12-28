import Counter from "../counter/Counter";
import style from "./Cart.module.css";
import iconDelete from '../../assets/delete-24.png'

const Cart = ({ titleGroup, listGroup, removeFromCart}) => {
  return (
    <div className={style.productsGroupOrigin}>
      <h3>{titleGroup}</h3>
      <ul className={style.productsList}>
        {listGroup.map((u) => (
          <li key={u.id}>
            <p className={style.titleProduct}>{u.name}</p>
            <div className={style.counterBlock}>
              <Counter id={u.id} count={u.quantity}/>
            </div>
            <span className={style.colorPrice}> {u.price}$</span>
            <div className={style.deleteIcon} onClick={()=>removeFromCart(u.id)}>
              <img src={iconDelete} alt="delete-product"/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
