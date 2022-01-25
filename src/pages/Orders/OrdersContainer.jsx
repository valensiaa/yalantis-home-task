import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateCart } from "../../bus/cart/selectors";
import { getOrders } from "../../bus/cart/thunks";
import Loader from "../../components/loader/Loader";
import style from "./Orders.module.css";
import useModal from "../../hooks/useModal";
import Modal from "../../components/modal/Modal";
import Order from "../../components/order/Order";
import { changeDate } from "../../utils/helpers/date";

const OrdersContainer = ({ ...props }) => {
  const state = useSelector(stateCart);
  const { orders, loading, error } = state;
  const dispatch = useDispatch();

  const { isShowing, toggle } = useModal();
  const [orderId, setOrderId] = useState(null);
  const showOrderHandler = useCallback(
    (id) => {
      setOrderId(id);
      toggle();
    },
    [toggle]
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div className={style.ordersBlock}>
      <h1>My orders</h1>
      {error !== "" ? (
        <div className={style.errorMessage}>{error}</div>
      ) : loading ? (
        <Loader />
      ) : (
        <div className={style.ordersList}>
          <ul>
            {orders.map((o) => (
              <li key={o.id} className={style.orderListItem}>
                <div
                  className={style.orderItem}
                  onClick={() => showOrderHandler(o.id)}
                >
                  <span>
                    Order<span className={style.orderNumber}> № {o.id}</span>
                  </span>
                  <span>{changeDate(o.createdAt)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Modal hide={toggle} isShowing={isShowing} title={`Order №${orderId}`}>
        <Order {...props} orderId={orderId} />
      </Modal>
    </div>
  );
};

export default OrdersContainer;
