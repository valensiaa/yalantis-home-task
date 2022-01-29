import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = ({ onClick, onOpenModal }) => {
  const onOpenHandler = () => {
    onClick();
    onOpenModal();
  };

  return (
    <nav className={style.navBlock}>
      <div onClick={onOpenHandler} className={style.linkBlock}>
        add product
      </div>
      <div onClick={onClick} className={style.linkBlock}>
        <NavLink to="/myproducts">my products</NavLink>
      </div>
      <div onClick={onClick} className={style.linkBlock}>
        <NavLink to="/orders">my orders</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
