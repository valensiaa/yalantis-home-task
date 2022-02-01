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

import debounce from "lodash.debounce";
import { useNavigate, useSearchParams } from "react-router-dom";


const debouncedMinInput = debounce(
  (value, dispatch) => dispatch(setMinPrice(value)),
  1000
);
const debouncedMaxInput = debounce(
  (value, dispatch) => dispatch(setMaxPrice(value)),
  1000
);
const debouncedOrigins = debounce(
  (value, dispatch) => dispatch(setFilteredStrByOrigins(value)),
  1000
);

const FilterFieldsContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector(stateProducts);
  const { originsArr, totalProductsCount } = state;
  const { page, perPage} = state.filters;

  const [searchParams] = useSearchParams();
  const paramsFromQuery = Object.fromEntries([...searchParams]);

  const navigate = useNavigate()
  useEffect(() => {
    navigate(`?${new URLSearchParams(state.filters).toString()}`);
  }, [state.filters, navigate]);

     useEffect(() => {
    dispatch(getOrigins());
  }, [dispatch]);

  const defaultValueOrigins =
    !paramsFromQuery.origins
      ? ""
      : paramsFromQuery.origins.split(",").map((o) => ({
          value: o,
          label: o.charAt(0).toUpperCase() + o.slice(1),
        }));

  const defaultValueProductsPerPage =
    +paramsFromQuery.perPage === 20
      ? ""
      : {
          value: paramsFromQuery.perPage,
          label: paramsFromQuery.perPage,
        };

  const [selectStateOrigin, setSelectStateOrigin] = useState(defaultValueOrigins);
  const [selectStatePerPage, setSelectStatePerPage] = useState(defaultValueProductsPerPage);
  const [minPriceState, setMinPriceState] = useState(
    !paramsFromQuery.minPrice ? "" : paramsFromQuery.minPrice
  );
  const [maxPriceState, setMaxPriceState] = useState(
    !paramsFromQuery.maxPrice ? "" : paramsFromQuery.maxPrice
  );


  let pagesCount = Math.ceil(totalProductsCount / perPage);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const handleMaxPriceCb = useCallback(
    (e) => {
      const value = +e.currentTarget.value;
      debouncedMaxInput(value, dispatch);
      setMaxPriceState(value);
    },
    [dispatch]
  );

  const handleMinPriceCb = useCallback(
    (e) => {
      const value = +e.currentTarget.value;
      debouncedMinInput(value, dispatch);
      setMinPriceState(value);
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
    debouncedOrigins(e, dispatch);
  };

  const setProductsPerPageFromSelect = (e) => {
    setSelectStatePerPage(e);
    const perPage = e.value;
    let pagesCount = Math.ceil(totalProductsCount / paramsFromQuery.perPage);
    dispatch(setProductsPerPage(perPage));
    if (paramsFromQuery.page > pagesCount) {
      dispatch(setCurrentPage(1));
    }
  };

  const onReset = () => {
    const clearFilters = {
      origins: "",
      page: 1,
      perPage: 20,
      minPrice: "",
      maxPrice: "",
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
          inputBorder={true}
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
          options={originsArr}
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
        currentPage={page}
        productsPerPage={perPage}
        onPageChanged={pageChangedCb}
        primaryButton={true}
      />
    </div>
  );
};
export default FilterFieldsContainer;
