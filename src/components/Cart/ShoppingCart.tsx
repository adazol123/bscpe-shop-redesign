import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import ShopState from "../../utils/lib/ShopState";
import { ToggleState } from "../../utils/lib/ToggleState";
import ScrollToTop from "../../utils/hooks/useScrollToTop";
import { colorFormater, sizeFormater } from "../Checkout/Checkout";
import ModalSide from "../UI/Modal/Side/ModalSide";
import CartCard from "./CartCard";
import FooterSummary from "./FooterSummary";
import { ProductCart, States, StaticState } from "./../../types";

const ShoppingCart = () => {
  let {
    products: list,
    total,
    removeFromCart,
    totalQuantity,
  }: any = ShopState() as States;

  //TODOS: Need to fix types of the Toggle State (temporarily set to 'any')

  const { toggleState, toggleStateHandler } = ToggleState() as StaticState;

  return (
    <ModalSide
      title={"Cart"}
      icon={<ShoppingBagIcon />}
      state={toggleState["cart"]}
      scrollable={list.length > 2}
      enableFooter={list.length > 0}
      footer={<FooterSummary total={total} totalQuantity={totalQuantity} />}
      toggleStateHandler={() => toggleStateHandler("cart")}
    >
      <>
        <div className="container relative py-4 mx-auto  max-h-[calc(100vh-4em)] overflow-hidden overflow-y-scroll">
          <ul className="flex flex-col gap-2 pb-4 min-h-[calc(100vh-9em)] max-h-[calc(100vh-16em)]">
            {list.length > 0 ? (
              list?.map((data: ProductCart) => (
                <CartCard key={data.product_id} data={data} />
              ))
            ) : (
              <li className="py-4 mx-auto text-gray-400">Cart is empty</li>
            )}
          </ul>
        </div>
      </>
    </ModalSide>
  );
};

export default ShoppingCart;
