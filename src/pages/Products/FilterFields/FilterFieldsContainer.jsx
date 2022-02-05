import { useDispatch, useSelector } from "react-redux";
import style from "./FilterFields.module.css";
import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { selectStyles } from "./selectStyles";
import MinMaxField from "../../../components/fields/MinMaxField";
import { productsPerPageFilter } from "../../../utils/helpers/createObjSelectPages";
import { getOrigins } from "../../../bus/products/thunks";
import PaginationField from "../../../components/fields/PaginationField";
//import { useDebounce } from "../../../hooks/useDebounce";
import debounce from "lodash.debounce";
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
  const { page, perPage, origins } = state.filters;

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

  const originsFromQ = searchParams.get("origins");
  const pageFromQ = searchParams.get("page");
  const perPageFromQ = searchParams.get("perPage");
  const minPriceFromQ = searchParams.get("minPrice");
  const maxPriceFromQ = searchParams.get("maxPrice");


  const defaultValueOrigins = !originsFromQ
    ? origins.split(",").map((o) => ({
        value: o,
        label: o.charAt(0).toUpperCase() + o.slice(1),
      }))
    : originsFromQ.split(",").map((o) => ({
        value: o,
        label: o.charAt(0).toUpperCase() + o.slice(1),
      }));


  const [currentPageInput, setCurrentPageInput] = useState(!pageFromQ ? 1 : +pageFromQ);
  const [perPageInput, setPerPageInput] = useState(!perPageFromQ ? 20 : +perPageFromQ);
  const [minPriceState, setMinPriceState] = useState(
    !minPriceFromQ ? "" : minPriceFromQ
  );
   const [maxPriceState, setMaxPriceState] = useState(
    !maxPriceFromQ ? "" : maxPriceFromQ
  );

    const [selectStateOrigin, setSelectStateOrigin] = useState(defaultValueOrigins);


  useEffect(() => {
    pagesCount && page > pagesCount && setCurrentPageInput(1);
  }, [pagesCount, dispatch, page]);


  const handleMaxPriceCb = useCallback((e) => {
      const value = +e.currentTarget.value;
      setMaxPriceState(value)
      setSearchParams({ ...paramsFromQuery, maxPrice: value });
      debouncedMaxInput(maxPriceState, dispatch)
    },
    [ setSearchParams, dispatch, paramsFromQuery, maxPriceState]
  );

  const handleMinPriceCb = useCallback((e) => {
      const value = +e.currentTarget.value;
      setMinPriceState(value)
      setSearchParams({ ...paramsFromQuery, minPrice: value });
      debouncedMinInput(value, dispatch);
    },
    [setSearchParams, paramsFromQuery, dispatch]
  );

  const pageChangedCb = useCallback((currentPage) => {
      setCurrentPageInput(currentPage);
      setSearchParams({ ...paramsFromQuery, page: currentPage, perPage:perPageFromQ ?? perPage });
      dispatch(setCurrentPage(currentPageInput));
    },
    [paramsFromQuery,setSearchParams, perPage, perPageFromQ, dispatch, currentPageInput]
  );

  const changePerPage = useCallback(
    (e) => {
      setPerPageInput(e.value)
      setSearchParams({ ...paramsFromQuery, perPage: e.value });
      dispatch(setProductsPerPage(perPageInput));
    },
    [setSearchParams, dispatch, perPageInput, paramsFromQuery]
  );

  const onChangeSelectOrigin = (e) => {
    setSelectStateOrigin(e)
    setSearchParams({
      ...paramsFromQuery,
      origins: e.map((o) => o.value).join(","),
    });
    debouncedOrigins(e, dispatch);
  };

  const onReset = () => {
    const clearFilters = {
      origins: "",
      page: 1,
      perPage: 20,
      minPrice: "",
      maxPrice: "",
    };
    setSearchParams(clearFilters);
    dispatch(reset(clearFilters));
    setMinPriceState('')
    setMaxPriceState('')
    setPerPageInput(20)
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
          value={origins === '' ? '' :selectStateOrigin}
          styles={selectStyles}
          name="origin"
          options={originsArr}
          placeholder="filter products by origin..."
          onChange={onChangeSelectOrigin}
        />
        <Select
          styles={selectStyles}
          value={
            perPageInput === 20
              ? ""
              : productsPerPageFilter([perPageInput])
          }
          name="pages"
          options={productsPerPageFilter([10, 25, 50])}
          placeholder="products per page..."
          onChange={(e) => changePerPage(e)}
        />
        <button className={style.resetButton} onClick={onReset}>
          reset
        </button>
      </div>
      <PaginationField
        pages={pages}
        currentPage={currentPageInput}
        onPageChanged={pageChangedCb}
        primaryButton={true}
      />
    </div>
  );
};
export default FilterFieldsContainer;
