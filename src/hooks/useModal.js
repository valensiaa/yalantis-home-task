import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => setIsShowing(!isShowing);
  const onShow = () => setIsShowing(true);

  return {
    isShowing,
    toggle,
    onShow
  };
};

export default useModal;
