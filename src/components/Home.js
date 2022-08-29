// main stuff
import { useContext } from "react";
import RealEstateContext from "../context/RealEstateContext";
import { Link } from "react-router-dom";

// Icons
import { FaStar, FaSearch } from "react-icons/fa";

// Components
import NewAddForm from "./NewAddForm";
import LogInForm from "./LogInForm";

const Home = () => {
  const { showLogInForm, showNewAddForm, users, allAdds, rating, successDiv } =
    useContext(RealEstateContext);

  return (
    <>
      {showLogInForm && (
        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black/70 z-20 ">
          <LogInForm />
        </div>
      )}

      {/* Show error or success */}
      {successDiv.active && (
        <div className={successDiv.class}>{successDiv.message}</div>
      )}

      {/* Show or not newAdd form */}
      {showNewAddForm && (
        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black/70 z-20">
          <NewAddForm />
        </div>
      )}

      {/* Main section */}
      <section className="w-11/12 h-4/5 mx-auto mt-5 flex flex-col justify-between items-baseline">
        <div className="flex flex-col items-baseline w-11/12 md:w-3/6">
          <h1 className="w-full mb-5 mt-5 text-4xl font-bold text-justify text-neutral-800 sm:text-5xl sm:mt-10 lg:mt-20">
            Easiest way to find your dream place
          </h1>
          <p className="w-4/5 text-neutral-800 text-justify text-base lg:w-4/6">
            this is where you can find dream place place for you of various
            types at affordable prices
          </p>
        </div>

        {/* See offers btn */}
        <Link
          to="/offers"
          children={
            <button
              className="w-64 flex justify-center items-center bg-transparent text-xl text-neutral-800 py-2.5 px-7 ml-4 mt-1 border border-neutral-800 rounded text-base cursor-pointer
            hover:bg-neutral-800 hover:text-white hover:duration-200 active:scale-95"
            >
              See Offers <FaSearch className="ml-5" />
            </button>
          }
        />

        {/* Rating, num of customers, num of properties */}
        <section className="flex justify-between items-start w-5/6 mb-5 sm:w-4/12">
          <div className="flex flex-col justify-center items-center w-2/6">
            <h1 className="flex text-4xl text-blue-700">
              {parseFloat(rating.sumOfRatings / rating.totalRatings).toFixed(0)}
              <FaStar className="w-5 ml-2.5" />
            </h1>
            <p className="text-base text-neutral-700 text-center">Rating</p>
          </div>
          <div className="flex flex-col justify-center items-center w-2/6">
            <h1 className="text-4xl text-blue-700">{users.length - 1} +</h1>
            <p className="text-base text-neutral-700 text-center">
              Happy Customers
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-2/6">
            <h1 className="text-4xl text-blue-700">{allAdds.length} +</h1>
            <p className="text-base text-neutral-700 text-center">
              Property Ready
            </p>
          </div>
        </section>
      </section>
    </>
  );
};

export default Home;
