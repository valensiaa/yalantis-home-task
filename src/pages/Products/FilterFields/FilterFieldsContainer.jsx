import { useDispatch, useSelector } from "react-redux";
import style from "./FilterFields.module.css";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { selectStyles } from "./selectStyles";
import MinMaxField from "../../../components/fields/MinMaxField";
import { productsPerPageFilter } from "../../../utils/helpers/createObjSelectPages";
import { getOrigins } from "../../../bus/products/thunks";
import PaginationField from "../../../components/fields/PaginationField";
import {
  setFilteredStrByOrigins,
  setMinPrice,
  setMaxPrice,
  setProductsPerPage,
  setCurrentPage,
  reset,
} from "../../../bus/products/reducer";
import { stateProducts } from "../../../bus/products/selectors";

const FilterFieldsContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector(stateProducts);

  const { origins, totalProductsCount } = state;
  const { currentPage, productsPerPage } = state.filters;

  const [selectStateOrigin, setSelectStateOrigin] = useState([]);
  const [selectStatePerPage, setSelectStatePerPage] = useState([]);
  const [minPriceState, setMinPriceState] = useState("");
  const [maxPriceState, setMaxPriceState] = useState("");

  useEffect(() => {
    dispatch(getOrigins());
  }, [dispatch]);

  let pagesCount = Math.ceil(totalProductsCount / productsPerPage);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const handleMaxPriceCb = useCallback(
    (e) => {
      const value = +e.currentTarget.value;
      setMaxPriceState(value);
      dispatch(setMaxPrice(value));
    },
    [dispatch]
  );

  const handleMinPriceCb = useCallback(
    (e) => {
      const value = +e.currentTarget.value;
      setMinPriceState(value);
      dispatch(setMinPrice(value));
    },
    [dispatch]
  );

  const pageChangedCb = useCallback(
    (currentPage) => {
      dispatch(setCurrentPage(currentPage));
    },
    [dispatch]
  );

  const onChangeSelectOrigin = (e) => {
    setSelectStateOrigin(e);
    dispatch(setCurrentPage(1));
    dispatch(setFilteredStrByOrigins(e));
  };

  const setProductsPerPageFromSelect = (e) => {
    setSelectStatePerPage(e);
    const perPage = e.value;
    let pagesCount = Math.ceil(totalProductsCount / perPage);
    dispatch(setProductsPerPage(perPage));
    if (currentPage > pagesCount) {
      dispatch(setCurrentPage(1));
    }
  };

  const onReset = () => {
    const clearFilters = {
      filteredByOrigins: "",
      currentPage: 1,
      productsPerPage: 20,
      minPrice: null,
      maxPrice: null,
    };
    dispatch(reset(clearFilters));
    setSelectStateOrigin([]);
    setSelectStatePerPage([]);
    setMinPriceState("");
    setMaxPriceState("");
  };

  return (
    <div className={style.filterFieldsBlock}>
      <div className={style.filterFields}>
        <MinMaxField
          minPrice={minPriceState}
          maxPrice={maxPriceState}
          onHandleMinPrice={handleMinPriceCb}
          onHandleMaxPrice={handleMaxPriceCb}
        />
        <Select
          isMulti
          value={selectStateOrigin}
          styles={selectStyles}
          name="origin"
          options={origins}
          placeholder="filter products by origin..."
          onChange={onChangeSelectOrigin}
        />
        <Select
          styles={selectStyles}
          value={selectStatePerPage}
          name="pages"
          options={productsPerPageFilter([10, 25, 50])}
          placeholder="products per page..."
          onChange={setProductsPerPageFromSelect}
        />
        <button className={style.resetButton} onClick={onReset}>
          reset
        </button>
      </div>
      <PaginationField
        pages={pages}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        onPageChanged={pageChangedCb}
      />
    </div>
  );
};

export default FilterFieldsContainer;
