import React, { useCallback, useEffect, useState } from "react";
import NavBar from "../navBar/NavBar";
import style from "./MyAccount.module.css";

const MyAccount = () => {
  const container = React.createRef();
  const containerNav = React.createRef();

  const [isShown, setIsShown] = useState(false);

  const toggleShowNav = useCallback(
    (e) => {
      container.current &&
        !container.current.contains(e.target) &&
        containerNav.current &&
        !containerNav.current.contains(e.target) &&
        setIsShown(false);
    },
    [container, containerNav]
  );

  useEffect(() => {
    document
      .querySelector(".app-wrapper")
      .addEventListener("mousedown", toggleShowNav);
  }, [toggleShowNav]);

  return (
    <div className={style.myAccountBlock}>
      <button
        ref={container}
        className={style.myAccountButton}
        onClick={() => setIsShown(!isShown)}
      >
        my account
      </button>
      {isShown && (
        <div ref={containerNav}>
          <NavBar />
        </div>
      )}
    </div>
  );
};
export default MyAccount;
