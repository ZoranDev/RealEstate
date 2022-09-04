// Main stuff
import { useState } from "react";

// Icons
import { FaRegEye, FaTrash } from "react-icons/fa";

const UploadedImage = ({ url, deleteImage, showImage }) => {
  // State for hover over image in images container div
  const [showHover, setShowHover] = useState(false);

  //handleOnMouseMove
  const handleOnMouseMove = () => {
    setShowHover(true);
  };

  //handleOnMouseMOut
  const handleOnMouseOut = () => {
    setShowHover(false);
  };

  return (
    <div
      className="w-28 h-20 m-1.5 p-2.5 border border-neutral-800 rounded-lg overflow-hidden relative flex justify-center items-center"
      onMouseMove={handleOnMouseMove}
      onMouseOut={handleOnMouseOut}
    >
      {showHover && (
        <div className="w-full h-full bg-black/70 absolute top-0 left-0 text-white  flex justify-center items-center flex-col">
          <div
            className="text-xl mb-5 cursor-pointer hover:text-yellow-200 flex items-center justify-center"
            onClick={() => showImage(url)}
          >
            <FaRegEye className="text-base mr-2" />
            Preview
          </div>
          <div
            className="text-xl cursor-pointer hover:text-red-500 flex items-center justify-center"
            onClick={(e) => deleteImage(e, url)}
          >
            <FaTrash className="text-base mr-2" />
            Delete
          </div>
        </div>
      )}
      <img src={url} className="w-full h-full" alt="Property" />
    </div>
  );
};

export default UploadedImage;
