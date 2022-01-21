import { useState } from "react";
import NavBar from "../navBar/NavBar";
import style from "./MyAccount.module.css";

const MyAccount = () => {

  const [isShown, setIsShown] = useState(false);
  const toggleShowNav = () => setIsShown(!isShown);

  return (
    <div className={style.myAccountBlock}>
      <button className={style.myAccountButton}
        onClick={() => toggleShowNav()}
        //onBlur={() => setIsShown(false)}
      >
        my account
      </button>
      {isShown && <NavBar/>}   
    </div>
  );
};
export default MyAccount;
