import React from "react";
import { useNavigate } from "react-router-dom";
import { StaticState } from "../../types";
import { ToggleState } from "../../utils/lib/ToggleState";

const FooterSummary = ({
  total,
  totalQuantity,
}: {
  total: number;
  totalQuantity: number;
}) => {
  let navigate = useNavigate();
  const { toggleState, toggleStateHandler } = ToggleState() as StaticState;

  return (
    <div className="flex flex-col gap-1 h-fit">
      <div>
        <table className="w-full border-separate table-fixed border-spacing-2">
          <tbody className="w-full">
            {/* <tr className="text-sm text-gray-500">
            <td>Item[s] in cart</td>
            <td className="text-end">{totalQuantity?.toFixed(0)}</td>
          </tr>
          <tr className="text-sm text-gray-500">
            <td>Discount</td>
            <td className="text-end">40%</td>
          </tr> */}
            <tr className="text-xs font-light ">
              <td>Sub-total</td>
              <td className="text-end">₱ {total?.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        onClick={() => {
          toggleStateHandler("cart");
          navigate("/checkout", { replace: true });
        }}
        className="w-full p-4 text-gray-200 bg-black/90"
      >
        Checkout
      </button>
      {/* <button
      onClick={() => toggleStateHandler("cart")}
      className="w-full p-4 underline bg-transparent underline-offset-2"
    >
      Cancel
    </button> */}
    </div>
  );
};

export default FooterSummary;
