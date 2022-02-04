import style from "./Fields.module.css";
import { MinMaxInput } from "./PaginationButtonStyled";

const MinMaxField = ({ refMinPrice, onHandleMinPrice, onHandleMaxPrice, minPrice, maxPrice, inputBorder }) => {
  return (
    <div className={style.minMaxBlock}>
      <MinMaxInput
        inputBorder={inputBorder}
        type="number"
        value = {minPrice}
        placeholder={"min price"}
        onChange={(e) => onHandleMinPrice(e)}
      />
      <MinMaxInput
      inputBorder={inputBorder}
        type="number"
        value = {maxPrice}
        placeholder={"max price"}
        onChange={(e) => onHandleMaxPrice(e)}
      />
    </div>
  );
};

export default MinMaxField;
