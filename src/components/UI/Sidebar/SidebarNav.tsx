import {
  ArrowRightIcon,
  BellIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  TagIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  HomeIcon,
  LogoutIcon,
  ShoppingBagIcon,
  UserIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  HomeIcon as HomeIconLine,
  ShoppingBagIcon as ShoppingBagIconLine,
  ViewGridIcon as ViewGridIconLine,
} from "@heroicons/react/outline";
import React, { SVGProps } from "react";
import style from "./SidebarNav.module.css";
import { Modal, StaticState } from "../../../types";
import CustomNavLink from "../../../utils/others/CustomNavLink";
import { UserAuth } from "../../../utils/lib/Auth";
import { Link, useNavigate } from "react-router-dom";
import { ToggleState } from "../../../utils/lib/ToggleState";
import Dropdown from "../Buttons/Dropdown/Dropdown";
import Button from "./../Buttons/Standard/Button";
import ButtonCustom from "../Buttons/Custom/ButtonCustom";
import NavLink from "../../../utils/others/NavLink";
export const SidebarNav = ({ state, toggleStateHandler }: Modal) => {
  let { currentUser, logout }: any = UserAuth();
  let navigate = useNavigate();
  let { toggleStateHandler: rootStateHandler } = ToggleState() as StaticState;
  return (
    <>
      {state && (
        <button onClick={toggleStateHandler} className={style.backdrop} />
      )}
      <div
        className={[
          style.side_bar,
          state ? style.side_bar_active : "",
          currentUser
            ? "grid-rows-[144px,_1fr,_144px]"
            : "grid-rows-[144px,_1fr,_78px]",
        ].join(" ")}
      >
        <div className={style.side_bar_header}>
          <div className="bg-[url(https://images.unsplash.com/photo-1604066867775-43f48e3957d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)] h-full bg-cover bg-center mix-blend-multiply absolute inset-0"></div>
          <div className={style.top}>
            <button
              tabIndex={state ? 0 : -1}
              onClick={() => {
                toggleStateHandler();
                rootStateHandler("notification");
              }}
              className="btn_icon"
            >
              <BellIcon />
            </button>
            <button
              tabIndex={state ? 1 : -1}
              className="btn_icon"
              onClick={toggleStateHandler}
            >
              <XIcon />
            </button>
          </div>
          <div className={style.bottom}>
            <h2>BSCPE Store V2</h2>
            <p>Lorem ipsum dolor sit.</p>
          </div>
        </div>

        <nav>
          {/* <button className={style.active}>
          <div>
          <span><HomeIcon /> </span>
          <span>Home</span>
          </div>
        </button>
        <button>
          <div>
          <span><ShoppingBagIconLine /></span>
          <span>Shopping cart</span>
          </div>
        </button>
        <button>
          <div>
          <span><ViewGridIconLine /></span>
          <span>Categories</span>

          </div>
          <span><ChevronDownIcon /></span>
        </button>
        <button>
          <div>
          <span><InformationCircleIcon /></span>
          <span>About</span>

          </div>
        </button> */}
          {/* <CustomNavLink to="" onClick={toggleStateHandler}>
            <SideNavButton Icon={HomeIconLine} name={"Home"} />
          </CustomNavLink>

          <button
            onClick={() => {
              toggleStateHandler();
              rootStateHandler("cart");
            }}
          >
            <SideNavButton Icon={ShoppingBagIcon} name={"Shopping cart"} />
          </button> */}

          <NavLink to="/0" onClick={toggleStateHandler}>
            <ButtonCustom icon={<HomeIcon />} className="w-full text-sm">
              Home
            </ButtonCustom>
          </NavLink>

          <ButtonCustom
            icon={<ShoppingBagIconLine />}
            className="w-full text-sm"
            onClick={() => {
              toggleStateHandler();
              rootStateHandler("cart");
            }}
          >
            Shopping cart
          </ButtonCustom>
          <Dropdown title="Categories">
            <NavLink to={"/0"} onClick={toggleStateHandler}>
              <span>
                <TagIcon />
              </span>
              <span>Men</span>
            </NavLink>
            <NavLink to={"/1"} onClick={toggleStateHandler}>
              <span>
                <TagIcon />
              </span>
              <span>Women</span>
            </NavLink>
            <NavLink to={"/2"} onClick={toggleStateHandler}>
              <span>
                <TagIcon />
              </span>
              <span>Kids</span>
            </NavLink>
          </Dropdown>
          <NavLink to="/about" onClick={toggleStateHandler}>
            <ButtonCustom
              icon={<InformationCircleIcon />}
              className="w-full text-sm"
            >
              About
            </ButtonCustom>
          </NavLink>

          {/* <CustomNavLink to="about" onClick={toggleStateHandler}>
            <SideNavButton Icon={InformationCircleIcon} name={"About"} />
          </CustomNavLink> */}
        </nav>
        <footer className={style.footer}>
          {currentUser ? (
            <NavLink to="/account" onClick={toggleStateHandler}>
              <Button type="outline" className="w-full py-3 justify-between">
                <div className="inline-flex gap-3 items-center">
                  <span>
                    <UserIcon />
                  </span>
                  <div className="text-start">
                    <p className="text-xs font-bold">
                      {currentUser?.displayName}
                    </p>
                    <p className="text-[0.6em] text-black/40">
                      {currentUser?.email}
                    </p>
                  </div>
                </div>
                <ArrowRightIcon />
              </Button>
            </NavLink>
          ) : (
            <Button
              onClick={() => {
                toggleStateHandler();
                navigate("/login");
              }}
              className="text-xs py-4"
            >
              <span />
              <span>Login/Signup</span>
              <span>
                <ArrowRightIcon />
              </span>
            </Button>
          )}

          {currentUser && (
            <ButtonCustom
              icon={<LogoutIcon className="w-4 text-gray-400 -h-4" />}
              className="text-xs py-4"
              onClick={() => {
                logout();
                toggleStateHandler();
              }}
            >
              <p className="text-neutral-600">Logout</p>
            </ButtonCustom>
          )}
        </footer>
      </div>
    </>
  );
};

function SideNavButton({ Icon, name }: { Icon?: any; name: string }) {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="icon">
          <Icon className="w-4 h-4 text-gray-400/60" />
        </div>
        <p className="">{name}</p>
      </div>
      <ChevronRightIcon className="hidden w-4 h-4 group-hover:block" />
    </>
  );
}
