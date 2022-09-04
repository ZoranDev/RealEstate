// Main stuff
import { useContext, useState, useEffect } from "react";
import RealEstateContext from "../context/RealEstateContext";
import { useNavigate, useParams } from "react-router-dom";

// Icons
import { GoLocation } from "react-icons/go";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import LogInForm from "./LogInForm";
import NewAddForm from "./NewAddForm";

const DetailAdd = () => {
  const { allAdds, users, showLogInForm, showNewAddForm, successDiv } =
    useContext(RealEstateContext);

  const navigate = useNavigate();

  const params = useParams();

  // State for gallery image
  const [indexImg, setIndexImg] = useState(0);
  const [cl, setCl] = useState(0); // cl for displaying index of img

  // State for add to display
  const [addToDisplay, setAddToDisplay] = useState(null);

  // State for owner info
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    getAddToDisplay();
    getOwnerInfo();
    // eslint-disable-next-line
  }, []);

  // Get add to display info
  const getAddToDisplay = () => {
    allAdds.forEach((add) => {
      add.addID === params.id && setAddToDisplay(add);
    });
  };

  // Get owner info
  const getOwnerInfo = () => {
    users.forEach((user) => {
      // If user have adds
      user.adds &&
        user.adds.forEach((add) => add.addID === params.id && setOwner(user));
    });
  };

  //moveLeft - see previous image
  const moveLeft = () => {
    // If there is previous
    if (indexImg !== 0) {
      setIndexImg(indexImg - 1);
      setCl(indexImg - 1);
    }
  };

  //moveRight - see next image
  const moveRight = () => {
    // If there is next image
    if (indexImg !== addToDisplay.images.length - 1) {
      setIndexImg(indexImg + 1);
      setCl(indexImg + 1);
    }
  };

  return (
    <>
      {showLogInForm && (
        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black/70 z-20">
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
      {addToDisplay && (
        <div className="w-90 h-4/5 bg-white/70 text-neutral-800 mx-auto my-10 p-5 flex flex-col lg:flex-row lg:justify-between lg:items-baseline relative overflow-y-scroll scrollbar scrollbar-thumb-neutral-800 scrollbar-track-neutral-100 lg:overflow-hidden">
          {/* Close button */}
          <h1
            className="w-8 h-8 border-red-500 border text-red-500 rounded-full absolute top-2.5 right-2.5 flex justify-center items-center cursor-pointer active:scale-90"
            onClick={() => navigate("/offers")}
          >
            X
          </h1>
          {/* About property section */}
          <div className="w-full lg:w-65 lg:h-full lg:overflow-y-scroll lg:scrollbar lg:scrollbar-thumb-neutral-800 lg:scrollbar-track-neutral-100">
            {/* Key info */}
            <div className="w-full flex justify-start mb-2.5 ">
              <div className="py-1 px-5 rounded mr-4 text-white bg-green-500">
                {addToDisplay.addType}
              </div>
              <div className="py-1 px-5 rounded text-white bg-blue-500">
                {addToDisplay.propertyType}
              </div>
            </div>

            {/* Add title */}
            <h1 className="w-full mb-4">
              {addToDisplay.addType}, {addToDisplay.propertyType},
              {addToDisplay.square} m², {addToDisplay.price} €
            </h1>

            {/* Location */}
            <div className="flex justify-start items-center mb-4">
              <GoLocation className="mr-4" /> {addToDisplay.country} ,
              {addToDisplay.city}
              {addToDisplay.additionalInfo.address &&
                `, ` + addToDisplay.additionalInfo.address}
            </div>

            {/* Gallery */}
            <div className="w-90 h-84 lg:h-300 bg-black/70 mb-4 relative flex justify-between">
              <FaChevronLeft
                className="w-12 h-12 text-white opacity-70 cursor-pointer hover:opacity-100 relative top-2/4 -translate-y-2/4"
                onClick={moveLeft}
              />

              <img
                className="h-full max-w-80"
                src={addToDisplay.images[indexImg]}
                alt="Images"
              />

              <FaChevronRight
                className="w-12 h-12 text-white opacity-70 cursor-pointer hover:opacity-100 relative top-2/4 -translate-y-2/4"
                onClick={moveRight}
              />

              <p className="absolute z-20 bg-black/80 text-white p-1 rounded top-2 left-1/2 -translate-x-1/2">
                ({cl + 1}/{addToDisplay.images.length})
              </p>
            </div>

            {/* Description */}
            <div className="w-90 mb-4 leading-6">
              <h3 className="text-justify">Description</h3>
              <p className="text-justify">{addToDisplay.description}</p>
            </div>

            {/* Additional features */}
            <div className="w-90 mb-4">
              <h3 className="mb-4">Additional features</h3>
              <div className="flex flex-wrap justify-between items-center w-full">
                {[
                  "Air Condition",
                  "Floor",
                  "Number of bathrooms",
                  "Number of rooms",
                  "Number of terraces",
                  "Parking",
                ].map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="w-36 lg:w-28 mb-4 p-2 border border-neutral-800 rounded text-center"
                    >
                      <h4>{item}</h4>
                      <h5 className="text-bold text-base text-green-500">
                        {item === "Air Condition"
                          ? addToDisplay.additionalInfo.airCondition
                          : item === "Floor"
                          ? addToDisplay.additionalInfo.floor
                          : item === "Number of bathrooms"
                          ? addToDisplay.additionalInfo.numOfBathrooms
                          : item === "Number of rooms"
                          ? addToDisplay.additionalInfo.numOfRooms
                          : item === "Number of terraces"
                          ? addToDisplay.additionalInfo.numOfTerraces
                          : addToDisplay.additionalInfo.parking}
                      </h5>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add info */}
            <div className="w-90 leading-6">
              <h5>Add ID: {addToDisplay.addID}</h5>
              <h5>Release time: {addToDisplay.releaseTime} </h5>
            </div>
          </div>

          {/* About owner section */}
          <div className="w-full lg:w-30 lg:h-full lg:border-l lg:border-dashed lg:border-l-neutral-800 lg:pl-4">
            <h1 className="mb-5">About property owner</h1>
            {["Name", "Phone", "E-mail"].map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-8 flex justify-between items-center mb-5"
                >
                  <h2 className="w-30 h-full bg-black/70 text-white p-2 rounded-tl rounded-bl flex justidy-start items-center">
                    {item}
                  </h2>
                  <h3 className="w-70 h-full bg-black/50 text-white p-2 rounded-tr rounded-br flex justidy-start items-center">
                    {item === "Name"
                      ? owner.name
                      : item === "Phone"
                      ? owner.phone
                      : owner.email}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default DetailAdd;
