import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import {
  BadgeCheckIcon,
  CheckIcon,
} from "@heroicons/react/solid";
import React, { ChangeEvent, DetailedHTMLProps, HTMLAttributes, HTMLProps, ReactNode, useState } from "react";
import { fetchSignInMethodsForEmail, updateProfile } from "firebase/auth";
import { auth, db } from "../../auth/firebase";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../utils/lib/Auth";
import { doc, setDoc } from "firebase/firestore";
import config from "../../config.json";

let labels = ["Email", "Basic Information", "Security"];

const StepForm = () => {
  let [stepper, setStepper] = useState({
    step: 1,
    email: "",
    username: "",
    fullname: "",
    password: "",
    confirm_password: "",
  });

  const { step } = stepper;
  let prevStep = () => {
    setStepper({ ...stepper, step: step - 1 });
    if (step < 2) setStepper({ ...stepper, step: 3 });
  };

  let nextStep = () => {
    setStepper({ ...stepper, step: step + 1 });
    if (step > 2) setStepper({ ...stepper, step: 1 });
  };

  let handleChange = (input : any) => (e : any) => {
    setStepper((prev) => (prev = { ...prev, [input]: e.target.value }));
  };

  const { email, username, fullname, password, confirm_password } = stepper;
  let values = { email, username, fullname, password, confirm_password };

  let handleSteps = (step : number) => {
    switch (step) {
      case 1:
        return (
          <EmailDetails
            nextStep={nextStep}
            handleChange={handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <PersonalDetails
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <SecurityDetails
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={values}
            setStepper={setStepper}
          />
        );
      default:
      // throw new Error("Unknown step");
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="relative flex w-full before:absolute before:h-[2px] before:w-[calc(100%-35%)] before:bg-gray-300 before:top-[30%] before:left-0 before:mx-[15%]">
        {labels.map((label, index : number) => (
          <div
            className="w-[calc(33%)] 
          relative"
            key={label}
          >
            <div className="grid gap-1 text-[0.5em] text-gray-300 after:rounded-full place-items-center">
              <div className="grid p-[2px] bg-gray-300 border-8 border-gray-100 rounded-full place-content-center">
                {index + 1 < stepper.step ? (
                  <CheckIcon className="w-3  p-[2px] text-gray-300 bg-gray-700 rounded-full" />
                ) : index + 1 === stepper.step ? (
                  <CheckIcon className="w-3 p-[2px] text-gray-300 bg-gray-400/70 rounded-full" />
                ) : (
                  <CheckIcon className="w-3 p-[2px] text-gray-300 bg-gray-300 rounded-full" />
                )}
              </div>
              <p className={index + 1 === stepper.step ? "text-gray-400" : undefined}>
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="">{handleSteps(stepper.step)}</div>
    </div>
  );
};

interface Steps {
  nextStep? : any, 
  prevStep? : any, 
  handleChange: (type: string) => (e: ChangeEvent<HTMLInputElement>) => void, 
  values? : any
}



function EmailDetails({ nextStep, prevStep, handleChange, values } : Steps ) {
  // /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let regex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let navigate = useNavigate();

  let [error, setError] = useState<string | null | HTMLElement | JSX.Element>(null);
  let Continue = (e : any) => {
    e.preventDefault();

    if (values?.email.length < 1)
      return setError(<>Email required to continue</>);
    if (!regex.test(values?.email))
      return setError("Invalid email format. Please try again");

    /**
     * Firebase auth to check if email is already registered
     */
    fetchSignInMethodsForEmail(auth, values?.email)
      .then((ifEmailExist) => {
        if (ifEmailExist.length > 0)
          return setError(
            <>
              Email already registered.{" "}
              <span
                className="underline text-gray-40 w-fit"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </>
          );
        setError(null);
        return nextStep!();
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email")
          return setError("Invalid email format. Please try again");
      });
  };
  return (
    <>
      <Form>
        <div className="h-3">
          {error && <p className="text-rose-300 text-[0.68em] ">
            {<>{error}</>}</p>}
        </div>
        <Input
          type={"email"}
          name="email"
          placeholder={"Email"}
          defaultValue={values.email}
          required
          onChange={(e : ChangeEvent<HTMLInputElement>) => {
            setError(null);
            handleChange("email")(e);
          }}
          className={error ? "border-rose-400/60" : "border-gray-400/30"}
        />
        <div
          className={
            "flex flex-row-reverse items-center justify-between text-xs"
          }
        >
          <button className="w-full btn-primary"
            onClick={Continue}>
            Create an account
          </button>
        </div>
      </Form>
      <OptionalSignUp />
    </>
  );
}
function PersonalDetails({ nextStep, prevStep, handleChange, values } : Steps) {
  let [error, setError] = useState({
    username: null,
    fullname: null,
  });

  let Continue = (e : any) => {
    e.preventDefault();
    if (values.username.length < 1)
      return setError(
        (prev : any) => (prev = { ...prev, username: "Username is required" })
      );
    if (values.fullname.length < 1)
      return setError(
        (prev : any) => (prev = { ...prev, fullname: "Fullname is required" })
      );
    if (values.username.length < 5)
      return setError(
        (prev : any) =>
        (prev = {
          ...prev,
          username: "Unable to validate username/display_name",
        })
      );
    if (values.fullname.length < 6)
      return setError(
        (prev : any) =>
        (prev = {
          ...prev,
          fullname: "Unable to validate fullname",
        })
      );

    setError((prev) => (prev = { username: null, fullname: null }));
    nextStep();
  };
  let Previous = (e: any) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <>
      <Form>
        <div className="h-3 ">
          <p className="text-rose-300/80 text-[0.68em] ">
            {error?.username && error?.username}
          </p>
        </div>
        <Input
          type={"text"}
          name="username"
          placeholder={"Username"}
          defaultValue={values.username}
          autoFocus
          className={
            error?.username ? "border-rose-400/30" : "border-gray-400/30"
          }
          // autoComplete="off"
          onChange={(e : any) => {
            setError((prev) => (prev = { ...prev, username: null }));
            handleChange("username")(e);
          }}
        />
        <div className="h-3">
          <p className="text-rose-300/80 text-[0.68em] ">
            {error?.fullname && error?.fullname}
          </p>
        </div>
        <Input
          type={"text"}
          name="fullname"
          placeholder={"Fullname"}
          defaultValue={values.fullname}
          className={
            error?.fullname ? "border-rose-400/30" : "border-gray-400/30"
          }
          // autoComplete="off"
          onChange={(e : any) => {
            setError((prev) => (prev = { ...prev, fullname: null }));
            handleChange("fullname")(e);
          }}
        />
        <div className="flex flex-row-reverse items-center justify-between my-2 text-xs">
          <button
            className="flex items-center gap-2 px-4 py-2 my-2 border border-transparent rounded-md text-gray-500/70 bg-gray-200/40 hover:bg-gray-100 hover:border-gray-400"
            onClick={Continue}
          >
            Continue <ArrowNarrowRightIcon className="w-5 h-5" />
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 my-2 border border-transparent rounded-md text-gray-500/70 bg-gray-200/40 hover:bg-gray-100 hover:border-gray-400"
            onClick={Previous}
          >
            <ArrowNarrowLeftIcon className="w-5" /> Back
          </button>
        </div>
      </Form>
      <Advisory />
    </>
  );
}

interface Steppers {
  setStepper : any
}
function SecurityDetails({
  nextStep,
  prevStep,
  handleChange,
  values,
  setStepper,
} : Steps & Steppers) {
  let [error, setError] = useState({
    password: null,
    confirm_password: null,
  });
  const { createUser } : any = UserAuth();

  //Password regex format
  let lowerCaseLetters = /[a-z]/g;
  let upperCaseLetters = /[A-Z]/g;
  let number = /\d/g;

  //Password Validator
  let passLength = values?.password.length < 9;
  let passNotLower = !values?.password.match(lowerCaseLetters);
  let passNotUpper = !values?.password.match(upperCaseLetters);
  let passNotNumber = !values?.password.match(number);
  let passNotMatch = values?.password !== values?.confirm_password;

  let Continue = (e : any) => {
    e.preventDefault();

    if (values?.password === "")
      return setError(
        (prev : any) => (prev = { ...prev, password: "Password required" })
      );
    if (passLength)
      return setError(
        (prev : any) =>
        (prev = {
          ...prev,
          password: "Must contain at least 8 or more characters",
        })
      );
    if (passNotLower)
      return setError(
        (prev : any) =>
        (prev = {
          ...prev,
          password: "Must contain uppercase/capital characters",
        })
      );

    if (passNotUpper)
      return setError(
        (prev : any) =>
        (prev = {
          ...prev,
          password: "Must contain uppercase/capital characters",
        })
      );

    if (passNotNumber)
      return setError(
        (prev : any) =>
        (prev = {
          ...prev,
          password: "Must contain at least 1 numeric value",
        })
      );

    if (passNotMatch)
      return setError(
        (prev : any) => (prev = { ...prev, confirm_password: "Password not match" })
      );
    setError((prev) => (prev = { password: null, confirm_password: null }));
    return register()
      .then((res) => console.log("registration success > ", res))
      .catch((error) => console.log("registration error >", error));
  };

  let Previous = (e : any) => {
    e.preventDefault();
    prevStep();
  };

  const register = async () => {
    try {
      const user = await createUser(values?.email, values?.password);
      updateProfile(user?.user, {
        displayName: values?.username,
      });

      /**
       * change from addDoc to setDoc to manualy set root ID or UID of the document
       */
      await setDoc(doc(db, "users", user?.user?.uid), {
        uid: user?.user.uid,
        authProvider: "local",
        email: values?.email,
        fullname: values?.fullname.trim(),
        isSeller: false,
        cart: [],
      });

      /**
       * 07.08.2022 - Added Virtual card to firestore database
       *
       * Virtual Card initial setup right after user created an account
       */

      await setDoc(
        doc(db, `${config.USER}${user?.user?.uid}${config.PAYMENT}`),
        {
          uid: user?.user.uid,
          cardNumber: "0000000000000000",
          cardHolder: values?.fullname.trim(),
          cardType: ["VISA", "Master Card", "AMEX"],
          defaultCard: "VISA",
          color: ["fill-neutral-800", "fill-amber-800", "fill-slate-700"],
          bank: "Development Bank of the Philippines",
        }
      );

      navigate("/success");
    } catch (error : any) {
      console.log(error.code);
    }

    setStepper(
      (prev : any) =>
      (prev = {
        step: 1,
        email: "",
        username: "",
        fullname: "",
        password: "",
        confirm_password: "",
      })
    );
  };

  let navigate = useNavigate();

  return (
    <>
      <Form>
        <div className="h-3 ">
          <p className="text-rose-300/70 text-[0.68em] ">
            {error?.password && error?.password}
          </p>
        </div>
        <Input
          type={"password"}
          name="password"
          placeholder={"Password"}
          defaultValue={values.password}
          autoFocus
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          className={
            error?.password
              ? "border-rose-500/30"
              : passLength || passNotLower || passNotUpper || passNotNumber
                ? "border-gray-400/30"
                : "border-emerald-600/30"
          }
          onChange={(e : any) => {
            setError((prev) => (prev = { ...prev, password: null }));
            handleChange("password")(e);
          }}
        />
        <div className="h-3 ">
          <p className="text-rose-300/70 text-[0.68em] ">
            {error?.confirm_password && error?.confirm_password}
          </p>
        </div>
        <Input
          type={"password"}
          name="confirm-password"
          placeholder={"Confirm Password"}
          defaultValue={values.confirm_password}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          className={
            error?.confirm_password
              ? "border-rose-400/30"
              : passNotMatch
                ? "border-gray-400/30"
                : "border-emerald-600/30"
          }
          onChange={(e : any) => {
            setError((prev) => (prev = { ...prev, confirm_password: null }));
            handleChange!("confirm_password")(e);
          }}
        />
        <PasswordRequirementInfo
          passLength={values?.password.length < 9}
          passLowerCase={!values?.password.match(lowerCaseLetters)}
          passUpperCase={!values?.password.match(upperCaseLetters)}
          passNumber={!values?.password.match(number)}
          passNotMatch={values?.password !== values?.confirm_password}
        />
        <div className="flex flex-row-reverse items-center justify-between my-2 text-xs">
          <button
            className="flex items-center gap-2 px-4 py-2 my-2 text-gray-200 bg-gray-600 rounded-md focus:outline focus:outline-1 focus:outline-offset-2 hover:bg-gray-500"
            onClick={Continue}
          >
            Complete Setup <ArrowNarrowRightIcon className="w-5 h-5" />
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 my-2 border border-transparent rounded-md text-gray-500/70 bg-gray-200/40 hover:bg-gray-100 hover:border-gray-400"
            onClick={Previous}
          >
            <ArrowNarrowLeftIcon className="w-5" /> Back
          </button>
        </div>
      </Form>
      <AdvisorySecurity />
    </>
  );
}

function PasswordRequirementInfo({
  passLength,
  passLowerCase,
  passUpperCase,
  passNumber,
  passNotMatch,
} : {
  passLength : boolean,
  passLowerCase : boolean,
  passUpperCase: boolean,
  passNumber : boolean,
  passNotMatch : boolean,
}) {
  return (
    <>
      <div className="px-4 py-2 text-[0.62em] border border-gray-300 border-dashed rounded-md text-gray-400 w-fit mx-auto mt-4">
        <h3>Password requirement</h3>
        <div className="text-[0.86em] text-gray-400/70 px-2 font-thin mt-1">
          <div className="flex items-center gap-2">
            <BadgeCheckIcon
              className={[
                "w-3",
                passLowerCase ? "text-gray-300" : "text-emerald-600",
              ].join(" ")}
            />
            <p>Must contain lowercase/small characters</p>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheckIcon
              className={[
                "w-3",
                passUpperCase ? "text-gray-300" : "text-emerald-600",
              ].join(" ")}
            />
            <p>Must contain uppercase/capital characters</p>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheckIcon
              className={[
                "w-3",
                passNumber ? "text-gray-300" : "text-emerald-600",
              ].join(" ")}
            />
            <p>Must contain at least 1 numeric value</p>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheckIcon
              className={[
                "w-3",
                passLength ? "text-gray-300" : "text-emerald-600",
              ].join(" ")}
            />
            <p>Must contain at least 8 or more characters</p>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheckIcon
              className={[
                "w-3",
                passNotMatch ? "text-gray-300" : "text-emerald-600",
              ].join(" ")}
            />
            <p>Password match</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Form({ error, children, ...props } : { error?: string; children?: any, onClick?: any}) {
  return (
    <>
      <form className="flex flex-col" {...props}>
        <div className="flex flex-col gap-1">{children}</div>
      </form>
    </>
  );
}

function Input({ type, name, placeholder, icon, className, setter, ...props } : {
  type: string;
  name?: string;
  placeholder?: string;
  icon?: any;
  className?: string;
  setter?: any;
  defaultValue? : any
  pattern? : string;
  onChange? : any;
  autoFocus? : any;
  required? : boolean
}) {
  return (
    <input
      type={type}
      className={["text-field placeholder:text-gray-300 ", className].join(" ")}
      name={name}
      placeholder={placeholder}
      {...props}
    />
  );
}

function Advisory() {
  return (
    <div className="flex gap-2 px-2 py-4 text-xs text-gray-400 rounded-md bg-gradient-to-br from-gray-700 to-neutral-800 drop-shadow-md">
      <div>
        <ExclamationCircleIcon className="w-4 h-4" />
      </div>
      <div>
        <h3 className="mb-1">Data Collection</h3>
        <p className="text-[0.8em] text-gray-400/40 leading-3 mb-3">
          The information you may enter above will store to secured google
          firebase authentication and google firestore database to be able to
          fully utilize the functionally of the web app as their are users
          access control on some pages throughout this web application.{" "}
          <span className="italic underline">See terms and conditions</span>
        </p>
        <label
          htmlFor="terms-and-conditions"
          className="flex items-center text-[0.75em] gap-2  text-gray-400/40"
        >
          <input
            type="checkbox"
            name="terms-and-conditions"
            id="terms-and-conditions"
            defaultChecked
            className="fill-slate-400 checked:bg-gray-500"
          />
          <p>
            I agre with <span className="underline ">terms and conditions</span>
          </p>
        </label>
      </div>
    </div>
  );
}
function AdvisorySecurity() {
  return (
    <div className="px-2 py-4 space-y-2 text-xs text-gray-400 rounded-md bg-gradient-to-br from-gray-700 to-neutral-800 drop-shadow-md">
      <div className="flex gap-2 ">
        <div>
          <ExclamationCircleIcon className="w-4 h-4" />
        </div>
        <div>
          <h3 className="mb-1">Data Privacy</h3>
          <p className="text-[0.8em] text-gray-400/40 leading-3 mb-3">
            We (the developer) will not collect sensitive information you will
            enter on above section (security section). The password you will
            enter on above field will fetch directly to google authentication
            provider <b>(Firebase Auth)</b>. We don't have full control over
            with the password of those credentials as those are managed by
            google authentication through firebase auth provider which secured
            by hash map and salting security.{" "}
            <span className="italic underline">See terms and conditions</span>
          </p>
          <label
            htmlFor="terms-and-conditions"
            className="flex items-center text-[0.7em] gap-2  text-gray-400/40"
          >
            <input
              type="checkbox"
              name="terms-and-conditions"
              id="terms-and-conditions"
              defaultChecked
              className="fill-slate-400 "
            />
            <p>
              I agree with{" "}
              <span className="underline ">terms and conditions</span>
            </p>
          </label>
        </div>
      </div>
    </div>
  );
}

function OptionalSignUp() {
  return (
    <div className="w-full space-y-4">
      <p className="my-4 text-xs text-center text-gray-300">Or continue with</p>
      <button
        className="w-full btn-secondary-icon"
        aria-label="signin with google"
      >
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_65_1862)">
            <path
              d="M17.5781 9.70391C17.5781 14.6785 14.1715 18.2188 9.14062 18.2188C4.31719 18.2188 0.421875 14.3234 0.421875 9.5C0.421875 4.67656 4.31719 0.78125 9.14062 0.78125C11.4891 0.78125 13.4648 1.64258 14.9871 3.06289L12.6141 5.34453C9.50977 2.34922 3.73711 4.59922 3.73711 9.5C3.73711 12.541 6.16641 15.0055 9.14062 15.0055C12.593 15.0055 13.8867 12.5305 14.0906 11.2473H9.14062V8.24844H17.441C17.5219 8.69492 17.5781 9.12383 17.5781 9.70391Z"
              fill="#757575"
            />
          </g>
          <defs>
            <clipPath id="clip0_65_1862">
              <rect
                width="18"
                height="18"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>

        <span className="">Sign up with Google</span>
      </button>
      {/* <button
        className="w-full btn-secondary-icon"
        aria-label="signin with phone"
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.25 2H5.75C4.92157 2 4.25 2.67157 4.25 3.5V15.5C4.25 16.3284 4.92157 17 5.75 17H13.25C14.0784 17 14.75 16.3284 14.75 15.5V3.5C14.75 2.67157 14.0784 2 13.25 2Z"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 14H9.5075"
            stroke="#757575"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Sign up with Phone
      </button> */}
    </div>
  );
}

export default StepForm;