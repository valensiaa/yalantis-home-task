import { useRef } from "react";
import style from "./fields.module.css";

const MinMaxField = ({onHandleMinPrice, onHandleMaxPrice}) => {

  const watchMinValue = useRef()
  const watchMaxValue = useRef()

  return (
    <div className={style.minMaxBlock}>
      <input
        type="number"
        ref={watchMinValue}
        placeholder={"min price"}
        onChange={(e) => onHandleMinPrice(e, watchMaxValue)}
      />
      <input
        type="number"
        ref={watchMaxValue}
        placeholder={"max price"}
        onChange={(e) => onHandleMaxPrice(e, watchMinValue)}
      />
    </div>
  );
};

export default MinMaxField;
