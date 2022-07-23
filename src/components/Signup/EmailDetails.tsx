import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../auth/firebase";
import Form from "../UI/Forms/Form";
// import Input from "../UI/Forms/Input";
import OptionalSignUp from "./OptionalSignUp";
import Input from "../UI/Form/TextInput/Input";
import Button from "../UI/Buttons/Standard/Button";

interface Steps {
  nextStep?: any;
  prevStep?: any;
  handleChange: (type: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  values?: any;
}

function EmailDetails({ nextStep, prevStep, handleChange, values }: Steps) {
  // /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let regex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let navigate = useNavigate();

  let [error, setError] = useState<string | null | HTMLElement | JSX.Element>(
    null
  );
  let Continue = (e: any) => {
    e.preventDefault();

    if (values?.email.length < 1)
      return setError(<>A valid email is required to continue.</>);
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
              A valid email is required to continue.{" "}
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
        <Input
          type={"email"}
          name="email"
          title={"Email"}
          defaultValue={values.email}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setError(null);
            handleChange("email")(e);
          }}
          className={
            error ? "border-rose-400 ring-rose-400" : "border-gray-400/30"
          }
          placeholderClassName={error ? "text-rose-400" : "text-gray-400/30"}
        />
        <div className="h-3">
          {error && (
            <p className="text-rose-400/80 text-[0.6em] -mt-2 ml-1">
              {<>{error}</>}
            </p>
          )}
        </div>
        <div
          className={
            "flex flex-row-reverse items-center justify-center text-xs"
          }
        >
          {/* <button className="w-full btn-primary" onClick={Continue}>
            Create an account
          </button> */}
          <Button
            icon={<ArrowNarrowRightIcon className="w-5 h-5" />}
            direction="right"
            className={"text-xs py-4 w-full"}
            onClick={Continue}
          >
            Create an account
          </Button>
        </div>
      </Form>
      <OptionalSignUp />
    </>
  );
}

export default EmailDetails;
