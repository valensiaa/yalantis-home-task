import { useEffect, useCallback, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import style from "./MyProducts.module.css";
import { useDispatch, useSelector } from "react-redux";
import FilterFieldsContainer from "./FilterFields/FilterFieldsContainer";
import Loader from "../../components/loader/Loader";
import { paramsQuery, stateMyAccount } from "../../bus/myAccount/selectors";
import { setMyProducts } from "../../bus/myAccount/thunks";
import ProductCardButton from "../../components/productCard/ProductCardButton";
import useModal from "../../hooks/useModal";
import Modal from "../../components/modal/Modal";
import { editProduct } from "../../services/api";

const MyProductsContainer = () => {
  const params = useSelector(paramsQuery);
  const state = useSelector(stateMyAccount);
  const { myProducts, loading, error } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMyProducts(params));
  }, [dispatch, params]);

  const { isShowing, toggle } = useModal();
  const [productEdit, setProductEdit] = useState(null)
  const editCardHandler = useCallback(
    (product) => {
      setProductEdit(product)
      toggle();
    },
    [toggle]
  );
  const editProductCb = useCallback((bodyArr) => {
    editProduct(bodyArr[0], bodyArr[1].id)
    dispatch(setMyProducts(params))
    toggle()
  },[toggle, dispatch, params])

  const resetEditProductCb = useCallback(() => {
    console.log('hello')
  },[])


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
              <ProductCardButton
                onClickHandler={editCardHandler}
                title="edit product"
                product={p}
              />
            </ProductCard>
          ))
        )}
      </div>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        title={"Edit product"}
        titleButton="edit"
        productEdit={productEdit}
        handlerClick={editProductCb}
        handlerResetCancelClick={resetEditProductCb}
        resetCancelTitle='reset'
      />
    </div>
  );
};

export default MyProductsContainer;
