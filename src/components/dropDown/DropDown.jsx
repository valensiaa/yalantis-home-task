import { useCallback, useState } from "react";
import style from "./DropDown.module.css";

const DropDown = ({ trigger, children }) => {
  const [isShown, setIsShown] = useState(false);
  const toggleHandler = useCallback(() => {
    setIsShown(!isShown);
  }, [isShown]);

  const closeHandler = useCallback(() => {
    setIsShown(false);
  }, []);

  return (
    <div className={style.myAccountBlock}>
      {trigger(toggleHandler)}
      {isShown && children(closeHandler)}
    </div>
  );
};

export default DropDown;
