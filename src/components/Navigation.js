function Navigation() {

    return (
        <nav className="fixed bg-gray-800 flex justify-around w-full bottom-0 left-0 text-gray-400 min-h-[64px] rounded-t-lg overflow-hidden sm:hidden">
            <button className="flex-1 flex flex-col items-center justify-center gap-1 hover:bg-gray-900 hover:text-gray-200 ">
                <svg width="24" height="24" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.4612 30.718C29.8692 30.718 31.8292 32.664 31.8292 35.056V41.208C31.8292 41.722 32.2412 42.134 32.7692 42.146H36.5812C39.5852 42.146 42.0272 39.734 42.0272 36.77V19.322C42.0132 18.302 41.5272 17.342 40.6932 16.704L27.5072 6.188C25.7372 4.786 23.2612 4.786 21.4852 6.192L8.38916 16.7C7.52316 17.358 7.03716 18.318 7.02716 19.356V36.77C7.02716 39.734 9.46916 42.146 12.4732 42.146H16.3212C16.8632 42.146 17.3032 41.716 17.3032 41.188C17.3032 41.072 17.3172 40.956 17.3412 40.846V35.056C17.3412 32.678 19.2892 30.734 21.6792 30.718H27.4612ZM36.5812 45.146H32.7332C30.5292 45.094 28.8292 43.364 28.8292 41.208V35.056C28.8292 34.318 28.2152 33.718 27.4612 33.718H21.6892C20.9512 33.722 20.3412 34.324 20.3412 35.056V41.188C20.3412 41.338 20.3212 41.482 20.2792 41.618C20.0632 43.598 18.3712 45.146 16.3212 45.146H12.4732C7.81516 45.146 4.02716 41.388 4.02716 36.77V19.342C4.04716 17.354 4.96316 15.534 6.54516 14.336L19.6152 3.846C22.4932 1.566 26.5032 1.566 29.3752 3.842L42.5392 14.342C44.0852 15.52 45.0012 17.336 45.0272 19.3V36.77C45.0272 41.388 41.2392 45.146 36.5812 45.146Z" fill="currentColor" />
                </svg>

                <span className="font-thin text-[0.70em]">Home</span>
            </button>
            <button className="flex-1 flex flex-col items-center justify-center gap-1 hover:bg-gray-900 hover:text-gray-200 ">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M23.5616 4.00049C28.7893 4.00049 33.1079 7.98381 33.6404 13.0783L33.789 13.0801C36.689 13.0801 40.215 15.0061 41.405 20.4081L42.983 32.6221C43.549 36.5641 42.841 39.7261 40.875 41.9941C38.919 44.2501 35.823 45.4441 31.921 45.4441H15.225C10.939 45.4441 7.953 44.3941 6.095 42.2361C4.229 40.0721 3.605 36.8261 4.241 32.5901L5.793 20.5381C6.813 15.0121 10.543 13.0801 13.431 13.0801C13.6803 10.781 14.717 8.59389 16.3616 6.95449C18.2516 5.07649 20.8576 4.00049 23.5196 4.00049H23.5616ZM33.789 16.0801H13.431C12.549 16.0801 9.601 16.4361 8.755 21.0041L7.211 33.0041C6.709 36.3701 7.097 38.8061 8.367 40.2801C9.621 41.7361 11.865 42.4441 15.225 42.4441H31.921C34.017 42.4441 36.879 42.0261 38.607 40.0301C39.979 38.4481 40.451 36.0921 40.011 33.0261L38.453 20.9221C37.789 17.9401 36.037 16.0801 33.789 16.0801ZM29.3946 21.6483C30.2226 21.6483 30.9406 22.3203 30.9406 23.1483C30.9406 23.9763 30.3146 24.6483 29.4866 24.6483H29.3946C28.5666 24.6483 27.8946 23.9763 27.8946 23.1483C27.8946 22.3203 28.5666 21.6483 29.3946 21.6483ZM17.7344 21.6483C18.5624 21.6483 19.2804 22.3203 19.2804 23.1483C19.2804 23.9763 18.6524 24.6483 17.8244 24.6483H17.7344C16.9064 24.6483 16.2344 23.9763 16.2344 23.1483C16.2344 22.3203 16.9064 21.6483 17.7344 21.6483ZM23.5556 7.00049H23.5256C21.6436 7.00049 19.8096 7.75849 18.4796 9.08049C17.3962 10.159 16.6876 11.5769 16.4584 13.0792L30.617 13.0797C30.103 9.64324 27.1314 7.00049 23.5556 7.00049Z" fill="currentColor" />
                </svg>


                <span className="font-thin text-[0.70em] ">Cart</span>
            </button>
            <button className="flex-1 flex flex-col items-center justify-center gap-1 hover:bg-gray-900 hover:text-gray-200 ">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M39.68 36.3868C39.68 42.9788 30.64 43.7408 23.842 43.7408L23.3555 43.7404C19.0244 43.7299 8 43.4564 8 36.3468C8 29.8893 16.6767 29.0263 23.423 28.9938L24.3285 28.9932C28.6593 29.0037 39.68 29.2772 39.68 36.3868ZM23.842 31.9928C15.32 31.9928 11 33.4568 11 36.3468C11 39.2628 15.32 40.7408 23.842 40.7408C32.362 40.7408 36.68 39.2768 36.68 36.3868C36.68 33.4708 32.362 31.9928 23.842 31.9928ZM23.842 4C29.698 4 34.46 8.764 34.46 14.62C34.46 20.476 29.698 25.238 23.842 25.238H23.778C17.934 25.22 13.2 20.454 13.2199 14.614C13.2199 8.764 17.984 4 23.842 4ZM23.842 6.856C19.56 6.856 16.076 10.338 16.076 14.62C16.062 18.888 19.52 22.368 23.784 22.384L23.842 23.812V22.384C28.122 22.384 31.604 18.9 31.604 14.62C31.604 10.338 28.122 6.856 23.842 6.856Z" fill="currentColor" />
                </svg>


                <span className="font-thin text-[0.70em]">Account</span>
            </button>
        </nav>
    )
}


export default Navigation