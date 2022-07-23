import React from "react";
import { ShoppingBagIcon, FireIcon } from "@heroicons/react/solid";
import {
  ShoppingBagIcon as ShoppingBagIconOutline,
  BellIcon as BellIconOutline,
  XIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import style from "./NavHeader.module.css";
import { ToggleState } from "../../../utils/lib/ToggleState";
import { States, StaticState } from "../../../types";
import useMeasure from "react-use-measure";
import { useNavigate } from "react-router-dom";

interface Modal {
  toggleState: {
    [key: string]: boolean;
  };
  toggleHandler: (
    type:
      | "modal"
      | "cart"
      | "notification"
      | "header_notify"
      | "side_bar"
      | "hamburger_mobile"
  ) => void;
}

const NavHeader = () => {
  const [ref, { height, top, bottom }] = useMeasure({
    polyfill: ResizeObserver,
  });
  let navigate = useNavigate();
  document.documentElement.style.setProperty(
    "--height-top",
    `${height.toString()}px`
  );

  const { toggleState, toggleStateHandler } = ToggleState() as StaticState;

  return (
    <header ref={ref} className={style.nav_header + " "}>
      {toggleState!["header_notify"] && (
        <div className="flex items-center justify-between px-6 py-1 text-[0.6em] text-white bg-gradient-to-br from-emerald-600 to-emerald-900">
          <span></span>
          <div>This is a beta version. Currently on progress</div>
          <button onClick={() => toggleStateHandler!("header_notify")}>
            <XIcon className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      <nav>
        <div className="flex items-center gap-4">
          <button
            className="btn_icon"
            onClick={() => toggleStateHandler!("hamburger_mobile")}
          >
            <span>
              <MenuIcon />
            </span>
          </button>
          {/* <FireIcon /> */}
          <span
            className="text-xs"
            onClick={() => navigate("/", { replace: true })}
          >
            BSCPE Store
          </span>
        </div>
        {/* <div className={style.nav_header_list + " "}>
          <button>Home</button>
          <button>About</button>
          <button>Home</button>
          <button>Home</button>
        </div> */}
        <div className={style.nav_header_list_mobile + " "}>
          {/* <button
            className="btn_icon"
            onClick={() => toggleStateHandler!("notification")}
          >
            <BellIconOutline />
          </button> */}

          <button
            className="btn_icon"
            onClick={() => toggleStateHandler!("cart")}
          >
            <ShoppingBagIconOutline />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavHeader;
