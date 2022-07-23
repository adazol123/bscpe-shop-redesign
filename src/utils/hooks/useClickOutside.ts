import { createRef, useEffect, useState } from "react";

/**
 * @return  `ref` -- assigning ref to target element to trigger the event
 * @return `toggle` -- state [true/false]
 * @return `toggleHandler` -- toggle the state
 */
export const useClickOutside = () => {
  let [toggle, setToggle] = useState(false);
  let ref = createRef<HTMLButtonElement>();

  let handleClick = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setToggle(false);
    }
  };
  let toggleHandler = () => setToggle(!toggle);
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);
  return { ref, toggle, toggleHandler };
};
