const LoginPage = () => {
    return (
        <div className="grid w-full place-content-center md:place-content-start md:grid-cols-3 lg:grid-cols-2">
            {/* IMAGE ON WIDER SCREEN */}
            <div className="h-[calc(100%-3em)] my-12 bg-blend-overlay relative  rounded-md overflow-hidden hidden md:block">

                <img className="absolute top-0 left-0 hidden object-cover w-full h-full mb-5 opacity-100 md:block" src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="welcome" />
                <div className="absolute top-0 left-0 hidden w-full h-full bg-gray-900 bg-blend-overlay opacity-60 md:block"></div>
            </div>
            {/* LOGIN FORM */}
            <div className="flex col-span-2 lg:col-span-1">
                <div className="flex flex-col justify-between items-center h-[calc(100vh-3em)] w-[calc(100vw-2em)] md:w-[calc(90%-2em)] lg:max-w-md mx-auto">
                    <div />
                    <div className="flex flex-col w-full p-4 mx-auto rounded-lg">
                        <h1 className="mb-8 text-3xl font-thin text-center text-gray-400">Welcome back</h1>
                        <form action="/" method="get" className="flex flex-col gap-2">
                            <input type="text" className="text-field" name="username" placeholder="Username" />
                            <input type="password" className="text-field" name="password" placeholder="Password" />
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <input type="checkbox" name="password-cache" id="password-cache" />
                                <label htmlFor="password-cache">Remember me</label>
                            </div>
                            <button type="submit" className="btn-primary"
                                aria-label="login buton"
                            >Continue to login</button>
                        </form>
                        <p className="my-4 text-xs text-center text-gray-300">Or continue with</p>
                        <button className="btn-secondary-icon"
                            aria-label="signin with google"
                        >
                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_65_1862)">
                                    <path d="M17.5781 9.70391C17.5781 14.6785 14.1715 18.2188 9.14062 18.2188C4.31719 18.2188 0.421875 14.3234 0.421875 9.5C0.421875 4.67656 4.31719 0.78125 9.14062 0.78125C11.4891 0.78125 13.4648 1.64258 14.9871 3.06289L12.6141 5.34453C9.50977 2.34922 3.73711 4.59922 3.73711 9.5C3.73711 12.541 6.16641 15.0055 9.14062 15.0055C12.593 15.0055 13.8867 12.5305 14.0906 11.2473H9.14062V8.24844H17.441C17.5219 8.69492 17.5781 9.12383 17.5781 9.70391Z" fill="#757575" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_65_1862">
                                        <rect width="18" height="18" fill="white" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>


                            <span className="">Sign in with Google</span></button>
                        <button className="btn-secondary-icon"
                            aria-label="signin with phone"
                        >
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.25 2H5.75C4.92157 2 4.25 2.67157 4.25 3.5V15.5C4.25 16.3284 4.92157 17 5.75 17H13.25C14.0784 17 14.75 16.3284 14.75 15.5V3.5C14.75 2.67157 14.0784 2 13.25 2Z" stroke="#757575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.5 14H9.5075" stroke="#757575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>


                            Sign in with Phone</button>
                    </div>
                    <p className="text-center text-gray-400/70">Don't have an account yet? <a className="btn-link" href="/register">Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage