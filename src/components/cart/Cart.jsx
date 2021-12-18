import style from "./Cart.module.css";

const Cart = ({ titleGroup, listGroup }) => {
  return (
    <div className={style.productsGroupOrigin}>
      <h3>{titleGroup}</h3>
      <ul className={style.productsList}>
        {listGroup.map((u) => (
          <li key={u.id}>
            {u.name}
            <span className={style.colorPrice}> {u.price}$</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
