import React from "react";
import style from "./Input.module.css";
import { motion } from "framer-motion";

const Input = <
  T extends {
    type?: React.HTMLInputTypeAttribute | undefined;
    title?: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }
>({
  type,
  onChange,
  title,
  placeholder,
  ...props
}: T) => {
  return (
    <label className={style.input__label}>
      <input
        required={false}
        placeholder=" "
        type={type || "text"}
        className={`${style.input__field}`}
        onChange={onChange}
        {...props}
      />
      <span className={`${style.input__span}`}>{placeholder || title}</span>
    </label>
  );
};

export default Input;
