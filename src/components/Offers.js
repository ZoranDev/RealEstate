// main stuff
import { useState, useContext, useEffect } from "react";
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

  // State for quick filter from the left side
  const [quickFilterInfo, setQuickFilterInfo] = useState({
    propertyStatus: null,
    propertyCategory: null,
    priceMin: 1,
    priceMax: 500000,
  });

  // State for display property - based on sort on the right side
  const [howToDisplay, setHowToDisplay] = useState("list");

  // State for showSideBarFilter
  const [showSideBarFilter, setShowSideBarFilter] = useState({
    active: false,
    class:
      "hidden lg:w-1/5 lg:h-full lg:border-r-2 lg:border-dashed lg:border-neutral-800 lg:flex lg:flex-col lg:justify-start lg:items-center",
  });

  // When change range sliders then change and quickFilterInfo
  useEffect(() => {
    setQuickFilterInfo({
      ...quickFilterInfo,
      priceMin: rangeSliders.range1,
      priceMax: rangeSliders.range2,
    });
    // eslint-disable-next-line
  }, [rangeSliders.range1, rangeSliders.range2]);

  const handle = (e) => {
    let value = e.target.value;
    // Set range sliders ranges based on slider (first 2 ifs) based on input (second 2 ifs)
    if (e.target.id === "myRange1") {
      let number =
        rangeSliders.range2 - value <= 0 ? rangeSliders.range2 : value;
      setRangeSliders({ ...rangeSliders, range1: number });
      return;
    }
    if (e.target.id === "myRange2") {
      let number =
        value - rangeSliders.range1 <= 0 ? rangeSliders.range1 : value;
      setRangeSliders({ ...rangeSliders, range2: number });
      return;
    }
    if (e.target.id === "range1") {
      setRangeSliders({ ...rangeSliders, range1: value });
      return;
    }
    if (e.target.id === "range2") {
      setRangeSliders({ ...rangeSliders, range2: value });
      return;
    }
  };

  //numberOfAdds
  let numberOfAdds =
    displayedAdds.length !== 0 ? displayedAdds.length : allAdds.length;

  //sortResults
  const sortResults = (e) => {
    sortFromContext(e);
  };

  // displayAddsAsTable
  const displayAddsAsTable = () => {
    setHowToDisplay("table");
  };

  //displayAddsAsList
  const displayAddsAsList = () => {
    setHowToDisplay("list");
  };

  // fill QuickFilter
  const fillQuickFilter = (e) => {
    e.target.id === "Rent" || e.target.id === "Sell"
      ? setQuickFilterInfo({
          ...quickFilterInfo,
          propertyStatus: e.target.value,
        })
      : setQuickFilterInfo({
          ...quickFilterInfo,
          propertyCategory: e.target.value,
        });
  };

  // showSideBarFilterFunction
  const showSideBarFilterFunction = () => {
    setShowSideBarFilter({
      active: true,
      class:
        "absolute top-0 left-0 h-full w-60 border-none bg-neutral-600 text-white flex flex-col justify-start items-center z-20 lg:relative lg:w-1/5 lg:h-full lg:border-r-2 lg:border-dashed lg:border-neutral-800 lg:flex lg:flex-col lg:justify-start lg:items-center lg:bg-transparent lg:text-neutral-800 ",
    });
  };

  //closeSideBarFilter
  const closeSideBarFilter = () => {
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
            onClick={closeSideBarFilter}
          >
            x
          </h1>

          {/* Property status */}
          <div
            className={`w-4/5 p-2 ${
              showSideBarFilter && "bg-white"
            } mb-4 border border-neutral-800 rounded-xl property-status`}
          >
            <h1
              className={`text-base mb-3 ${
                showSideBarFilter && "text-neutral-800"
              }`}
            >
              Property status
            </h1>
            <div>
              {["Rent", "Sell"].map((item, index) => (
                <div
                  className="mb-2 flex justify-left items-center"
                  key={index}
                >
                  <input
                    type="radio"
                    value={item}
                    id={item}
                    name="radio-status"
                    onChange={fillQuickFilter}
                  />
                  <label
                    htmlFor={item}
                    className="text-base ml-2 text-neutral-800"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Property category */}
          <div
            className={`w-4/5 p-2 mb-4 ${
              showSideBarFilter && "bg-white"
            } border border-neutral-800 rounded-xl property-category`}
          >
            <h1
              className={`text-base mb-3 ${
                showSideBarFilter && "text-neutral-800"
              }`}
            >
              Property category
            </h1>
            <div>
              {["House", "Condo", "Land", "BusinessSpace"].map(
                (item, index) => (
                  <div
                    key={index}
                    className="mb-2 flex justify-left items-center"
                  >
                    <input
                      type="radio"
                      value={item}
                      id={item}
                      name="radio-category"
                      onChange={fillQuickFilter}
                    />
                    <label
                      htmlFor={item}
                      className="text-base ml-2 text-neutral-800"
                    >
                      {item === "BusinessSpace" ? "Business Space" : item}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Property price */}
          <div
            className={`w-4/5 p-2 ${
              showSideBarFilter && "bg-white"
            } mb-4 border border-neutral-800 rounded-xl property-price`}
          >
            <h1
              className={`text-base mb-3 ${
                showSideBarFilter && "text-neutral-800"
              }`}
            >
              Property price (€)
            </h1>
            <div className="w-full flex items-center justify-between">
              <input
                type="number"
                value={rangeSliders.range1}
                onChange={handle}
                className={`w-45 text-base p-1 ${
                  showSideBarFilter &&
                  "border-2 border-neutral-400 text-neutral-800"
                }`}
                id="range1"
              />
              <input
                type="number"
                value={rangeSliders.range2}
                onChange={handle}
                className={`w-45 text-base p-1 ${
                  showSideBarFilter &&
                  "border-2 border-neutral-400 text-neutral-800"
                }`}
                id="range2"
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
                id="myRange1"
                onInput={handle}
              />
              <input
                type="range"
                min="1"
                max="500000"
                value={rangeSliders.range2}
                className="slider"
                id="myRange2"
                onInput={handle}
              />
            </div>
          </div>
          <button
            className={`w-4/5 flex justify-center items-center ${
              showSideBarFilter ? "bg-white" : "bg-transparent"
            }  text-neutral-800 py-2.5 px-7  mt-1 border border-neutral-800 rounded text-base cursor-pointer
            hover:bg-neutral-800 hover:text-white hover:duration-200 active:scale-95`}
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
              onClick={showSideBarFilterFunction}
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
                onClick={displayAddsAsList}
              />
              <FaTh
                className="cursor-pointer hover:text-green-500"
                id="display-table"
                onClick={displayAddsAsTable}
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
                  (user) =>
                    user.adds &&
                    user.adds.map((add, index) => {
                      return <LessDetailAdd info={add} key={index} />;
                    })
                )
              : users.map(
                  (user) =>
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
