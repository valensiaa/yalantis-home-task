import { useDispatch, useSelector } from "react-redux";
import style from "./FilterFields.module.css";
import MinMaxField from "../../../components/fields/MinMaxField";
import { useCallback } from "react";
import Select from "react-select";
import { productsPerPageFilter } from "../../../utils/helpers/createObjSelectPages";
import { fetchProductsByFilters } from "../../../bus/products/thunks";
import PaginationField from "../../../components/fields/PaginationField";


const FilterFieldsContainer = ({ handleChangeSelectOrigin }) => {
  const state = useSelector((state) => state.products);
  const {
    origins,
    currentPage,
    productsPerPage,
    totalProductsCount,
    minPrice,
    maxPrice,
  } = state;
  const dispatch = useDispatch();
  
  //чи варто використовувати колбек або юзефект???
  let pagesCount = Math.ceil(totalProductsCount / productsPerPage);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const handleMaxPriceCb = useCallback(
    (e) => {
      const value = +e.currentTarget.value;
     // dispatch(setMaxPrice(value));
      fetchProductsByFilters(
        dispatch,
        currentPage,
        productsPerPage,
        minPrice,
        value
      );
    },
    [dispatch, currentPage, productsPerPage, minPrice]
  );

  const handleMinPriceCb = useCallback(
    (e) => {
      const value = +e.currentTarget.value;
     // dispatch(setMinPrice(value));
      fetchProductsByFilters(
        dispatch,
        currentPage,
        productsPerPage,
        value,
        maxPrice
      );
    },
    [dispatch, currentPage, productsPerPage, maxPrice]
  );

  const pageChangedCb = useCallback(
    (currentPage) => {
      fetchProductsByFilters(
        dispatch,
        currentPage,
        productsPerPage,
        minPrice,
        maxPrice
      );
    },
    [dispatch, productsPerPage, minPrice, maxPrice]
  );

  const setProductsPerPageFromSelect = (e) => {
    const perPage = e.value;
    fetchProductsByFilters(dispatch, currentPage, perPage, minPrice, maxPrice);
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
          name="origin"
          options={origins}
          placeholder="filter products by origin..."
          onChange={(e) => handleChangeSelectOrigin(e)}
        />
        <Select
          className="basic-single"
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
