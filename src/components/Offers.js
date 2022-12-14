// main stuff
import { useState, useContext } from "react";
import RealEstateContext from "../context/RealEstateContext";

// icons
import { FaList, FaTh, FaFilter } from "react-icons/fa";

// Components
import LessDetailAdd from "./LessDetailAdd";
import LogInForm from "./LogInForm";
import NewAddForm from "./NewAddForm";
import SmallestDetailAdd from "./SmallestDetailAdd";

const Offers = () => {
  // Context stuff
  const {
    users,
    allAdds,
    showLogInForm,
    showNewAddForm,
    successDiv,
    displayedAdds,
    sortFromContext,
    quickFilterFunction,
  } = useContext(RealEstateContext);

  // State for range sliders
  const [rangeSliders, setRangeSliders] = useState({
    range1: 1,
    range2: 500000,
  });

  // State for display property - based on sort on the right side
  const [howToDisplay, setHowToDisplay] = useState("list");

  // State for quick filter from the left side
  const [quickFilterInfo, setQuickFilterInfo] = useState({
    propertyStatus: null,
    propertyCategory: null,
    priceMin: 1,
    priceMax: 500000,
  });

  // State for showSideBarFilter
  const [showSideBarFilter, setShowSideBarFilter] = useState({
    active: false,
    class:
      "hidden lg:w-1/5 lg:h-full lg:border-r-2 lg:border-dashed lg:border-neutral-800 lg:flex lg:flex-col lg:justify-start lg:items-center",
  });

  //numberOfAdds
  let numberOfAdds =
    displayedAdds.length !== 0 ? displayedAdds.length : allAdds.length;

  //sliderOne
  const sliderOne = (e) => {
    if (
      parseInt(e.target.parentElement.children[2].value) -
        parseInt(e.target.value) <=
      0
    ) {
      e.target.value = e.target.parentElement.children[2].value;
    }
    setRangeSliders({ ...rangeSliders, range1: e.target.value });
    setQuickFilterInfo({ ...quickFilterInfo, priceMin: e.target.value });
  };

  // sliderTwo
  const sliderTwo = (e) => {
    if (
      parseInt(e.target.value) -
        parseInt(e.target.parentElement.children[1].value) <=
      0
    ) {
      e.target.value = e.target.parentElement.children[1].value;
    }
    setRangeSliders({ ...rangeSliders, range2: e.target.value });
    setQuickFilterInfo({ ...quickFilterInfo, priceMax: e.target.value });
  };

  //handleOnChange
  const handleOnChange1 = (e) => {
    setRangeSliders({ ...rangeSliders, range1: e.target.value });
    setQuickFilterInfo({ ...quickFilterInfo, priceMin: e.target.value });
  };

  //handleOnChange
  const handleOnChange2 = (e) => {
    setRangeSliders({ ...rangeSliders, range2: e.target.value });
    setQuickFilterInfo({ ...quickFilterInfo, priceMax: e.target.value });
  };

  //sortResults
  const sortResults = (e) => {
    sortFromContext(e);
  };

  //changeDisplayOfAdds
  const changeDisplayOfAdds = (howToDisplay) => {
    if (howToDisplay === "display-list") {
      setHowToDisplay("list");
    } else if (howToDisplay === "display-table") {
      setHowToDisplay("table");
    }
  };

  //fillQuickFilter
  const fillQuickFilter = (e) => {
    if (e.target.id === "Rent" || e.target.id === "Sell") {
      setQuickFilterInfo({
        ...quickFilterInfo,
        propertyStatus: e.target.value,
      });
    } else if (
      e.target.id === "House" ||
      e.target.id === "Condo" ||
      e.target.id === "Land" ||
      e.target.id === "BusinessSpace"
    ) {
      setQuickFilterInfo({
        ...quickFilterInfo,
        propertyCategory: e.target.value,
      });
    }
  };

  // showSideBarFilterFunction
  const showSideBarFilterFunction = (e) => {
    setShowSideBarFilter({
      active: true,
      class:
        "absolute top-0 left-0 h-full w-60 border-none bg-neutral-600 text-white flex flex-col justify-start items-center z-20 lg:relative lg:w-1/5 lg:h-full lg:border-r-2 lg:border-dashed lg:border-neutral-800 lg:flex lg:flex-col lg:justify-start lg:items-center lg:bg-transparent lg:text-neutral-800 ",
    });
  };

  //closeSideBarFilter
  const closeSideBarFilter = (e) => {
    setShowSideBarFilter({
      active: false,
      class:
        "hidden lg:w-1/5 lg:h-full lg:border-r-2 lg:border-dashed lg:border-neutral-800 lg:flex lg:flex-col lg:justify-start lg:items-center",
    });
  };

  return (
    <>
      {/* Show or not log in form */}
      {showLogInForm && (
        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black/70 z-20">
          <LogInForm />
        </div>
      )}

      {/* Show or not newAdd form */}
      {showNewAddForm && (
        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black/70 z-20">
          <NewAddForm />
        </div>
      )}

      {/* Show error or success */}
      {successDiv.active && (
        <div className={successDiv.class}>{successDiv.message}</div>
      )}

      <section className="w-95 h-89 bg-white/70 text-neutral-800 mx-auto mt-2 p-5 flex justify-between items-center overflow-hidden relative">
        {/* Quick filter options */}
        <div className={showSideBarFilter.class}>
          {/* Close button when filter is open as side bar */}
          <h1
            className="block absolute top-2 right-0.5 bg-red-800 w-5 h-5 flex justify-center items-center rounded-full opacity-70 hover:opacity-100 cursor-pointer lg:hidden"
            onClick={(e) => closeSideBarFilter(e)}
          >
            x
          </h1>

          {/* Property status */}
          <div className="w-4/5 p-2 mb-4 border border-neutral-800 rounded-xl property-status">
            <h1 className="text-base mb-3">Property status</h1>
            <div className="property-status-options">
              <div className="mb-2 flex justify-left items-center">
                <input
                  type="radio"
                  value="Rent"
                  id="Rent"
                  name="radio-status"
                  onChange={(e) => fillQuickFilter(e)}
                />
                <label
                  htmlFor="Rent"
                  className="text-base ml-2 text-neutral-800"
                >
                  Rent
                </label>
              </div>
              <div className="mb-2 flex justify-left items-center">
                <input
                  type="radio"
                  value="Sell"
                  id="Sell"
                  name="radio-status"
                  onChange={(e) => fillQuickFilter(e)}
                />
                <label
                  htmlFor="Sell"
                  className="text-base ml-2 text-neutral-800"
                >
                  Sell
                </label>
              </div>
            </div>
          </div>

          {/* Property category */}
          <div className="w-4/5 p-2 mb-4 border border-neutral-800 rounded-xl property-category">
            <h1 className="text-base mb-3">Property category</h1>
            <div className="property-category-options">
              <div className="mb-2 flex justify-left items-center">
                <input
                  type="radio"
                  value="House"
                  id="House"
                  name="radio-category"
                  onChange={(e) => fillQuickFilter(e)}
                />
                <label
                  htmlFor="House"
                  className="text-base ml-2 text-neutral-800"
                >
                  House
                </label>
              </div>
              <div className="mb-2 flex justify-left items-center">
                <input
                  type="radio"
                  value="Condo"
                  id="Condo"
                  name="radio-category"
                  onChange={(e) => fillQuickFilter(e)}
                />
                <label
                  htmlFor="Condo"
                  className="text-base ml-2 text-neutral-800"
                >
                  Condo
                </label>
              </div>
              <div className="mb-2 flex justify-left items-center">
                <input
                  type="radio"
                  value="Land"
                  id="Land"
                  name="radio-category"
                  onChange={(e) => fillQuickFilter(e)}
                />
                <label
                  htmlFor="Land"
                  className="text-base ml-2 text-neutral-800"
                >
                  Land
                </label>
              </div>
              <div className="mb-2 flex justify-left items-center">
                <input
                  type="radio"
                  value="BusinessSpace"
                  id="BusinessSpace"
                  name="radio-category"
                  onChange={(e) => fillQuickFilter(e)}
                />
                <label
                  htmlFor="BusinessSpace"
                  className="text-base ml-2 text-neutral-800"
                >
                  Business Space
                </label>
              </div>
            </div>
          </div>

          {/* Property price */}
          <div className="w-4/5 p-2 mb-4 border border-neutral-800 rounded-xl property-price">
            <h1 className="text-base mb-3">Property price (???)</h1>
            <div className="w-full flex items-center justify-between">
              <input
                type="number"
                value={rangeSliders.range1}
                onChange={(e) => handleOnChange1(e)}
                className="w-45 text-base p-1"
              />
              <input
                type="number"
                value={rangeSliders.range2}
                onChange={(e) => handleOnChange2(e)}
                className="w-45 text-base p-1"
              />
            </div>
            <div className="slide-container">
              <div className="slider-track"></div>
              <input
                type="range"
                min="1"
                max="500000"
                value={rangeSliders.range1}
                className="slider"
                id="myRange"
                onInput={(e) => sliderOne(e)}
              />
              <input
                type="range"
                min="1"
                max="500000"
                value={rangeSliders.range2}
                className="slider"
                id="myRange"
                onInput={(e) => sliderTwo(e)}
              />
            </div>
          </div>
          <button
            className="w-4/5 flex justify-center items-center bg-transparent  text-neutral-800 py-2.5 px-7  mt-1 border border-neutral-800 rounded text-base cursor-pointer
            hover:bg-neutral-800 hover:text-white hover:duration-200 active:scale-95 "
            onClick={(e) => quickFilterFunction(e, quickFilterInfo)}
          >
            Confirm
          </button>
        </div>

        {/* All Offers */}
        <div className="w-full lg:w-79 h-full pr-5 flex flex-col justify-start items-baseline p-2 overflow-y-scroll scrollbar scrollbar-thumb-neutral-800 scrollbar-track-neutral-100">
          <div className="w-full flex justify-start items-center">
            <FaFilter
              className="block w-5 h-5 text-green-500 cursor-pointer mr-2 opacity-70 hover:opacity-100 lg:hidden"
              onClick={(e) => showSideBarFilterFunction(e)}
            />
            <h1>All real estate found </h1>
          </div>

          <div className="w-full py-2 px-5 border border-neutral-800 rounded-xl flex justify-between mx-auto my-2">
            <div className="flex-col sm:flex-row flex justify-center items-center">
              {/* This has to be dynamically   */}
              <p className="text-sm lg:text-base mr-2 mb-2 sm:mb-0 text-bold flex justofy-center items-center">
                {numberOfAdds} Adds founded.
              </p>{" "}
              <select
                name="sort"
                id="sort"
                className="bg-transparent p-1 border border-neutral-500 rounded-tl rounded-tr outline-0"
                onChange={(e) => sortResults(e)}
              >
                <option value="No-Sort">No Sort</option>
                <option value="Newest-Oldest">Newest-Oldest</option>
                <option value="Oldest-Newest">Oldest-Newest</option>
                <option value="PriceMax-Min">PriceMax-Min</option>
                <option value="PriceMin-Max">PriceMin-Max</option>
              </select>
            </div>

            <div className="text-base flex justify-center items-center">
              <FaList
                className="mr-2 cursor-pointer hover:text-green-500"
                id="display-list"
                onClick={() => changeDisplayOfAdds("display-list")}
              />
              <FaTh
                className="cursor-pointer hover:text-green-500"
                id="display-table"
                onClick={() => changeDisplayOfAdds("display-table")}
              />
            </div>
          </div>
          <div
            className={
              howToDisplay === "list"
                ? "w-full flex flex-col justify-start items-center"
                : "w-full flex flex-wrap justify-evenly items-center"
            }
          >
            {/* Here we need to display adds based on filter and then sort based on sorted */}

            {displayedAdds.length !== 0
              ? howToDisplay === "list"
                ? displayedAdds.map((add, index) => {
                    return <LessDetailAdd info={add} key={index} />;
                  })
                : displayedAdds.map((add, index) => {
                    return <SmallestDetailAdd info={add} key={index} />;
                  })
              : howToDisplay === "list"
              ? users.map(
                  (user, index) =>
                    user.adds &&
                    user.adds.map((add, index) => {
                      return <LessDetailAdd info={add} key={index} />;
                    })
                )
              : users.map(
                  (user, index) =>
                    user.adds &&
                    user.adds.map((add, index) => {
                      return <SmallestDetailAdd info={add} key={index} />;
                    })
                )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Offers;
