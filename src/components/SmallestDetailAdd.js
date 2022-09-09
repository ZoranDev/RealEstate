// Main stuff
import { useContext, useState, useEffect } from "react";
import RealEstateContext from "../context/RealEstateContext";
import { useNavigate } from "react-router-dom";

//Import icons
import { FaCamera, FaHeart, FaAngleRight } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

//Import images
import UserImage from "../Images/UserImage.png";

// Same as lessDetailsAdd just remove some stuff and display
const SmallestDetailAdd = ({ info, openedInProfile }) => {
  // Context stuff
  const { users, addToFavorite, deleteAdd, activeUserInfo } =
    useContext(RealEstateContext);

  const navigate = useNavigate();

  // state for useName and userImage
  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    getUserNameAndImage();
  }, []);

  // get user name and user imae
  const getUserNameAndImage = () => {
    users.forEach((user) => {
      user.adds &&
        user.adds.forEach((add) => {
          if (add.addID === info.addID) {
            setUserName(user.name);
            setUserImage(user.userImageUrl);
          }
        });
    });
  };

  //showDetails
  const showDetails = () => {
    navigate(`/offers/offer/${info.addID}`);
  };

  //onClick for delete add
  const onClick = () => {
    deleteAdd(info.addID);
  };

  //add to fav
  const addToFav = () => {
    addToFavorite(info.addID);
  };

  let isFav = false;

  if (activeUserInfo && activeUserInfo.favorites.length !== 0) {
    isFav = activeUserInfo.favorites.includes(info.addID) && true;
  }

  return (
    <div
      className="w-320 border-b-2 border-green-500 flex flex-col justify-start mb-3 bg-white/70 rounded-xl"
      id={info.addID}
    >
      {/* Up-section */}
      <div className="w-full h-52 relative overflow-hidden cursor-pointer rounded-xl">
        <div className="bg-black/70 text-white p-1 rounded absolute top-3 left-3 z-10 flex justify-center items-center">
          <FaCamera />
          <p className="ml-2">{info.images.length}</p>
        </div>
        <FaHeart
          className={
            isFav
              ? "w-8 h-8 cursor-pointer absolute top-2 right-2 z-10 text-green-500"
              : "w-8 h-8 cursor-pointer absolute top-2 right-2 z-10 text-white hover:text-green-500 duration-300"
          }
          onClick={addToFav}
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
      {/* Down-section */}
      <div className="w-full px-3 py-1  flex flex-col justify-between items-left ">
        {/* Headline */}
        <h1 className="mb-1">
          {info.addType}, {info.propertyType}, {info.square} m²
        </h1>
        {/* Location */}
        <div className="flex justify-center items-center mb-1">
          <GoLocation className="mr-2" /> {info.country} , {info.city}
          {info.additionalInfo.address && `, ` + info.additionalInfo.address}
        </div>
        {/* Release time and id */}
        <div className="flex justify-left items-center mb-2">
          <p>Added: {info.releaseTime}</p>
        </div>
        {/* Details  */}
        <div className="w-full my-2 flex justify-between items-center">
          <div className="flex flex-col w-2/5 text-center mr-4">
            <p className="text-base">Price</p>
            <h1 className="text-xl text-green-500">{info.price} € </h1>
          </div>

          <div
            className="btn w-36 flex justify-center items-center bg-transparent  text-neutral-800 py-2.5 px-7  border border-neutral-800 rounded text-base cursor-pointer
            hover:bg-neutral-800 hover:text-white hover:duration-200 active:scale-95 "
            onClick={showDetails}
          >
            Details
            <FaAngleRight className="ml-2" />
          </div>
        </div>
      </div>
      {openedInProfile && (
        <h1
          className="w-44 bg-red-400 text-white text-xl mx-auto my-2 px-3 py-1 text-center rounded cursor-pointer opacity-70 hover:opacity-100"
          onClick={onClick}
        >
          Delete
        </h1>
      )}
    </div>
  );
};

export default SmallestDetailAdd;
