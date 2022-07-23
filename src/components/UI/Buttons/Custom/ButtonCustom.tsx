import React from "react";
import style from "./Button.module.css";
import { BeakerIcon } from "@heroicons/react/outline";

interface ButtonCustom {
  children: JSX.Element | JSX.Element[] | string;
  icon?: JSX.Element;
  className?: string;
}
const ButtonCustom = <T extends ButtonCustom>({
  children,
  icon,
  className,
  ...props
}: T) => {
  return (
    <button className={`${style.button__custom} ${className}`} {...props}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default ButtonCustom;
