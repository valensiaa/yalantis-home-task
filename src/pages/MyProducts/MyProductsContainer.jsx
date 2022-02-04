import { useEffect, useCallback, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import style from "./MyProducts.module.css";
import { useDispatch, useSelector } from "react-redux";
import FilterFieldsContainer from "./FilterFields/FilterFieldsContainer";
import Loader from "../../components/loader/Loader";
import { paramsQuery, stateMyAccount } from "../../bus/myAccount/selectors";
import { setMyProducts } from "../../bus/myAccount/thunks";
import useModal from "../../hooks/useModal";
import Modal from "../../components/modal/Modal";
import { editProduct } from "../../services/api";
import EditableForm from "../../components/forms/EditableForm/EditableForm";
import Button from "../../components/button/Button";
import { useSearchParams } from "react-router-dom";

const MyProductsContainer = ({ ...props }) => {
  //const params = useSelector(paramsQuery);
  const state = useSelector(stateMyAccount);
  const { myProducts, loading, error } = state;
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const paramsV = Object.fromEntries([...searchParams]);
  useEffect(() => {
    setSearchParams(paramsV);
  }, []);
   useEffect(() => {
    dispatch(setMyProducts(paramsV));
  }, [dispatch, searchParams]);

  // Change logic according to HM#4
  // useEffect(() => {
  //   dispatch(setMyProducts(params));
  // }, [dispatch, params]);

  const { isShowing, toggle } = useModal();
  const [productEdit, setProductEdit] = useState(null);
  const editCardHandler = useCallback(
    (product) => {
      setProductEdit(product);
      toggle();
    },
    [toggle]
  );
  const editProductCb = useCallback(
    (bodyArr) => {
      editProduct(bodyArr[0], bodyArr[1].id);
      dispatch(setMyProducts(paramsV));
      toggle();
    },
    [toggle, dispatch, paramsV]
  );

  return (
    <div className={style.productsBlock}>
      <h1>My products</h1>
      <FilterFieldsContainer />
      <div className={style.productsItems}>
        {error !== "" ? (
          <div className={style.errorMessage}>{error}</div>
        ) : loading ? (
          <Loader />
        ) : (
          myProducts.map((p) => (
            <ProductCard key={p.id} product={p}>
              <Button
                onClickHandler={editCardHandler}
                title="edit product"
                product={p}
                primaryButton={false}
              />
            </ProductCard>
          ))
        )}
      </div>
      <Modal isShowing={isShowing} hide={toggle} title={"Edit product"}>
        <EditableForm
          {...props}
          titleButton="edit"
          productEdit={productEdit}
          handlerClick={editProductCb}
          resetCancelTitle="reset"
          primaryButton={false}
        />
      </Modal>
    </div>
  );
};

export default MyProductsContainer;
