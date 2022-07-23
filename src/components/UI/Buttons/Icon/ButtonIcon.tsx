import React from "react";
import style from "./Button.module.css";
import { PlusSmIcon } from "@heroicons/react/outline";

interface Icon {
  size?: "small" | "base" | "medium" | "large";
  type?: "outline" | "solid" | "square";
  icon?: JSX.Element;
  label?: string;
  children?: JSX.Element;
}

const ButtonIcon = <T extends Icon>(props: T) => {
  return (
    <button
      className={`${
        props.type === "solid"
          ? style.button__icon_solid
          : props.type === "square"
          ? style.button__icon_square
          : style.button__icon
      } ${
        props.size === "small"
          ? style.small
          : props.size === "medium"
          ? style.medium
          : props.size === "large"
          ? style.large
          : style.base
      }`}
    >
      {props.label && <span>{props.label}</span>}
      {props.icon && props.icon}
      {props.children && props.children}
    </button>
  );
};

export default ButtonIcon;
