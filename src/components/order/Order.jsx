import { useEffect, useState } from "react";
import { fetchOrderDetails } from "../../services/api";
import style from "./Order.module.css";
import productImg from "../../assets/default-product.png";
import { Link } from "react-router-dom";

const Order = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    fetchOrderDetails(orderId)
      .then((response) => response.data)
      .then((data) => setOrderDetails(data.pieces));
  }, [orderId]);

  console.log(orderDetails)
  const ordersum = orderDetails.map((item)=>item.count * item.product.price).reduce((prev, curr) => prev + curr, 0)

  return (
    <div className={style.orderDetailsContainer}>
      {orderDetails.map((p) => (
        <div key={p.id} className={style.orderProduct}>
          <div className={style.orderProductImg}>
            <Link to={"/products/" + p.product.id}>
              <img src={productImg} alt="product" />
            </Link>
          </div>
          <div className={style.orderProductTitle}>
            <Link to={"/products/" + p.product.id}>
              <p>{p.product.name}</p>
            </Link>
            <span>{p.product.origin}</span>
          </div>
          <div>
            <span>{p.count}</span>
          </div>
          <div>
            <span>{p.product.price}$</span>
          </div>
        </div>
      ))}
      <div className={style.sumOrder}>Summary <b>{ordersum}$</b></div>
    </div>
  );
};

export default Order;
