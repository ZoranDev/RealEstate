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

  //resetInputInfo
  const resetInputInfo = () => {
    setUserInputs({
      email: "",
      password: "",
      name: "",
      lastName: "",
      phone: "",
    });
  };

  //showLogInForm
  const showLogInForm = () => {
    setLogInType("log-in");
  };

  //showRegisterForm
  const showRegisterForm = () => {
    setLogInType("register");
  };

  // handleShowPassword
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // handleUserInputs
  const handleUserInputs = (e) => {
    let id = e.target.id;
    let value = e.target.value;

    setUserInputs({
      email: id === "email" ? value : userInputs.email,
      password: id === "password" ? value : userInputs.password,
      name: id === "register-name" ? value : userInputs.name,
      lastName: id === "register-lastName" ? value : userInputs.lastName,
      phone: id === "register-phone" ? value : userInputs.phone,
    });
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
            message: "User don't found. Check info or register.",
          });
        }
      });
    } else {
      // Check to see if typed e-mail alredy exist in our users
      {
        users.map((user) => user.email).includes(userInputs.email)
          ? setError({ active: true, message: "Alredy exist." })
          : createNewUser(userInputs);
      }
    }

    resetInputInfo();
  };

  return (
    <form
      className="bg-white w-80 py-5 px-6 rounded-lg relative"
      onSubmit={formSubmit}
    >
      {/* Nav section */}
      <nav className="flex justify-between text-neutral-800 w-full mb-5 py-1 text-base">
        <h1
          className={
            logInType === "log-in"
              ? "border-b-2 border-neutral-800 cursor-pointer"
              : "cursor-pointer"
          }
          onClick={showLogInForm}
        >
          Log In
        </h1>
        <h1
          className={
            logInType === "register"
              ? "border-b-2 border-neutral-800 cursor-pointer"
              : "cursor-pointer"
          }
          onClick={showRegisterForm}
        >
          Register
        </h1>
      </nav>
      {/* Input section */}

      <div className="flex flex-col">
        <div className="flex bg-neutral-100 w-full h-10 mb-5 p-2.5 rounded-md">
          <FaRegEnvelope className="text-neutral-500 h-full w-5 mr-2.5 " />
          <input
            onChange={handleUserInputs}
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
              onClick={handleShowPassword}
              className="text-neutral-500 h-full w-5 mr-2.5 cursor-pointer"
            />
          ) : (
            <FaEyeSlash
              onClick={handleShowPassword}
              className="text-neutral-500 h-full w-5 mr-2.5 cursor-pointer"
            />
          )}

          <input
            onChange={handleUserInputs}
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
                onChange={handleUserInputs}
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
                onChange={handleUserInputs}
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
                onChange={handleUserInputs}
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
        onClick={showLogIn}
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
