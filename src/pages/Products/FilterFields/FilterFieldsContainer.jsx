import { useDispatch, useSelector } from "react-redux";
import style from "./FilterFields.module.css";
import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { selectStyles } from "./selectStyles";
import MinMaxField from "../../../components/fields/MinMaxField";
import { productsPerPageFilter } from "../../../utils/helpers/createObjSelectPages";
import { getOrigins } from "../../../bus/products/thunks";
import PaginationField from "../../../components/fields/PaginationField";
import { useDebounce } from "../../../hooks/useDebounce";
import {
  setFilteredStrByOrigins,
  setMinPrice,
  setMaxPrice,
  setProductsPerPage,
  setCurrentPage,
  reset,
} from "../../../bus/products/reducer";
import { stateProducts } from "../../../bus/products/selectors";
import { useSearchParams } from "react-router-dom";

const FilterFieldsContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector(stateProducts);
  const { originsArr, totalProductsCount } = state;
  const { page, perPage, minPrice, maxPrice, origins } = state.filters;

  let pagesCount = Math.ceil(totalProductsCount / perPage);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  useEffect(() => {
    dispatch(getOrigins());
  }, [dispatch]);

  const [searchParams, setSearchParams] = useSearchParams();
  const paramsFromQuery = Object.fromEntries([...searchParams]);

  const defaultValueOrigins = !paramsFromQuery.origins
    ? origins.split(",").map((o) => ({
        value: o,
        label: o.charAt(0).toUpperCase() + o.slice(1),
      }))
    : paramsFromQuery.origins.split(",").map((o) => ({
        value: o,
        label: o.charAt(0).toUpperCase() + o.slice(1),
      }));

  const [selectStateOrigin, setSelectStateOrigin] =
    useState(defaultValueOrigins);
  const [currentPageState, setCurrentPageState] = useState(
    paramsFromQuery.page ?? page
  );
  const [selectStatePerPage, setSelectStatePerPage] = useState(
    paramsFromQuery.perPage ?? perPage
  );
  const [minPriceState, setMinPriceState] = useState(
    paramsFromQuery.minPrice ?? minPrice
  );
  const [maxPriceState, setMaxPriceState] = useState(
    paramsFromQuery.maxPrice ?? maxPrice
  );


  const debouncedMinInput = useDebounce(minPriceState, 1000);
  const debouncedMaxInput = useDebounce(maxPriceState, 1000);
  const debouncedOrigins = useDebounce(selectStateOrigin, 1000);
  useEffect(() => {
    debouncedMinInput && dispatch(setMinPrice(debouncedMinInput));
    debouncedMaxInput && dispatch(setMaxPrice(debouncedMaxInput));
    debouncedOrigins && dispatch(setFilteredStrByOrigins(debouncedOrigins));
    dispatch(setProductsPerPage(selectStatePerPage));
    dispatch(setCurrentPage(currentPageState));
  }, [
    searchParams,
    debouncedOrigins,
    debouncedMinInput,
    debouncedMaxInput,
    selectStatePerPage,
    currentPageState,
    dispatch,
  ]);


  useEffect(() => {
    setSearchParams(state.filters);
  }, [state.filters, setSearchParams]);

  useEffect(() => {
    pagesCount && +page > pagesCount && dispatch(setCurrentPage(1));
  }, [pagesCount, dispatch, page]);

  const handleMaxPriceCb = useCallback((e) => {
    const value = +e.currentTarget.value;
    setMaxPriceState(value);
  }, []);

  const handleMinPriceCb = useCallback((e) => {
    const value = +e.currentTarget.value;
    setMinPriceState(value);
  }, []);

  const pageChangedCb = useCallback((currentPage) => {
    setCurrentPageState(currentPage);
  }, []);

  const onChangeSelectOrigin = (e) => {
    setSelectStateOrigin(e);
  };

  const onReset =() => {
    const clearFilters = {
      origins: "",
      page: 1,
      perPage: 20,
      minPrice: "",
      maxPrice: "",
    }
    setSelectStateOrigin("");
    setCurrentPageState(1);
    setSelectStatePerPage(20);
    setMinPriceState("");
    setMaxPriceState("");
    dispatch(reset(clearFilters));
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
          value={origins === "" ? "" : selectStateOrigin}
          styles={selectStyles}
          name="origin"
          options={originsArr}
          placeholder="filter products by origin..."
          onChange={onChangeSelectOrigin}
        />
        <Select
          styles={selectStyles}
          value={
            +perPage === 20 ? "" : productsPerPageFilter([selectStatePerPage])
          }
          name="pages"
          options={productsPerPageFilter([10, 25, 50])}
          placeholder="products per page..."
          onChange={(e) => setSelectStatePerPage(e.value)}
        />
        <button className={style.resetButton} onClick={onReset}>
          reset
        </button>
      </div>
      <PaginationField
        pages={pages}
        currentPage={+currentPageState}
        onPageChanged={pageChangedCb}
        primaryButton={true}
      />
    </div>
  );
};
export default FilterFieldsContainer;
