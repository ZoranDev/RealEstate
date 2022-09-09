// Main stuff
import { useState, useContext, useEffect } from "react";
import RealEstateContext from "../context/RealEstateContext";
import { Link } from "react-router-dom";

// Components
import NewAddForm from "./NewAddForm";
import SmallestDetailAdd from "./SmallestDetailAdd";

// Import default url picture
import DefaultUrlPicture from "../Images/UserImage.png";

export const MyProfile = () => {
  const {
    activeUserInfo,
    saveNewProfileInfo,
    successDiv,
    allAdds,
    showNewAddForm,
  } = useContext(RealEstateContext);

  // State for show my adds or favorite adds
  const [addsToShow, setAddsToShow] = useState("myAdds");

  // State for my-profile info
  const [myProfileInfo, setMyProfileInfo] = useState(activeUserInfo);

  // State for uploaded picture
  const [uploadedPicture, setUploadedPicture] = useState(null);

  useEffect(() => {
    if (activeUserInfo.userImageUrl !== "") {
      setUploadedPicture(activeUserInfo.userImageUrl);
    }
  }, []);

  //updateMyProfileInfo - on save changes btn we need to save that in context
  const updateMyProfileInfo = (e) => {
    setMyProfileInfo({
      ...myProfileInfo,
      name:
        e.target.id === "my-profile-name" ? e.target.value : myProfileInfo.name,
      lastName:
        e.target.id === "my-profile-lastName"
          ? e.target.value
          : myProfileInfo.lastName,
      phone:
        e.target.id === "my-profile-phone"
          ? e.target.value
          : myProfileInfo.phone,
    });
  };

  // upload profile picture
  const uploadProfilePicture = async (e) => {
    let b64img = await convertBase64(e.target.files[0]);
    setUploadedPicture(b64img);
  };

  // get base64 for uploaded image
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(file);

      filereader.onload = () => {
        resolve(filereader.result);
      };

      filereader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // handleClick
  const handleClick = (e) => {
    setAddsToShow(e.target.id);
  };

  //onClick
  const onClick = () => {
    saveNewProfileInfo(myProfileInfo, uploadedPicture);
  };

  return (
    <>
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

      <div className="w-full md:w-70 h-85 bg-white/80 text-neutral-800 mx-auto my-3 px-5 py-2 rounded flex flex-col justify-start relative">
        <h1 className="w-full mb-4">My Profile</h1>
        <Link
          to="/"
          children={<h1>X</h1>}
          className="w-7 h-6 bg-neutral-700 text-white font-bold rounded absolute top-2.5 right-2.5 flex justify-center items-center cursor-pointer active:scale-90 hover:bg-neutral-800"
        />

        <div className="w-full h-full md:overflow-hidden flex flex-col md:flex-row justify-between items-center overflow-y-scroll scrollbar scrollbar-thumb-neutral-800 scrollbar-track-neutral-100 ">
          <div className="w-full md:w-45 h-full mb-5 md:mb-0 md:border-r-2 md:border-dashed md:border-neutral-800">
            {/* Image section */}
            <div className="mb-4 flex flex-col md:flex-row justify-start items-center md:items-end">
              <div className="flex justify-center items-center flex-col mr-4">
                <h2 className="mb-4">Profile image</h2>
                <label
                  htmlFor="profile-image"
                  className="w-24 h-24 flex justify-center items-center bg-neutral-400 border border-dashed border-neutral-800 text-xl opacity-70 hover:opacity-100 cursor-pointer flex"
                >
                  + Upload
                  <input
                    onChange={uploadProfilePicture}
                    type="file"
                    name="profile-image"
                    id="profile-image"
                    multiple={false}
                    accept="image/jpeg, image/png, image/jpg"
                    className="hidden"
                  />
                </label>
              </div>

              <div className="mt-2 w-24 h-24 rounded-full">
                <img
                  src={
                    activeUserInfo.userImageUrl === "" && !uploadedPicture
                      ? DefaultUrlPicture
                      : uploadedPicture
                  }
                  alt="Profile"
                  className="w-full h-full rounded-full"
                />
              </div>
            </div>
            {["Name", "Last name", "Phone"].map((item, index) => (
              <div className="w-full mb-4" key={index}>
                <h2 className="mb-2">{item}</h2>
                <input
                  type="text"
                  value={
                    activeUserInfo
                      ? item === "Name"
                        ? myProfileInfo.name
                        : item === "Last name"
                        ? myProfileInfo.lastName
                        : myProfileInfo.phone
                      : ""
                  }
                  id={
                    item === "Name"
                      ? "my-profile-name"
                      : item === "Last name"
                      ? "my-profile-lastName"
                      : "my-profile-phone"
                  }
                  onChange={updateMyProfileInfo}
                  className="w-4/5 bg-white/50 text-neutral-800 px-5 py-1 border border-neutral-800 rounded  outline-0 text-base"
                />
              </div>
            ))}

            <div
              className="w-32 md:w-44 text-center flex justify-center items-center bg-transparent mt-5 text-neutral-800 py-2.5 px-7 border border-neutral-800 rounded text-base cursor-pointer
              hover:bg-neutral-800 hover:text-white hover:duration-200 active:scale-95 "
              onClick={onClick}
            >
              Save changes
            </div>
          </div>
          <div className="w-full md:w-1/2 h-full pr-8 md:overflow-y-scroll md:scrollbar md:scrollbar-thumb-neutral-800 md:scrollbar-track-neutral-100">
            {/* Choose what to display, my adds or favorite adds */}
            <div className="bg-black/70 w-90 mb-4 flex flex-col md:flex-row justify-between items-center">
              <h1
                /* dsadasfasfas */
                className={
                  addsToShow === "myAdds"
                    ? "w-full md:w-1/2 h-full bg-neutral-800 p-2 text-white text-xl text-center uppercase cursor-pointer"
                    : "w-full md:w-1/2 h-full bg-white p-2 text-neutral-800 text-xl text-center uppercase cursor-pointer"
                }
                id="myAdds"
                onClick={handleClick}
              >
                My Adds
              </h1>
              <h1
                className={
                  addsToShow !== "myAdds"
                    ? "w-full md:w-1/2 h-full bg-neutral-800 p-2 text-white text-xl text-center uppercase cursor-pointer"
                    : "w-full md:w-1/2 h-full bg-white p-2 text-neutral-800 text-xl text-center uppercase cursor-pointer"
                }
                id="favAdds"
                onClick={handleClick}
              >
                Favorite
              </h1>
            </div>

            {addsToShow === "myAdds" ? (
              activeUserInfo.adds ? (
                <div className="w-full flex justify-center items-center flex-wrap">
                  {activeUserInfo.adds.map((add, index) => (
                    <SmallestDetailAdd
                      key={index}
                      info={add}
                      openedInProfile={true}
                    />
                  ))}
                </div>
              ) : (
                <div>No adds to show.</div>
              )
            ) : activeUserInfo.favorites.length !== 0 ? (
              <div className="flex flex-col justify-center items-center">
                {allAdds.map((add, index) => {
                  return (
                    activeUserInfo.favorites.includes(add.addID) && (
                      <SmallestDetailAdd
                        key={index}
                        info={add}
                        style={{ margiRight: "15px" }}
                      />
                    )
                  );
                })}
              </div>
            ) : (
              <div>No adds to show.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
