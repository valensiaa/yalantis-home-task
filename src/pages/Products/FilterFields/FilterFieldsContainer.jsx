import { useDispatch, useSelector } from "react-redux";
import style from "./FilterFields.module.css";
import { useCallback, useEffect } from "react";
import Select from "react-select";
import { selectStyles } from "./selectStyles";

import MinMaxField from "../../../components/fields/MinMaxField";
import { productsPerPageFilter } from "../../../utils/helpers/createObjSelectPages";
import {fetchProductsByFilters,fetchOriginThunk} from "../../../bus/products/thunks";
import PaginationField from "../../../components/fields/PaginationField";
import {
  setFilteredArrayByOrigins,
  setMinPrice,
  setMaxPrice,
  setProductsPerPage,
  setCurrentPage,
} from "../../../bus/products/reducer";
import { selectStringQueryOrigins, stateProducts } from "../../../bus/products/selectors";

const FilterFieldsContainer = () => {
  const dispatch = useDispatch();
  const state = useSelector(stateProducts);
  const queryString = useSelector(selectStringQueryOrigins);
  
  const { origins, totalProductsCount } = state;
  const { currentPage, productsPerPage, minPrice, maxPrice } = state.filters;
 
  useEffect(() => {
    fetchOriginThunk(dispatch);
    fetchProductsByFilters(
      dispatch,
      currentPage,
      productsPerPage,
      queryString,
      minPrice,
      maxPrice
    );
  }, [dispatch, currentPage, productsPerPage, queryString, minPrice, maxPrice]);

  let pagesCount = Math.ceil(totalProductsCount / productsPerPage);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const handleMaxPriceCb = useCallback(
    (e) => {
      const value = +e.currentTarget.value;
      dispatch(setMaxPrice(value));
    },
    [dispatch]
  );

  const handleMinPriceCb = useCallback(
    (e) => {
      const value = +e.currentTarget.value;
      dispatch(setMinPrice(value));
    },
    [dispatch]
  );

  const pageChangedCb = useCallback(
    (currentPage) => {
      dispatch(setCurrentPage(currentPage));
    },[dispatch]);

  const onChangeSelectOrigin = (e) => {
    dispatch(setCurrentPage(1))
    dispatch(setFilteredArrayByOrigins(e));
  };

  const setProductsPerPageFromSelect = (e) => {
    const perPage = e.value;
    let pagesCount = Math.ceil(totalProductsCount / perPage);
    dispatch(setProductsPerPage(perPage));
    if (currentPage > pagesCount) {
      dispatch(setCurrentPage(1));
    }
  };

  return (
    <div className={style.filterFieldsBlock}>
      <div className={style.filterFields}>
        <MinMaxField
          onHandleMinPrice={handleMinPriceCb}
          onHandleMaxPrice={handleMaxPriceCb}
        />
        <Select
          isMulti
          styles={selectStyles}
          name="origin"
          options={origins}
          placeholder="filter products by origin..."
          onChange={onChangeSelectOrigin}
        />
        <Select
          styles={selectStyles}
          name="pages"
          options={productsPerPageFilter([10, 25, 50])}
          placeholder="products per page..."
          onChange={setProductsPerPageFromSelect}
        />
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
