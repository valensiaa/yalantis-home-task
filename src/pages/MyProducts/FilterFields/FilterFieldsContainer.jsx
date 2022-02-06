import { useDispatch, useSelector } from "react-redux";
import style from "./FilterFields.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Select from "react-select";
import { selectStyles } from "./selectStyles";
import MinMaxField from "../../../components/fields/MinMaxField";
import PaginationField from "../../../components/fields/PaginationField";
import { productsPerPageFilter } from "../../../utils/helpers/createObjSelectPages";
import { getOrigins } from "../../../bus/myAccount/thunks";
import {
  setFilteredStrByOrigins,
  setMinPrice,
  setMaxPrice,
  setProductsPerPage,
  setCurrentPage,
  reset,
} from "../../../bus/myAccount/reducer";
import debounce from "lodash.debounce";
import { stateMyAccount } from "../../../bus/myAccount/selectors";
import { useSearchParams } from "react-router-dom";


const FilterFieldsContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector(stateMyAccount);
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
  const paramsQ = useRef();
  paramsQ.current = paramsFromQuery;

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
  const [selectStateOrigin, setSelectStateOrigin] = useState(defaultValueOrigins);

  const [currentPageInput, setCurrentPageInput] = useState(
    !pageFromQ ? 1 : +pageFromQ
  );
  const [perPageInput, setPerPageInput] = useState(
    !perPageFromQ ? 20 : +perPageFromQ
  );
  const [minPriceState, setMinPriceState] = useState(
    !minPriceFromQ ? "" : minPriceFromQ
  );
  const [maxPriceState, setMaxPriceState] = useState(
    !maxPriceFromQ ? "" : maxPriceFromQ
  );


  useEffect(() => {
    pagesCount && page > pagesCount && setCurrentPageInput(1);
  }, [pagesCount, dispatch, page]);


  const debouncedMaxInput = debounce((value) => {
    setSearchParams({ ...paramsQ.current, maxPrice: value });
    dispatch(setMaxPrice(value));
  }, 1000);
  const handleMaxPriceCb = useCallback((e) => {
    const value = +e.currentTarget.value;
    setMaxPriceState(value);
    debouncedMaxInput(value);
  }, []);

  const debouncedMinInput = debounce((value) => {
    setSearchParams({ ...paramsQ.current, minPrice: value });
    dispatch(setMinPrice(value));
  }, 1000);
  const handleMinPriceCb = useCallback((e) => {
    const value = +e.currentTarget.value;
    setMinPriceState(value);
    debouncedMinInput(value);
  }, []);

  const pageChangedCb = useCallback(
    (currentPage) => {
      setCurrentPageInput(currentPage);
      setSearchParams({
        ...paramsFromQuery,
        page: currentPage,
        perPage: perPageFromQ ?? perPage,
      });
      dispatch(setCurrentPage(currentPageInput));
    },
    [
      paramsFromQuery,
      setSearchParams,
      perPage,
      perPageFromQ,
      dispatch,
      currentPageInput,
    ]
  );

  const changePerPage = useCallback(
    (e) => {
      setPerPageInput(e.value);
      setSearchParams({ ...paramsFromQuery, perPage: e.value });
      dispatch(setProductsPerPage(perPageInput));
    },
    [setSearchParams, dispatch, perPageInput, paramsFromQuery]
  );

  const debouncedOrigins = debounce((value) => {
    setSearchParams({
      ...paramsFromQuery,
      origins: value.map((o) => o.value).join(","),
    });
    dispatch(setFilteredStrByOrigins(value));
  }, 1000);
  const onChangeSelectOrigin = (e) => {
    setSelectStateOrigin(e);
    debouncedOrigins(e);
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
    setMinPriceState("");
    setMaxPriceState("");
    setPerPageInput(20);
    setCurrentPageInput(1);
    setSelectStateOrigin("");
  };

  return (
    <div className={style.filterFieldsBlock}>
      <div className={style.filterFields}>
        <MinMaxField
          inputBorder={false}
          minPrice={minPriceState}
          maxPrice={maxPriceState}
          onHandleMinPrice={handleMinPriceCb}
          onHandleMaxPrice={handleMaxPriceCb}
        />
        <Select
          isMulti
          value={!originsFromQ ? "" : selectStateOrigin}
          styles={selectStyles}
          name="origin"
          options={originsArr}
          placeholder="filter products by origin..."
          onChange={onChangeSelectOrigin}
        />
        <Select
          styles={selectStyles}
          value={perPageInput === 20 ? "" : productsPerPageFilter([perPageInput])}
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
        primaryButton={false}
      />
    </div>
  );
};

export default FilterFieldsContainer;
