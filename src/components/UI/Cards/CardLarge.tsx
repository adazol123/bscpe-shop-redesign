import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { ShoppingCartIcon as ShoppingCartIconFill } from "@heroicons/react/solid";
import React, { MouseEventHandler } from "react";
import style from "./Card.module.css";

interface Card {
  title: string;
  price: number;
  image: string;
  cartOnClick?: MouseEventHandler<HTMLButtonElement>;
  original_price?: number;
}

const CardLarge = <T extends Card>({
  title,
  price,
  image,
  original_price,
  cartOnClick,
  ...props
}: T) => {
  return (
    <div
      className={`${style.large} hover:grayscale-[60%] group flex-[0_0_auto]`}
      {...props}
    >
      <div className={style.large__image}>
        <img
          src={image}
          alt={title}
          className="group-hover:scale-125 select-none"
        />
      </div>
      <div className={style.large__details}>
        <h2 className={style.large__title}>{title}</h2>
        <p className={style.large__price}>
          {" "}
          P {price}{" "}
          <span className={style.large__original_price}>
            P {original_price}
          </span>{" "}
        </p>
        <div className={style.large__footer}>
          <button className={style.large__navigate}>View product</button>
          <button className={style.large__cart} onClick={cartOnClick}>
            <ShoppingCartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardLarge;
