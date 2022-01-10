import style from "./Fields.module.css";

const MinMaxField = ({ onHandleMinPrice, onHandleMaxPrice, minPrice, maxPrice }) => {
  return (
    <div className={style.minMaxBlock}>
      <input
        type="number"
        value = {minPrice}
        placeholder={"min price"}
        onChange={(e) => onHandleMinPrice(e)}
      />
      <input
        type="number"
        value = {maxPrice}
        placeholder={"max price"}
        onChange={(e) => onHandleMaxPrice(e)}
      />
    </div>
  );
};

export default MinMaxField;
