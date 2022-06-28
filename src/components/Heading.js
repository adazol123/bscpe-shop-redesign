import { useState } from "react";
import { Link } from "react-router-dom";

import { UserAuth } from "../lib/Auth";
import { motion } from "framer-motion";

import Sidebar from "./Sidebar";
const Heading = () => {
  const [open, setOpen] = useState(false);

  const { currentUser } = UserAuth();

  const handleOpenMenu = () => {
    setOpen((prev) => !prev);
  };
  // console.log(currentUser)
  return (
    <>
      <header className="fixed z-30 w-full px-2 text-xs font-thin text-gray-500 bg-white sm:px-4 lg:px-5 -top-0">
        <nav className="flex justify-between items-center container mx-auto min-h-[48px]">
          <div className="block hambuger sm:hidden">
            <button
              className="p-1 rounded-md hover:text-gray-100 focus:text-gray-100 hover:bg-gray-400 focus:bg-gray-400"
              onClick={handleOpenMenu}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div className="logo flex leading-[0.6em] my-auto">
            <h1 className="whitespace-nowrap ">BSCPE STORE</h1>
            <span className="bg-gray-100 px-1 rounded-md font-light text-emerald-500 text-[0.6em] ml-1 border border-gray-300 mb-1">
              Beta
            </span>
          </div>
          <div className="flex items-center side">
            <ul className="hidden gap-2 text-gray-400 sm:flex lg:gap-2">
              <li>
                <a
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-900 lg:px-4 lg:py-2"
                  href="/#"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 49 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M27.4612 30.718C29.8692 30.718 31.8292 32.664 31.8292 35.056V41.208C31.8292 41.722 32.2412 42.134 32.7692 42.146H36.5812C39.5852 42.146 42.0272 39.734 42.0272 36.77V19.322C42.0132 18.302 41.5272 17.342 40.6932 16.704L27.5072 6.188C25.7372 4.786 23.2612 4.786 21.4852 6.192L8.38916 16.7C7.52316 17.358 7.03716 18.318 7.02716 19.356V36.77C7.02716 39.734 9.46916 42.146 12.4732 42.146H16.3212C16.8632 42.146 17.3032 41.716 17.3032 41.188C17.3032 41.072 17.3172 40.956 17.3412 40.846V35.056C17.3412 32.678 19.2892 30.734 21.6792 30.718H27.4612ZM36.5812 45.146H32.7332C30.5292 45.094 28.8292 43.364 28.8292 41.208V35.056C28.8292 34.318 28.2152 33.718 27.4612 33.718H21.6892C20.9512 33.722 20.3412 34.324 20.3412 35.056V41.188C20.3412 41.338 20.3212 41.482 20.2792 41.618C20.0632 43.598 18.3712 45.146 16.3212 45.146H12.4732C7.81516 45.146 4.02716 41.388 4.02716 36.77V19.342C4.04716 17.354 4.96316 15.534 6.54516 14.336L19.6152 3.846C22.4932 1.566 26.5032 1.566 29.3752 3.842L42.5392 14.342C44.0852 15.52 45.0012 17.336 45.0272 19.3V36.77C45.0272 41.388 41.2392 45.146 36.5812 45.146Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="hidden text-gray-500 lg:block">Home</span>
                </a>
              </li>

              <li>
                <a
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-900 lg:px-4 lg:py-2"
                  href="/#list"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.6485 40.212C21.6845 41.366 23.0145 42 24.3945 42H24.3965C25.7825 42 27.1185 41.366 28.1565 40.21C28.7125 39.596 29.6605 39.546 30.2745 40.1C30.8905 40.654 30.9405 41.604 30.3865 42.218C28.7705 44.012 26.6445 45 24.3965 45H24.3925C22.1505 44.998 20.0285 44.01 18.4185 42.216C17.8645 41.602 17.9145 40.652 18.5305 40.1C19.1465 39.544 20.0945 39.594 20.6485 40.212ZM24.4941 2C33.3841 2 39.3561 8.924 39.3561 15.39C39.3561 18.716 40.2021 20.126 41.1001 21.622C41.9881 23.098 42.9941 24.774 42.9941 27.942C42.2961 36.036 33.8461 36.696 24.4941 36.696C15.1421 36.696 6.69011 36.036 6.00009 28.07C5.99411 24.774 7.00011 23.098 7.88811 21.622L8.2016 21.0943C8.97346 19.7677 9.63211 18.3247 9.63211 15.39C9.63211 8.924 15.6041 2 24.4941 2ZM24.4941 5C17.5041 5 12.6321 10.476 12.6321 15.39C12.6321 19.548 11.4781 21.47 10.4581 23.166C9.64011 24.528 8.99411 25.604 8.99411 27.942C9.32811 31.714 11.8181 33.696 24.4941 33.696C37.1001 33.696 39.6681 31.626 40.0001 27.812C39.9941 25.604 39.3481 24.528 38.5301 23.166C37.5101 21.47 36.3561 19.548 36.3561 15.39C36.3561 10.476 31.4841 5 24.4941 5Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="hidden text-gray-500 lg:block">
                    Notification
                  </span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-900 lg:px-4 lg:py-2"
                  href="/#list"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.087 39.9035C16.515 39.9035 17.677 41.0635 17.677 42.4915C17.677 43.9195 16.515 45.0815 15.087 45.0815C13.659 45.0815 12.499 43.9195 12.499 42.4915C12.499 41.0635 13.659 39.9035 15.087 39.9035ZM37.6476 39.9035C39.0776 39.9035 40.2396 41.0635 40.2396 42.4915C40.2396 43.9195 39.0776 45.0815 37.6476 45.0815C36.2196 45.0815 35.0596 43.9195 35.0596 42.4915C35.0596 41.0635 36.2196 39.9035 37.6476 39.9035ZM6.5354 6.01873L10.6954 6.73873C11.3654 6.85673 11.8754 7.41273 11.9334 8.09273L12.4034 13.6947L14.1511 13.6955C14.4363 13.6956 14.7185 13.6957 14.9976 13.6959L18.2063 13.6974C18.462 13.6975 18.7149 13.6976 18.965 13.6978L22.5078 13.6997C22.7303 13.6998 22.9502 13.7 23.1675 13.7001L25.6502 13.7017C25.8468 13.7018 26.041 13.702 26.2327 13.7021L28.4163 13.7037C28.5887 13.7038 28.7588 13.704 28.9266 13.7041L30.8305 13.7057C30.9802 13.7059 31.1278 13.706 31.2732 13.7062L32.5245 13.7074C32.6573 13.7075 32.788 13.7077 32.9167 13.7078L34.3658 13.7095C34.4788 13.7096 34.5899 13.7098 34.6992 13.7099L35.9227 13.7116C36.0176 13.7118 36.1107 13.7119 36.2021 13.7121L36.9797 13.7134C37.0612 13.7135 37.1411 13.7136 37.2194 13.7138L38.0856 13.7155C38.1519 13.7157 38.2167 13.7158 38.28 13.716L38.8131 13.7173C38.8683 13.7175 38.9222 13.7176 38.9748 13.7178L39.5463 13.7196C39.5891 13.7197 39.6308 13.7199 39.6714 13.72L40.007 13.7214C40.0411 13.7215 40.0742 13.7217 40.1062 13.7219L40.4457 13.7237C40.4704 13.7239 40.4941 13.724 40.5171 13.7242L40.7021 13.7256C40.7204 13.7257 40.7379 13.7259 40.7547 13.726L40.8879 13.7275C40.9007 13.7276 40.913 13.7278 40.9247 13.7279L41.0153 13.7294C41.0239 13.7295 41.0319 13.7297 41.0395 13.7299L41.0969 13.7313C41.1021 13.7315 41.107 13.7316 41.1116 13.7318L41.1531 13.7338C41.1556 13.7339 41.158 13.7341 41.1602 13.7342C41.1797 13.7361 41.1825 13.7364 41.1854 13.7367C42.2994 13.8987 43.2794 14.4807 43.9474 15.3767C44.6154 16.2707 44.8954 17.3727 44.7354 18.4767L42.8374 31.5927C42.4794 34.0887 40.3114 35.9707 37.7914 35.9707H15.9494C13.3154 35.9707 11.0854 33.9147 10.8714 31.2847L9.0394 9.49673L6.0254 8.97673C5.2074 8.83273 4.6614 8.05873 4.8014 7.24073C4.9454 6.42273 5.7354 5.89073 6.5354 6.01873ZM13.7499 16.6954L12.6554 16.6947L13.8614 31.0387C13.9494 32.1427 14.8514 32.9707 15.9534 32.9707H37.7874C38.8294 32.9707 39.7194 32.1947 39.8674 31.1647L41.7674 18.0467C41.8114 17.7347 41.7334 17.4227 41.5434 17.1707C41.3554 16.9167 41.0794 16.7527 40.7674 16.7087C40.753 16.7093 40.7184 16.7098 40.6648 16.7102L40.4472 16.7115C40.4017 16.7117 40.3517 16.7118 40.2972 16.712L39.1642 16.7137C39.0686 16.7138 38.9692 16.7139 38.8661 16.7139L36.2022 16.7138C36.0536 16.7137 35.9021 16.7137 35.7479 16.7136L32.7077 16.7118C32.5256 16.7116 32.3414 16.7115 32.1554 16.7114L30.4352 16.71C30.2392 16.7098 30.0418 16.7096 29.843 16.7095L28.0209 16.7079C27.8151 16.7077 27.6083 16.7075 27.4007 16.7073L26.1455 16.7062C25.9349 16.706 25.7237 16.7058 25.512 16.7056L23.5966 16.7038C23.383 16.7036 23.1693 16.7034 22.9556 16.7032L21.6743 16.702C21.4611 16.7018 21.2481 16.7016 21.0355 16.7014L19.7651 16.7003C19.5544 16.7001 19.3443 16.6999 19.135 16.6997L17.274 16.6981C17.0701 16.6979 16.8674 16.6978 16.6658 16.6976L14.314 16.6958C14.1242 16.6957 13.9361 16.6955 13.7499 16.6954ZM34.5752 21.0873C35.4032 21.0873 36.0752 21.7593 36.0752 22.5873C36.0752 23.4153 35.4032 24.0873 34.5752 24.0873H29.0312C28.2012 24.0873 27.5312 23.4153 27.5312 22.5873C27.5312 21.7593 28.2012 21.0873 29.0312 21.0873H34.5752Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="hidden text-gray-500 lg:block">Cart</span>
                </a>
              </li>
              {currentUser ? (
                <li>
                  <Link
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-900 lg:px-4 lg:py-2"
                    to={"/user"}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M39.68 36.3868C39.68 42.9788 30.64 43.7408 23.842 43.7408L23.3555 43.7404C19.0244 43.7299 8 43.4564 8 36.3468C8 29.8893 16.6767 29.0263 23.423 28.9938L24.3285 28.9932C28.6593 29.0037 39.68 29.2772 39.68 36.3868ZM23.842 31.9928C15.32 31.9928 11 33.4568 11 36.3468C11 39.2628 15.32 40.7408 23.842 40.7408C32.362 40.7408 36.68 39.2768 36.68 36.3868C36.68 33.4708 32.362 31.9928 23.842 31.9928ZM23.842 4C29.698 4 34.46 8.764 34.46 14.62C34.46 20.476 29.698 25.238 23.842 25.238H23.778C17.934 25.22 13.2 20.454 13.2199 14.614C13.2199 8.764 17.984 4 23.842 4ZM23.842 6.856C19.56 6.856 16.076 10.338 16.076 14.62C16.062 18.888 19.52 22.368 23.784 22.384L23.842 23.812V22.384C28.122 22.384 31.604 18.9 31.604 14.62C31.604 10.338 28.122 6.856 23.842 6.856Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-gray-500 ">
                      {currentUser?.displayName}
                    </span>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="flex items-center gap-2 px-4 py-2 text-gray-800 bg-gray-100 rounded-md hover:bg-gray-900 hover:text-gray-50 lg:px-4 lg:py-2"
                    to={"/login"}
                  >
                    {" "}
                    Login{" "}
                  </Link>
                </li>
              )}
            </ul>
            <button className="block px-1 rounded-md sm:hidden" href="/">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.3833 16.7666C11.7612 16.7666 13.0479 16.3184 14.0938 15.5713L18.0283 19.5059C18.2109 19.6885 18.4517 19.7798 18.7007 19.7798C19.2402 19.7798 19.6304 19.3647 19.6304 18.8335C19.6304 18.5845 19.5474 18.3521 19.3647 18.1694L15.4551 14.2515C16.2769 13.1724 16.7666 11.8359 16.7666 10.3833C16.7666 6.87207 13.8945 4 10.3833 4C6.86377 4 4 6.87207 4 10.3833C4 13.8945 6.86377 16.7666 10.3833 16.7666ZM10.3833 15.3887C7.63574 15.3887 5.37793 13.1226 5.37793 10.3833C5.37793 7.64404 7.63574 5.37793 10.3833 5.37793C13.1226 5.37793 15.3887 7.64404 15.3887 10.3833C15.3887 13.1226 13.1226 15.3887 10.3833 15.3887Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>
      <motion.div>
        <Sidebar isOpen={open} setOpen={setOpen} />
      </motion.div>
    </>
  );
};

export default Heading;
