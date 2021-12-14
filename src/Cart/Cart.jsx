import style from "./Cart.module.css";


const Cart = (props) => {
    
  return (
    <div className={style.cartBlock}>
      <h1>Cart</h1>
      {Object.keys(props.cartProducts).length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        Object.entries(props.cartProducts).map((elem) => (
          <div key={elem.id} className={style.productsGroupOrigin}>
            <h3 key={elem.id}>{elem[0]}</h3>
            <ul key={elem.id} className={style.productsList}>
              {elem[1].map((u) => (
                <li key={u.id}>
                  {u.name}
                  <span className={style.colorPrice}> {u.price}$</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      <p className={style.productsSum}>
        Currently {props.nCartProducts} products in the cart with summary
        <span>{props.sumCartProducts}$</span>
      </p>
    </div>
  );
};

export default Cart;
