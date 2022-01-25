import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import useModal from "../../hooks/useModal";
import { addProduct } from "../../services/api";
import EditableForm from "../forms/EditableForm/EditableForm";
import Modal from "../modal/Modal";
import style from "./NavBar.module.css";

const NavBar = ({ ...props }) => {
  const { isShowing, toggle } = useModal();
  const addProductCb = useCallback((bodyArr) => {
    addProduct(bodyArr[0]);
    toggle();
  }, [toggle]);

  return (
    <nav className={style.navBlock}>
      <div onClick={toggle} className={style.linkBlock}>
        add product
      </div>
      <div className={style.linkBlock}>
        <NavLink to="/myproducts">my products</NavLink>
      </div>
      <div className={style.linkBlock}>
        <NavLink to="/orders">my orders</NavLink>
      </div>
      <Modal hide={toggle} isShowing={isShowing} title={"Add product"}>
        <EditableForm
        hide={toggle}
          {...props}
          titleButton="submit"
          resetCancelTitle="cancel"
          handlerClick={addProductCb}
          primaryButton={true}
        />
      </Modal>
    </nav>
  );
};

export default NavBar;
