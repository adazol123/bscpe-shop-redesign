import {
  CashIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  DocumentAddIcon,
  InformationCircleIcon,
  MapIcon,
  PencilAltIcon,
  PhoneIcon,
  TruckIcon,
  XIcon,
} from "@heroicons/react/outline";
import { BadgeCheckIcon, CheckCircleIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../utils/hooks/useScrollToTop";
import AccountState from "../../utils/lib/AccountState";
import ShopState from "../../utils/lib/ShopState";
import Accordion from "../UI/Accordion/Accordion";
import VirtualCard from "../UserProfile/VirtualCreditCard/VirtualCard";
import Button from "./../UI/Buttons/Standard/Button";

const Checkout = () => {
  let { payment, shipping } = AccountState();

  let navigate = useNavigate();

  let [checkoutToggle, setCheckoutToggle] = useState(false);

  let checkoutToggleHandler = () => setCheckoutToggle(!checkoutToggle);

  return (
    <>
      <ScrollToTop />
      <div className="relative max-w-screen-sm mx-auto  text-sm">
        <Accordion open title="Order Summary">
          <OrderSection />
        </Accordion>
        <Accordion title="Payment Method">
          <div className="p-2  border border-gray-300 border-dashed rounded-md">
            <PaymentMethod />
            <div
              className="mx-auto w-fit"
              onClick={() => {
                navigate("/account");
              }}
            >
              <VirtualCard
                type={payment?.defaultCard}
                bank={payment?.bank}
                card_number={payment?.cardNumber}
                card_holder={payment?.cardHolder}
                className={[
                  "w-[272px]  snap-center scroll-px-4 fill-neutral-800 drop-shadow-md",
                ].join(" ")}
              />
            </div>
          </div>
        </Accordion>
        <Accordion title="Shipping Address">
          <ShipTo />
        </Accordion>
        <AmountInfo />

        <div className="relative bottom-0 flex flex-col w-full gap-2 px-4 text-xs bg-gray-100">
          <Button className="py-4" onClick={checkoutToggleHandler}>
            Confirm checkout
          </Button>
          <Button
            type="outline"
            className="py-4"
            onClick={() => {
              navigate("/", { replace: true });
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
      {/* <ConfirmationModal checkoutToggle={checkoutToggle} checkoutToggleHandler={checkoutToggleHandler} /> */}
    </>
  );
};

function PaymentMethod() {
  return (
    <div className="flex w-full gap-2 ">
      <div className=" items-center justify-between min-w-[6.2em] p-2 text-[0.85em] leading-4 bg-white rounded-md shadow border border-gray-400 relative">
        <CheckCircleIcon className="absolute w-4 h-4 -top-[0.4em] -right-[0.45em] " />
        <div className="grid place-items-center">
          <CreditCardIcon className="w-6 h-4 text-gray-500" />
          <div className="text-[0.8em] text-gray-400">
            <p>Credit Card</p>
          </div>
        </div>
      </div>
      <div className=" items-center justify-between min-w-[6.2em] p-2 text-[0.85em] leading-4 bg-gray-50 rounded-md shadow border border-transparent">
        <div className="grid place-items-center">
          <CurrencyDollarIcon className="w-6 h-4 text-gray-600" />
          <div className="text-[0.8em] text-gray-400">
            <p>Paypal</p>
          </div>
        </div>
      </div>
      <div className=" items-center justify-between min-w-[6.2em] p-2 text-[0.85em] leading-4 bg-gray-50 rounded-md shadow whitespace-nowrap border border-transparent">
        <div className="grid place-items-center">
          <CashIcon className="w-6 h-4 text-gray-600" />
          <div className="text-[0.8em] text-gray-400">
            <p>Cash On Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShipTo() {
  let { shipping } = AccountState();

  let navigate = useNavigate();
  return (
    <div className="p-2 border border-gray-300 border-dashed rounded-md">
      {shipping ? (
        <div className="flex items-center justify-between p-2 text-[0.85em] leading-4 bg-white rounded-md shadow">
          <div>
            <div className="flex text-[0.9em] gap-1 font-medium">
              <TruckIcon className="w-3" />
              <p>Ship to:</p>
              <p>{shipping?.recipient}</p>
            </div>
            <div className="text-[0.8em] flex gap-1 text-gray-400">
              <MapIcon className="w-3" />
              <p>Address:</p>
              <p>
                {shipping?.address},{shipping?.city} {shipping?.zipcode}
              </p>
            </div>
            <div className="text-[0.8em] flex gap-1 text-gray-400">
              <PhoneIcon className="w-3" />
              <p>Contact:</p>
              <p>{shipping?.contact || "+639 5645 5466"}</p>
            </div>
          </div>
          <button
            className="text-gray-500"
            onClick={() => {
              navigate("/account/shipping-address");
            }}
          >
            <PencilAltIcon className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center p-4 text-[0.85em] leading-4 bg-white rounded-md shadow gap-1 text-gray-500 cursor-pointer"
          onClick={() => {
            navigate("/account/shipping-address");
          }}
        >
          <p> No Shipping address setup yet</p>
          <p className="flex items-center gap-1 text-gray-400/80 text-[0.8em]">
            <DocumentAddIcon className="w-3 h-3" />
            Configure new shipping address
          </p>
        </div>
      )}
    </div>
  );
}

function OrderSection() {
  let { products } = ShopState();

  return (
    <>
      <div className="flex flex-col gap-1 px-0 my-2 overflow-hidden overflow-y-scroll max-h-64">
        {products.map((product) => {
          return (
            <div
              key={product?.product_id}
              className="flex gap-2 p-1 border border-gray-300 border-dashed rounded-md"
            >
              <div className="w-14 h-14">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="object-cover w-full h-full rounded"
                />
              </div>
              <div className="flex flex-col justify-between flex-1 ">
                <p className="text-xs font-thin text-gray-500 line-clamp-1">
                  {product?.name}
                </p>
                <div className="flex gap-4">
                  <div>
                    <span className="text-[0.65em] text-gray-400">Price</span>
                    <p>
                      {" "}
                      <span className="text-xs font-medium text-gray-500">
                        ₱ {product?.price}.00
                      </span>{" "}
                      x {product?.quantity}
                    </p>
                  </div>
                  <div>
                    <span className="text-[0.65em] text-gray-400">Size</span>
                    <p>
                      <span className="font-medium text-gray-500">
                        {sizeFormater(product?.size)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-[0.65em] text-gray-400 ">Color</span>
                    <p>
                      <span className="mt-2 font-medium text-gray-500">
                        {colorFormater(product?.color)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function AmountInfo() {
  let { total } = ShopState();
  return (
    <div className="grid gap-2 mx-6 my-3">
      <div className="flex flex-col gap-2">
        <div className="flex text-[0.8em] justify-between text-gray-500/80">
          <p>Delivery fee</p>
          <h3 className="font-medium text-gray-500/80 ">
            - FREE
            <span className="font-thin text-gray-400/80"> </span>
          </h3>
        </div>
        <div className="flex text-[0.8em] justify-between text-gray-500/80">
          <p>VAT</p>
          <h3 className="font-medium text-gray-500/80 ">
            - PHP {(total * 0.05).toFixed(2)}{" "}
          </h3>
        </div>
      </div>
      <hr />
      <div className="flex justify-between font-medium text-gray-600">
        <p>Total</p>
        <h3>PHP {(total - total * 0.05).toFixed(2)}</h3>
      </div>
    </div>
  );
}

export function sizeFormater(size = "") {
  let label =
    size?.toLowerCase() === "small"
      ? "S"
      : size?.toLowerCase() === "medium"
      ? "M"
      : size?.toLowerCase() === "large"
      ? "L"
      : "XL";

  return (
    <p className="grid w-6 h-6 text-center border border-gray-300 rounded place-items-center">
      <span className="px-1 text-xs leading-4">{label}</span>
    </p>
  );
}

export function colorFormater(color = "") {
  let colorStype =
    color?.toLowerCase() === "red"
      ? "bg-rose-400"
      : color?.toLowerCase() === "blue"
      ? "bg-blue-400"
      : color?.toLowerCase() === "green"
      ? "bg-emerald-400"
      : "bg-gray-400";

  return (
    <>
      <div className={["w-4 h-4 rounded-full m-1", colorStype].join(" ")}>
        {" "}
      </div>
    </>
  );
}

export default Checkout;
