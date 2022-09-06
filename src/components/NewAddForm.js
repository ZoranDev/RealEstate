// Main stuff
import { useState, useEffect, useContext } from "react";
import RealEstateContext from "../context/RealEstateContext";
import { useNavigate } from "react-router-dom";

// Import components
import UploadedImage from "./UploadedImage";
import Error from "./Error";

const cities = [
  "Podgorica",
  "Niksic",
  "Berane",
  "Andrijevica",
  "Budva",
  "Cetinje",
  "Herceg-Novi",
  "Bar",
  "Bijelo-Polje",
  "Danilovgrad",
  "Kolasin",
  "Kotor",
  "Mojkovac",
  "Plav",
  "Pljevlja",
  "Pluzine",
  "Savnik",
  "Rozaje",
];

const NewAddForm = () => {
  // Context stuff
  const { appendNewAddToActiveUser, closeNewAddForm } =
    useContext(RealEstateContext);

  // State for files
  const [filesUrls, setFilesUrls] = useState(null);

  // State for show Error
  const [showError, setShowError] = useState(false);

  // State for full add description
  const [newAdd, setNewAdd] = useState({
    addType: "",
    propertyType: "",
    description: "",
    country: "",
    city: "",
    price: null,
    square: null,
    images: null,
    additionalInfo: {
      address: "",
      numOfRooms: null,
      numOfBathrooms: null,
      numOfTerraces: null,
      parking: "",
      airCondition: "",
      floor: null,
    },
  });

  // Show preview image
  const [showFullImage, setShowFullImage] = useState({
    active: false,
    url: null,
  });

  // ShowImage
  const showImage = (url) => {
    setShowFullImage({
      active: !showFullImage.active,
      url: url,
    });
  };

  const navigate = useNavigate();

  //handleUpload
  const handleUpload = (e) => {
    let files = e.target.files;
    // Check to see how much pictures are uploading
    if (files.length > 6) {
      setShowError({
        active: true,
        message: "Max 6 images.",
      });
    } else {
      setShowError(false);
      let urls = [];

      for (let i = 0; i < files.length; i++) {
        urls.push(URL.createObjectURL(files[i]));
      }

      setFilesUrls(urls);
    }
  };

  // deleteImage - ODJE TREBA OSTATI OVO e ZA SAD
  const deleteImage = (e, urlToDelete) => {
    setFilesUrls(
      filesUrls.filter((url) => {
        return url !== urlToDelete;
      })
    );
  };

  //fillState
  useEffect(() => {
    setNewAdd({ ...newAdd, images: filesUrls });
  }, [filesUrls]);

  const fillState = (e) => {
    setNewAdd({ ...newAdd, [e.target.name]: e.target.value });
    if (
      e.target.id === "address" ||
      e.target.id === "numOfRooms" ||
      e.target.id === "numOfBathrooms" ||
      e.target.id === "numOfTerraces" ||
      e.target.id === "parking" ||
      e.target.id === "airCondition"
    ) {
      setNewAdd({
        ...newAdd,
        additionalInfo: {
          ...newAdd.additionalInfo,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  //handleAddSubmit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!filesUrls) {
      setShowError({
        active: true,
        message: "Insert some images.",
      });
    } else {
      appendNewAddToActiveUser(newAdd);
      setNewAdd({
        // OVO NE RADI  - IPAK RADI DOVOLJNO DOBRO
        addType: "",
        propertyType: "",
        description: "",
        country: "",
        city: "",
        price: null,
        square: null,
        images: null,
        additionalInfo: {
          address: "",
          numOfRooms: null,
          numOfBathrooms: null,
          numOfTerraces: null,
          parking: "",
          airCondition: "",
          floor: null,
        },
      });
      // Redirect to offers page
      navigate("/offers");
    }
  };

  return (
    <form
      className="w-11/12 h-5/6 bg-white text-neutral-800 px-2.5 py-5 rounded-lg relative"
      onSubmit={(e) => handleAddSubmit(e)}
    >
      <h1 className="w-full mb-10 h-8 text-3xl sm:mb-5">
        Advertise the property
      </h1>
      <h1
        className="flex justify-center items-center absolute top-2.5 right-2.5 w-8 h-8 bg-transparent text-neutral-800 border-2 border-neutral-800 rounded-full cursor-pointer active:scale-90 hover:text-red-400 hover:border-red-400"
        onClick={(e) => closeNewAddForm(e)}
      >
        X
      </h1>
      {/* Details left */}
      <div className="flex flex-col lg:flex-row lg:justify-between overflow-y-scroll scrollbar scrollbar-thumb-neutral-800 scrollbar-track-neutral-100  w-full h-90 relative lg:overflow-y-hidden">
        {/* Here go image to preview when user upload it */}
        {showFullImage.active && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 text-white z-20">
            <h1
              className="absolute top-1 right-1 w-8 h-8 text-white border-2 border-white rounded-full cursor-pointer flex justify-center items-center hover:text-red-500 hover:border-red-500 active:scale-90"
              onClick={() => showImage()}
            >
              X
            </h1>
            <div className="absolute left-2/4 top-2/4 w-70 h-4/5 -translate-x-2/4 -translate-y-2/4">
              <img
                src={showFullImage.url}
                alt="Displayed"
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* All details about add */}
        <div className=" w-full lg:w-1/2 lg:h-full m-auto  flex flex-col  lg:overflow-y-scroll lg:scrollbar lg:scrollbar-thumb-neutral-800 lg:scrollbar-track-neutral-100">
          {/* Add type */}
          <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
            <div className="flex justify-start w-full mb-1.5 text-base">
              <p className="text-red-500 mr-1.5">*</p>
              <label htmlFor="addType">Type of ADD</label>
            </div>
            <div className="flex justify-between w-full text-neutral-800">
              <select
                name="addType"
                id="addType"
                className="w-87 h-8 bg-transparent rounded outline-0 cursor-pointer border border-neutral-500"
                required={true}
                onChange={fillState}
              >
                <option></option>
                <option value="Sell">Sell</option>
                <option value="Rent">Rent</option>
              </select>
              <div className="flex justify-center items-center w-10% h-8 bg-neutral-700 text-white text-xl p-2.5 rounded cursoir-pointer">
                ?
              </div>
            </div>
          </div>
          {/* Property type */}
          <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
            <div className="flex justify-start w-full mb-1.5 text-base">
              <p className="text-red-500 mr-1.5">*</p>
              <label htmlFor="propertyType">Property Type</label>
            </div>
            <div className="flex justify-between w-full text-neutral-800">
              <select
                name="propertyType"
                id="propertyType"
                className="w-87 h-8 bg-transparent rounded outline-0 cursor-pointer border border-neutral-500"
                required={true}
                onChange={fillState}
              >
                <option></option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Land">Land</option>
                <option value="BusinessSpace">Business Space</option>
              </select>
              <div className="flex justify-center items-center w-10% h-8 bg-neutral-700 text-white text-xl p-2.5 rounded cursoir-pointer">
                ?
              </div>
            </div>
          </div>
          {/* Property description */}
          <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
            <div className="flex justify-start w-full mb-1.5 text-base">
              <p className="text-red-500 mr-1.5">*</p>
              <label htmlFor="propertyDescription">Property Description</label>
            </div>
            <div className="flex justify-between w-full text-neutral-800">
              <textarea
                onChange={fillState}
                name="propertyDescription"
                id="propertyDescription"
                className="w-full h-24 text-neutral-800 rounded p-2.5 outline-0 resize-none border border-neutral-500"
                required={true}
              ></textarea>
            </div>
          </div>
          {/* Country */}
          <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
            <div className="flex justify-start w-full mb-1.5 text-base">
              <p className="text-red-500 mr-1.5">*</p>
              <label htmlFor="country">Country</label>
            </div>
            <div className="flex justify-between w-full text-neutral-800">
              <select
                name="country"
                id="country"
                className="w-87 h-8 bg-transparent rounded outline-0 cursor-pointer border border-neutral-500"
                required={true}
                onChange={fillState}
              >
                <option></option>
                <option value="Montenegro">Montenegro</option>
              </select>
              <div className="flex justify-center items-center w-10% h-8 bg-neutral-700 text-white text-xl p-2.5 rounded cursoir-pointer">
                ?
              </div>
            </div>
          </div>
          {/* City */}
          <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
            <div className="flex justify-start w-full mb-1.5 text-base">
              <p className="text-red-500 mr-1.5">*</p>
              <label htmlFor="city">City</label>
            </div>
            <div className="flex justify-between w-full text-neutral-800">
              <select
                name="city"
                id="city"
                className="w-87 h-8 bg-transparent rounded outline-0 cursor-pointer border border-neutral-500"
                required={true}
                onChange={fillState}
              >
                <option></option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <div className="flex justify-center items-center w-10% h-8 bg-neutral-700 text-white text-xl p-2.5 rounded cursoir-pointer">
                ?
              </div>
            </div>
          </div>
          {/* Price */}
          <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
            <div className="flex justify-start w-full mb-1.5 text-base">
              <p className="text-red-500 mr-1.5">*</p>
              <label htmlFor="price">Price</label>
            </div>
            <div className="flex justify-between w-full text-neutral-800">
              <input
                onChange={fillState}
                type="number"
                className="w-87 h-8 bg-transparent border border-neutral-500 pl-2.5 rounded outline-0 cursor-pointer"
                id="formPrice"
                name="price"
                placeholder="Enter price in €"
                required={true}
              />
              <div className="flex justify-center items-center w-10% h-8 bg-neutral-700 text-white text-xl p-2.5 rounded cursoir-pointer">
                €
              </div>
            </div>
          </div>
          {/* Square */}
          <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
            <div className="flex justify-start w-full mb-1.5 text-base">
              <p className="text-red-500 mr-1.5">*</p>
              <label htmlFor="square">Square</label>
            </div>
            <div className="flex justify-between w-full text-neutral-800">
              <input
                onChange={fillState}
                type="number"
                id="square"
                name="square"
                className="w-87 h-8 bg-transparent border border-neutral-500 pl-2.5 rounded outline-0 cursor-pointer"
                placeholder="Enter square"
                required={true}
              />
              <div className="flex justify-center items-center w-10% h-8 bg-neutral-700 text-white text-xl p-2.5 rounded cursoir-pointer">
                m²
              </div>
            </div>
          </div>
          {/* Additional info */}
          <p className="w-full text-center mb-3">Additional info</p>
          <div className="w-full flex flex-col lg:flex-row lg:justify-between items-baseline justify-center ">
            <div className="flex flex-col justify-end w-full lg:w-47 ">
              {/* Address */}
              <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
                <div className="flex justify-start w-full mb-1.5 text-base">
                  <label htmlFor="address">Address</label>
                </div>
                <div className="flex justify-between w-full text-neutral-800">
                  <input
                    onChange={fillState}
                    type="text"
                    id="address"
                    name="address"
                    className="w-full h-8 bg-transparent text-neutral-800 border border-neutral-500 rounded pl-2.5 outline-none cursor-text"
                    placeholder="Enter address"
                  />
                </div>
              </div>
              {/* Number of terraces */}
              <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
                <div className="flex justify-start w-full mb-1.5 text-base">
                  <label htmlFor="numOfTerraces">Number of terraces</label>
                </div>
                <div className="flex justify-between w-full text-neutral-800">
                  <input
                    onChange={fillState}
                    type="number"
                    id="numOfTerraces"
                    name="numOfTerraces"
                    className="w-full h-8 bg-transparent text-neutral-800 border border-neutral-500 rounded pl-2.5 outline-none cursor-text"
                    placeholder="Number of terraces"
                  />
                </div>
              </div>
              {/* Parking */}
              <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
                <div className="flex justify-start w-full mb-1.5 text-base">
                  <label htmlFor="parking">Parking</label>
                </div>
                <div className="flex justify-between w-full text-neutral-800">
                  <select
                    name="parking"
                    id="parking"
                    className="w-full h-8 bg-transparent rounded outline-0 cursor-pointer border border-neutral-500"
                    onChange={fillState}
                  >
                    <option></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              {/* Floor */}
              <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
                <div className="flex justify-start w-full mb-1.5 text-base">
                  <label htmlFor="floor">Floor</label>
                </div>
                <div className="flex justify-between w-full text-neutral-800">
                  <input
                    onChange={fillState}
                    type="number"
                    id="floor"
                    name="floor"
                    className="w-full h-8 bg-transparent text-neutral-800 border border-neutral-500 rounded pl-2.5 outline-none cursor-pointer"
                    placeholder="Floor"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end w-full lg:w-47">
              {/* Number of rooms */}
              <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
                <div className="flex justify-start w-full mb-1.5 text-base">
                  <label htmlFor="numOfRooms">Number of rooms</label>
                </div>
                <div className="flex justify-between w-full text-neutral-800">
                  <input
                    onChange={fillState}
                    type="number"
                    id="numOfRooms"
                    name="numOfRooms"
                    className="w-full h-8 bg-transparent text-neutral-800 border border-neutral-500 rounded pl-2.5 outline-none cursor-pointer"
                    placeholder="Number of rooms"
                  />
                </div>
              </div>
              {/* Number of bathrooms */}
              <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
                <div className="flex justify-start w-full mb-1.5 text-base">
                  <label htmlFor="numOfBathrooms">Number of bathrooms</label>
                </div>
                <div className="flex justify-between w-full text-neutral-800">
                  <input
                    onChange={fillState}
                    type="number"
                    id="numOfBathrooms"
                    name="numOfBathrooms"
                    className="w-full h-8 bg-transparent text-neutral-800 border border-neutral-500 rounded pl-2.5 outline-none cursor-pointer"
                    placeholder="Number of bathrooms"
                  />
                </div>
              </div>
              {/* Air Condition */}
              <div className="w-90 bg-transparent text-neutral-800 mb-2.5 px-1.5 py-2.5">
                <div className="flex justify-start w-full mb-1.5 text-base">
                  <label htmlFor="aircondition">Air Condition</label>
                </div>
                <div className="flex justify-between w-full text-neutral-800">
                  <select
                    name="aircondition"
                    id="airCondition"
                    className="w-full h-8 bg-transparent rounded outline-0 cursor-pointer border border-neutral-500"
                    onChange={fillState}
                  >
                    <option></option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details right */}

        <div className="flex flex-col justify-start w-full lg:w-49 lg:h-full  pl-2 lg:border-l-2 border-dashed border-neutral-800 ">
          <div className="w-90 bg-transparent text-neutral-800 border border-neutral-800 rounded p-2.5 mb-10 flex flex-col justify-start items-baseline">
            <p className="w-full mb-5 text-red-500">
              Note that max number of images is 6.
            </p>
            <label
              htmlFor="images"
              className="w-full h-10 bg-neutral-300 text-neutral-800 border border-dashed border-neutral-800 text-center text-xl mb-3 cursor-pointer opacity-70 flex justify-center items-center hover:opacity-100"
            >
              + Images
              <input
                onChange={(e) => handleUpload(e)}
                type="file"
                name="images"
                id="images"
                multiple={true}
                accept="image/jpeg, image/png, image/jpg"
                className="hidden"
              />
            </label>

            <div className="w-full flex flex-wrap overflow-hidden">
              {filesUrls &&
                filesUrls.map((url, index) => (
                  <UploadedImage
                    url={url}
                    key={index}
                    deleteImage={deleteImage}
                    showImage={showImage}
                  />
                ))}
            </div>

            {/* If error */}
            {showError.active && <Error message={showError.message} />}
          </div>
          <button
            type="submit"
            className="w-90 flex justify-center items-center bg-transparent  text-neutral-800 py-2.5 px-7 mt-1 mb-5 border border-neutral-800 rounded text-base cursor-pointer
          hover:bg-neutral-800 hover:text-white hover:duration-200 active:scale-95"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewAddForm;
