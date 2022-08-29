// Main stuff
import { useContext, useState } from "react";
import RealEstateContext from "../context/RealEstateContext";
import { useNavigate, Link } from "react-router-dom";

// Icons
import { FaUserAlt, FaPlusCircle, FaUserSlash, FaList } from "react-icons/fa";

const Navbar = () => {
  // Context stuff
  const { showLogIn, activeUserInfo, logOut, openNewAddForm } =
    useContext(RealEstateContext);

  // State for show user panel
  const [showUserPanel, setShowUserPanel] = useState(false);

  // State for open or close side navbar
  const [openSideNavbar, setOpenSideNavbar] = useState(false);

  // Navigate
  const navigate = useNavigate();

  // onClickUserName
  const onClickUserName = () => {
    setShowUserPanel(!showUserPanel);
  };

  // closeUserPanel
  const closeUserPanel = (e) => {
    setShowUserPanel(false);
  };

  // logOutFunction
  const logOutFunction = (e) => {
    logOut(e);
    setShowUserPanel(false);
    // Naviagte to home
    navigate("/");
  };

  // openSideNavbar
  const openSideNavbarFunction = (e) => {
    setOpenSideNavbar(true);
  };

  //closeSideNavbarFunction
  const closeSideNavbarFunction = (e) => {
    setOpenSideNavbar(false);
  };

  return (
    <nav className="w-11/12 mx-auto flex justify-between items-center">
      <div className="flex justify-center items-center">
        <FaList
          className="block w-5 h-5 mr-2 cursor-pointer sm:hidden"
          onClick={(e) => openSideNavbarFunction(e)}
        />
        <Link
          to="/"
          children={
            <div className="flex items-center justify-center text-neutral-800 cursor-pointer">
              <h1 className="text-3xl sm:text-4xl">R</h1>
              <h6 className="text-sm sm:text-xl">eal Estate</h6>
            </div>
          }
        />
      </div>
      <div
        className={
          openSideNavbar
            ? "w-32 flex justify-start items-center flex-col absolute top-0 -left-40 bg-neutral-800  h-screen p-2.5 z-10 showSideBar transform translate-x-40 duration-300 sm:flex sm:items-center sm:justify-center sm:flex-row sm:relative sm:h-auto sm:w-auto sm:bg-transparent "
            : "hidden sm:flex sm:items-center sm:justify-center"
        }
      >
        <h1
          className={
            openSideNavbar
              ? "w-5 h-5 flex items-center justify-center cursor-pointer absolute top-2 right-2 rounded-full bg-red-400 text-white hover:bg-red-500 sm:hidden"
              : "hidden "
          }
          onClick={(e) => closeSideNavbarFunction(e)}
        >
          X
        </h1>

        <Link
          to="/"
          children={
            <div className="text-white bg-transparent text-xl mb-8 hover:text-neutral-400 sm:mb-0 sm:mr-8 sm:text-neutral-800 sm:hover:text-neutral-800 sm:hover:border-b sm:hover:border-neutral-800">
              Home
            </div>
          }
        />
        <Link
          to="/offers"
          children={
            <div className="text-white bg-transparent text-xl mb-8 hover:text-neutral-400 sm:mb-0 sm:mr-8 sm:text-neutral-800 sm:hover:text-neutral-800 sm:hover:border-b sm:hover:border-neutral-800">
              Offers
            </div>
          }
        />
        <Link
          to="/About"
          children={
            <div className="text-white bg-transparent text-xl mb-8 hover:text-neutral-400 sm:mb-0 sm:mr-8 sm:text-neutral-800 sm:hover:text-neutral-800 sm:hover:border-b sm:hover:border-neutral-800">
              AboutUs
            </div>
          }
        />
      </div>
      {/* Log in btn if user is not logged, and other if it is logged */}
      {activeUserInfo ? (
        <div className="relative flex flex-col lg:flex-row">
          {/* Add add button */}
          <div
            className="w-32 flex justify-center items-center bg-transparent text-neutral-800 py-2.5 px-7 ml-4 mt-1 border border-neutral-800 rounded text-base cursor-pointer
            hover:bg-neutral-800 hover:text-white hover:duration-200 active:scale-95 md:w-44"
            onClick={(e) => openNewAddForm(e)}
          >
            <FaPlusCircle className="w-4" />
            <h1 className="text-base ml-2.5 font-thin">ADD</h1>
          </div>

          {/* User profile */}
          <div
            className="w-32 flex justify-center items-center bg-transparent  text-neutral-800 py-2.5 px-7 ml-4 mt-1 border border-neutral-800 rounded text-base cursor-pointer
            hover:bg-neutral-800 hover:text-white hover:duration-200 active:scale-95 md:w-44"
            onClick={() => onClickUserName()}
          >
            <FaUserAlt className="w-4" />
            <h1 className="text-base ml-2.5 font-thin">
              {activeUserInfo.name}
            </h1>
          </div>

          {/* Show panel for profile and logout */}
          {showUserPanel && (
            <div className="w-32 bg-neutral-800 text-white p-2.5 rounded absolute right-0 -bottom-20 z-10 sm:w-44 ">
              <Link
                className="text-white"
                to="/myProfile"
                children={
                  <h1 className="w-full mb-2.5 text-base cursor-pointer hover:text-neutral-400">
                    My Profile
                  </h1>
                }
                onClick={(e) => closeUserPanel(e)}
              />

              <div
                className="flex justify-left items-center text-base hover:text-red-500 hover:cursor-pointer"
                onClick={() => logOutFunction()}
              >
                <FaUserSlash className="mr-2" />
                Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="w-40 flex justify-center items-center bg-transparent  text-neutral-800 py-2.5 px-7 ml-4 mt-1 border border-neutral-800 rounded text-base cursor-pointer
          hover:bg-neutral-800 hover:text-white hover:duration-200 active:scale-95 md:w-44"
          id="navbarlogin"
          onClick={(e) => showLogIn(e)}
        >
          <FaUserAlt className="w-4" />
          <h1 className="text-base ml-2.5 font-thin">Log In</h1>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
