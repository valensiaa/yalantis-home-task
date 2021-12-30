import { useDispatch, useSelector } from "react-redux";
import style from "./FilterFields.module.css";
import MinMaxField from "../../../components/fields/MinMaxField";

import { useEffect, useCallback } from "react";
import Select from "react-select";
import { productsPerPage } from "../../../utils/helpers/createObjSelectPages";
import {
  fetchOriginThunk,
  fetchProductsThunk,
} from "../../../bus/products/thunks";

const FilterFieldsContainer = ({ handleChangeSelectOrigin }) => {
  const origins = useSelector((state) => state.products.origins);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOriginThunk(dispatch);
  }, [dispatch]);

  const handleChangeSelectProductsPerPage = (e) => {
    fetchProductsThunk(dispatch, e.value, null, null);
  };

  const handleMinPrice = useCallback((e, watchMaxValue) => {
    const value = e.currentTarget.value;
    const maxValue = +watchMaxValue.current.value;
    !maxValue
      ? fetchProductsThunk(dispatch, null, value, null)
      : fetchProductsThunk(dispatch, null, value, maxValue);
  }, []);

  const handleMaxPrice = useCallback((e, watchMinValue) => {
    const value = e.currentTarget.value;
    const minValue = +watchMinValue.current.value;
    !minValue
      ? fetchProductsThunk(dispatch, null, null, value)
      : fetchProductsThunk(dispatch, null, minValue, value);
  }, []);

  return (
    <div className={style.filterProductsBlock}>
      <MinMaxField
        onHandleMinPrice={handleMinPrice}
        onHandleMaxPrice={handleMaxPrice}
      />
      <Select
        isMulti
        name="origin"
        options={origins}
        placeholder="filter products by origin..."
        onChange={handleChangeSelectOrigin}
      />
      <Select
        className="basic-single"
        name="pages"
        options={productsPerPage([10, 25, 50])}
        placeholder="products on page..."
        onChange={handleChangeSelectProductsPerPage}
      />
    </div>
  );
};

export default FilterFieldsContainer;
