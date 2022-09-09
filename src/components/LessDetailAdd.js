// Main stuff
import { useContext, useState, useEffect } from "react";
import RealEstateContext from "../context/RealEstateContext";
import { useNavigate } from "react-router-dom";
import UserImage from "../Images/UserImage.png";

// Icons
import { FaCamera, FaHeart, FaAngleRight } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

const LessDetailAdd = ({ info }) => {
  // Context stuff
  const { users, addToFavorite, activeUserInfo } =
    useContext(RealEstateContext);

  // state for userName and userImage
  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    getUserNameAndImage();
  }, []);

  //getUserNameAndImage function
  const getUserNameAndImage = () => {
    users.forEach((user) => {
      if (user.adds) {
        user.adds.forEach((add) => {
          if (add.addID === info.addID) {
            setUserName(user.name);
            setUserImage(user.userImageUrl);
          }
        });
      }
    });
  };

  // This is used for onClick function below
  const navigate = useNavigate();

  //clickOnHeart
  const clickOnHeart = () => {
    addToFavorite(info.addID);
  };

  let isFav = false;

  if (activeUserInfo && activeUserInfo.favorites.length !== 0) {
    isFav = activeUserInfo.favorites.includes(info.addID) && true;
  }

  const img1 = `${info.images[0]}`;

  return (
    <div
      className="w-full border-b-2 border-green-500 flex flex-col md:flex-row justify-between mb-3 bg-white/80 rounded-xl"
      id={info.addID}
    >
      {/* left-section */}
      <div className="w-full md:w-30 h-full relative overflow-hidden cursor-pointer rounded-xl">
        <div className="bg-black/70 text-white p-1 rounded absolute top-3 left-3 z-10 flex justify-center items-center">
          <FaCamera className="mr-2" />
          <p>{info.images.length}</p>
        </div>
        <FaHeart
          className={
            isFav
              ? "w-8 h-8 cursor-pointer absolute top-2 right-2 z-10 text-green-500"
              : "w-8 h-8 cursor-pointer absolute top-2 right-2 z-10 text-white hover:text-green-500 duration-300"
          }
          onClick={clickOnHeart}
        />

        <img
          className="w-full h-200 rounded-xl duration-500 hover:scale-105"
          src={info.images[0]}
          alt="Front"
        />

        <div className="absolute left-2 bottom-2 flex justify-center items-center">
          <img
            className="rounded-full mr-2"
            src={userImage ? userImage : UserImage}
            alt="User"
            width="50px"
            height="50px"
          />
          <h1 className="text-sm text-white">{userName ? userName : ""}</h1>
        </div>
      </div>
      {/* right-section */}
      <div className="w-full md:w-67 md:h-full mt-2 md:mt-0 flex flex-col items-center justify-between pb-1">
        {/* Headline */}
        <h1 className="w-full mb-1">
          {info.addType}, {info.propertyType}, {info.square} m²
        </h1>
        {/* Location */}
        <div className="w-full mb-1 flex justify-left items-center">
          <GoLocation className="mr-2" /> {info.country} , {info.city}
          {info.additionalInfo.address && `, ` + info.additionalInfo.address}
        </div>
        {/* Release time and id */}
        <div className="w-full mb-1 flex justify-left items-center">
          <p className="mr-2">Added: {info.releaseTime}</p>
          <p>ID: {info.addID}</p>
        </div>
        {/* Key word */}
        <div className="w-full mb-1 flex justify-left items-center">
          <h1 className="py-0.5 px-3 text-white mr-2 rounded bg-green-500">
            {info.addType}
          </h1>
          <h1 className="py-0.5 px-3 text-white rounded bg-blue-500">
            {info.propertyType}
          </h1>
        </div>
        {/* Short about property */}
        <div className="w-full mb-1">{info.description}</div>
        {/* Details  */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between">
          <div className="w-25 mb-3 md:mb-0 text-center flex flex-col justify-center items-center">
            <p className="text-base mb-1">Price</p>
            <h1 className="text-xl text-green-500">{info.price} € </h1>
          </div>
          <div className="w-25  mb-3 md:mb-0  text-center flex flex-col justify-center items-center">
            <p className="text-base mb-1">Surface</p>
            <h1 className="text-xl">{info.square} m² </h1>
          </div>
          <div className="w-25  mb-3 md:mb-0 text-center flex flex-col justify-center items-center">
            <p className="text-base mb-1">Num of rooms</p>
            <h1 className="text-xl">
              {info.additionalInfo.numOfRooms
                ? info.additionalInfo.numOfRooms
                : "?"}
            </h1>
          </div>
          <div
            onClick={() => navigate(`/offers/offer/${info.addID}`)}
            className="w-40 flex justify-center items-center bg-transparent  text-neutral-800 py-2.5 px-7 mr-4  border border-neutral-800 rounded text-base cursor-pointer
          hover:bg-neutral-800 hover:text-white hover:duration-200 active:scale-95 "
          >
            Details <FaAngleRight className="ml-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessDetailAdd;
