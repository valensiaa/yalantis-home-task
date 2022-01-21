import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import useModal from "../../hooks/useModal";
import { addProduct } from "../../services/api";
import Modal from "../modal/Modal";
import style from "./NavBar.module.css";

const NavBar = () => {
  
  const { isShowing, toggle } = useModal();
  const addProductCb = useCallback((bodyArr) => {
    addProduct(bodyArr[0]);
  }, []);
  const resetEditProductCb = useCallback(() => {
    toggle();
  }, [toggle]);

  return (
    <nav className={style.navBlock}>
      <div className={style.linkBlock}>
        <NavLink to="/" onClick={toggle}>
          add product
        </NavLink>
        <Modal
          hide={toggle}
          isShowing={isShowing}
          title={"Add product"}
          titleButton="submit"
          resetCancelTitle="cancel"
          handlerResetCancelClick={resetEditProductCb}
          handlerClick={addProductCb}
        />
      </div>
      <div className={style.linkBlock}>
        <NavLink to="/myproducts">my products</NavLink>
      </div>
      <div className={style.linkBlock}>
        <NavLink to="/orders">my orders</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
