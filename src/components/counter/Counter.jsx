import { useState, useRef } from "react";
import style from "./Counter.module.css";
import {setCurrentCountForId} from '../../bus/cart/reducer'
import { useDispatch } from "react-redux";

const Counter = ({ id }) => {
  const [count, setCount] = useState(1)
  const dispatch = useDispatch()

  const spanCount = useRef()
  const onCountChangeDec = (productId) => {
    
    dispatch(setCurrentCountForId({id:productId, count:+spanCount.current.innerText-1}))
    setCount(count-1)
  }
    const onCountChangeInc = (productId) => {
    dispatch(setCurrentCountForId({id:productId, count:+spanCount.current.innerText+1}))
    setCount(count+1)
  }

  return (
    <>
      <button
        disabled = {count <=1 ? true : false}
        className={style.buttonDec}
        aria-label="Decrement value"
        onClick={()=>onCountChangeDec(id)}
      >
        -
      </button>
      <span ref={spanCount} className={style.valueProduct}>{count}</span>
      <button
        className={style.buttonInc}
        aria-label="Increment value"
        onClick={()=>onCountChangeInc(id)}
      >
        +
      </button>
    </>
  );
};

export default Counter;
