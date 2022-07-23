import React, {
  LegacyRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
} from "react";
import style from "./Input.module.css";
import { motion } from "framer-motion";

type Input = {};

const InputEdit = <
  T extends {
    type?: React.HTMLInputTypeAttribute | undefined;
    title?: string;
    placeholder?: string;
    enabled?: boolean;
    className?: HTMLInputElement | string;
    autoFocus?: boolean;
    ref?: LegacyRef<HTMLInputElement>;
  }
>(
  obj: T
) => {
  let inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (obj.enabled) {
      inputRef.current?.focus();
    }
    return () => {
      inputRef.current;
    };
  }, [obj.enabled]);
  return (
    <label className={`${style.input__label} ${obj.className}`}>
      <input
        ref={inputRef}
        placeholder=" "
        id="plain__input"
        disabled={obj.enabled ? !obj.enabled : true}
        defaultValue={"Full name"}
        type={obj.type || "text"}
        className={`${style.input__field} `}
      />
      <span className={`${style.input__span}`}>
        {!obj.placeholder && obj.title}
      </span>
    </label>
  );
};

export default InputEdit;
