import React from "react";
import ReactDOM from "react-dom";
import style from "./Modal.module.css";

const Modal = ({ isShowing, hide, title, children }) =>
  isShowing &&
  ReactDOM.createPortal(
    <React.Fragment>
      <div className={style.modalBlock} onClick={() => hide()}>
        <div className={style.modal} onClick={(e) => e.stopPropagation()}>
          <h3 className={style.modalTitle}>{title}</h3>
          <span className={style.modalClose} onClick={() => hide()}>
            X
          </span>
          {children}
        </div>
      </div>
    </React.Fragment>,
    document.body
  );

export default Modal;
