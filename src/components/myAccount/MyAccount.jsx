import React, { useCallback } from "react";
import useModal from "../../hooks/useModal";
import { addProduct } from "../../services/api";
import DropDown from "../dropDown/DropDown";
import EditableForm from "../forms/EditableForm/EditableForm";
import Modal from "../modal/Modal";
import NavBar from "../navBar/NavBar";
import style from "./MyAccount.module.css";

const MyAccount = () => {
  const { isShowing, toggle, onShow } = useModal();

  const addProductCb = useCallback(
    (bodyArr) => {
      addProduct(bodyArr[0]);
      toggle();
    },
    [toggle]
  );

  return (
    <>
      <DropDown
        trigger={(toggle) => (
          <button className={style.myAccountButton} onClick={toggle}>
            my account
          </button>
        )}
      >
        {(onClose) => <NavBar onClick={onClose} onOpenModal={onShow} />}
      </DropDown>
      <Modal hide={toggle} isShowing={isShowing} title={"Add product"}>
        <EditableForm
          hide={toggle}
          titleButton="submit"
          resetCancelTitle="cancel"
          handlerClick={addProductCb}
          primaryButton={true}
        />
      </Modal>
    </>
  );
};
export default MyAccount;
