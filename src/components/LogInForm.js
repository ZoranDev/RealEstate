// Main stuff
import { useState, useContext } from "react";
import RealEstateContext from "../context/RealEstateContext";

// Components
import Error from "./Error";

// Icons
import {
  FaUser,
  FaEye,
  FaEyeSlash,
  FaPhoneAlt,
  FaRegEnvelope,
  FaUserPlus,
} from "react-icons/fa";

const LogInForm = () => {
  // Context stuff
  const { users, createNewUser, setActiveUser, showLogIn } =
    useContext(RealEstateContext);

  // State for log in or register
  const [logInType, setLogInType] = useState("log-in");

  // State for show password
  const [showPassword, setShowPassword] = useState(false);

  // State for error while log in or register
  const [error, setError] = useState({
    active: false,
    message: "Error message",
  });

  // State for input fields for log in or register
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    phone: "",
  });

  // showLogOrReg
  const showLogOrReg = (type) => {
    if (type === "log-in") {
      setLogInType("log-in");
    } else {
      setLogInType("register");
    }
  };

  // handleShowPassword
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // handleUserInputs
  const handleUserInputs = (e) => {
    if (e.target.id === "email") {
      setUserInputs({ ...userInputs, email: e.target.value });
    } else if (e.target.id === "password") {
      setUserInputs({ ...userInputs, password: e.target.value });
    } else if (e.target.id === "register-name") {
      setUserInputs({ ...userInputs, name: e.target.value });
    } else if (e.target.id === "register-lastName") {
      setUserInputs({ ...userInputs, lastName: e.target.value });
    } else if (e.target.id === "register-phone") {
      setUserInputs({ ...userInputs, phone: e.target.value });
    } else if (e.target.id === "register-email") {
      setUserInputs({ ...userInputs, email: e.target.value });
    } else if (e.target.id === "register-password") {
      setUserInputs({ ...userInputs, password: e.target.value });
    }
  };

  // formSubmit
  const formSubmit = (e) => {
    e.preventDefault();
    if (logInType === "log-in") {
      users.forEach((user) => {
        if (
          user.email === userInputs.email &&
          user.password === userInputs.password
        ) {
          setActiveUser(user);
          showLogIn();
        } else {
          setError({
            active: true,
            message: "User don't exist. Check info or register.",
          });
          setUserInputs({ email: "", password: "" });
        }
      });
    } else if (logInType === "register") {
      // Check to see if typed e-mail alredy exist in our users
      let alredyThere = false;
      users.forEach((user) => {
        if (user.email === userInputs.email) {
          alredyThere = true;
        }
      });
      if (alredyThere) {
        setError({ active: true, message: "Alredy exist." });
      } else {
        createNewUser(userInputs);
      }
    }
  };

  return (
    <form
      className="bg-white w-80 py-5 px-6 rounded-lg relative"
      onSubmit={(e) => formSubmit(e)}
    >
      {/* Nav section */}
      <nav className="flex justify-between text-neutral-800 w-full mb-5 py-1 text-base">
        <h1
          className={
            logInType === "log-in"
              ? "border-b-2 border-neutral-800 cursor-pointer"
              : "cursor-pointer"
          }
          onClick={() => showLogOrReg("log-in")}
        >
          Log In
        </h1>
        <h1
          className={
            logInType === "register"
              ? "border-b-2 border-neutral-800 cursor-pointer"
              : "cursor-pointer"
          }
          onClick={() => showLogOrReg("register")}
        >
          Register
        </h1>
      </nav>
      {/* Input section */}

      <div className="flex flex-col">
        <div className="flex bg-neutral-100 w-full h-10 mb-5 p-2.5 rounded-md">
          <FaRegEnvelope className="text-neutral-500 h-full w-5 mr-2.5 " />
          <input
            onChange={(e) => handleUserInputs(e)}
            id="email"
            className="bg-transparent text-neutral-800 border-0 outline-0 h-full w-4/5 text-base"
            type="email"
            placeholder="E-mail"
            required={true}
            value={userInputs.email}
          />
        </div>
        <div className="flex bg-neutral-100 w-full h-10 mb-5 p-2.5 rounded-md">
          {showPassword ? (
            <FaEye
              onClick={() => handleShowPassword()}
              className="text-neutral-500 h-full w-5 mr-2.5 cursoir-pointer"
            />
          ) : (
            <FaEyeSlash
              onClick={() => handleShowPassword()}
              className="text-neutral-500 h-full w-5 mr-2.5 cursoir-pointer"
            />
          )}

          <input
            onChange={(e) => handleUserInputs(e)}
            id="password"
            className="bg-transparent text-neutral-800 border-0 outline-0 h-full w-4/5 text-base"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required={true}
            value={userInputs.password}
          />
        </div>

        {logInType !== "log-in" && (
          <>
            <div className="flex bg-neutral-100 w-full h-10 mb-5 p-2.5 rounded-md">
              <FaUser className="text-neutral-500 h-full w-5 mr-2.5 " />
              <input
                onChange={(e) => handleUserInputs(e)}
                id="register-name"
                className="bg-transparent text-neutral-800 border-0 outline-0 h-full w-4/5 text-base"
                type="text"
                placeholder="Name"
                required={true}
                value={userInputs.name}
              />
            </div>
            <div className="flex bg-neutral-100 w-full h-10 mb-5 p-2.5 rounded-md">
              <FaUser className="text-neutral-500 h-full w-5 mr-2.5 " />
              <input
                onChange={(e) => handleUserInputs(e)}
                id="register-lastName"
                className="bg-transparent text-neutral-800 border-0 outline-0 h-full w-4/5 text-base"
                type="text"
                placeholder="Last Name"
                required={true}
                value={userInputs.lastName}
              />
            </div>
            <div className="flex bg-neutral-100 w-full h-10 mb-5 p-2.5 rounded-md">
              <FaPhoneAlt className="text-neutral-500 h-full w-5 mr-2.5" />
              <input
                onChange={(e) => handleUserInputs(e)}
                id="register-phone"
                className="bg-transparent text-neutral-800 border-0 outline-0 h-full w-4/5 text-base"
                type="text"
                placeholder="Phone number"
                required={true}
                value={userInputs.phone}
              />
            </div>
          </>
        )}

        <button
          className="w-full flex justify-center items-center bg-transparent  text-neutral-800 py-2.5  mt-1 border border-neutral-800 rounded text-base cursor-pointer
          hover:bg-neutral-800 hover:text-white hover:duration-200 active:scale-95 "
          type="submit"
        >
          {logInType === "log-in" ? (
            "Log In"
          ) : (
            <>
              <FaUserPlus className="mr-2" /> Register
            </>
          )}
        </button>
      </div>

      {/* Close section */}
      <div
        className="flex absolute -right-2.5 -top-5 text-xl text-white cursor-pointer"
        onClick={(e) => showLogIn(e)}
      >
        x
      </div>

      {/* Error section */}
      {error.active && (
        <div className="text-red-500 mt-3 text-base text-justify">
          <Error message={error.message} />
        </div>
      )}
    </form>
  );
};

export default LogInForm;
