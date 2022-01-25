import { useState, useRef } from "react";
import style from "./Counter.module.css";
import { setCurrentCountForId } from "../../bus/cart/reducer";
import { useDispatch } from "react-redux";

const Counter = ({ id, countQ }) => {
  const [count, setCount] = useState(countQ);
  const dispatch = useDispatch();

  const spanCount = useRef();
  const onCountChangeDec = (productId) => {
    dispatch(
      setCurrentCountForId({
        id: productId,
        count: +spanCount.current.innerText - 1,
      })
    );
    setCount(count - 1);
  };
  const onCountChangeInc = (productId) => {
    dispatch(
      setCurrentCountForId({
        id: productId,
        count: +spanCount.current.innerText + 1,
      })
    );
    setCount(count + 1);
  };

  return (
    <>
      <button
        disabled={count <= 1 ? true : false}
        className={style.buttonDec}
        onClick={() => onCountChangeDec(id)}
      >
        -
      </button>
      <span ref={spanCount} className={style.valueProduct}>
        {count}
      </span>
      <button
        className={style.buttonInc}
        onClick={() => onCountChangeInc(id)}
      >
        +
      </button>
    </>
  );
};

export default Counter;
