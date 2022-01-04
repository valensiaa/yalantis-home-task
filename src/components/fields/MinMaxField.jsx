import style from "./Fields.module.css";

const MinMaxField = ({onHandleMinPrice, onHandleMaxPrice}) => {

  return (
    <div className={style.minMaxBlock}>
      <input
        type="number"
        placeholder={"min price"}
        onChange={(e) => onHandleMinPrice(e)}
      />
      <input
        type="number"
        placeholder={"max price"}
        onChange={(e) => onHandleMaxPrice(e)}
      />
    </div>
  );
};

export default MinMaxField;
