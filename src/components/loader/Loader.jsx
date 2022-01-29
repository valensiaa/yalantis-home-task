import { useLocation } from "react-router";
import loaderImg from "../../assets/loader.png";
import loaderMyProducts from "../../assets/loader-myproducts.png";

import style from "./Loader.module.css";

const Loader = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className={style.loaderBlock}>
      <div>
        <img
          src={pathname !== "/myproducts" ? loaderImg : loaderMyProducts}
          alt="loader"
        />
      </div>
    </div>
  );
};
export default Loader;
