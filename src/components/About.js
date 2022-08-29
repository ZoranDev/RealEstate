// Main stuff
import { useState, useContext } from "react";
import RealEstateContext from "../context/RealEstateContext";

// Icons
import {
  FaMoneyBillAlt,
  FaRegBuilding,
  FaRegChartBar,
  FaRegCommentAlt,
  FaRegEye,
  FaPeopleArrows,
  FaStar,
} from "react-icons/fa";

// Import components
import NewAddForm from "./NewAddForm";
import LogInForm from "./LogInForm";

const About = () => {
  // Context stuff
  const { submitRating, successDiv, showNewAddForm, showLogInForm } =
    useContext(RealEstateContext);

  // State for hover stars
  const [hoverStars, setHoverStars] = useState([
    { name: 1, class: "w-6 h-6 mr-2 cursor-pointer" },
    { name: 2, class: "w-6 h-6 mr-2 cursor-pointer" },
    { name: 3, class: "w-6 h-6 mr-2 cursor-pointer" },
    { name: 4, class: "w-6 h-6 mr-2 cursor-pointer" },
    { name: 5, class: "w-6 h-6 mr-2 cursor-pointer" },
  ]);

  // Paragraphs - about
  const paragraphs = [
    {
      icon: <FaMoneyBillAlt className="h-10 w-10 text-neutral-800 mb-3.5" />,
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum animi commodi nobis eos obcaecati nihil qui numquam maiores atque deleniti!",
    },
    {
      icon: <FaRegBuilding className="h-10 w-10 text-neutral-800 mb-3.5" />,
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, dolores. Tenetur, molestias labore exercitationem doloremque molestiae obcaecati velit deserunt accusamus nesciunt reiciendis illo harum vero?",
    },
    {
      icon: <FaRegChartBar className="h-10 w-10 text-neutral-800 mb-3.5" />,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    },
    {
      icon: <FaRegCommentAlt className="h-10 w-10 text-neutral-800 mb-3.5" />,
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum animi commodi nobis eos obcaecati nihil qui numquam maiores atque deleniti!",
    },
    {
      icon: <FaRegEye className="h-10 w-10 text-neutral-800 mb-3.5" />,
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur dicta ea modi fugiat!",
    },
    {
      icon: <FaPeopleArrows className="h-10 w-10 text-neutral-800 mb-3.5" />,
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, nisi!",
    },
  ];

  // rateUsFunction
  const rateUsFunction = (e) => {
    setHoverStars(
      hoverStars.map((item) => {
        if (item.name <= e.target.id) {
          item.class = "w-6 h-6 mr-2 cursor-pointer text-green-400";
        } else {
          item.class = "w-6 h-6 mr-2 cursor-pointer";
        }
        return item;
      })
    );
  };

  //turnToDefault - when user move mouse out of star make it color default
  const turnToDefault = () => {
    setHoverStars(
      hoverStars.map((item) => {
        item.class = "w-6 h-6 mr-2 cursor-pointer";
        return item;
      })
    );
  };

  return (
    <>
      {/* Show logIn form */}
      {showLogInForm && (
        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black/70 z-20">
          <LogInForm />
        </div>
      )}

      {/* Show error or success */}
      {successDiv.active && (
        <div className={successDiv.class}>{successDiv.message}</div>
      )}

      {/* Show newAdd form */}
      {showNewAddForm && (
        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black/70 z-20">
          <NewAddForm />
        </div>
      )}

      <div className="w-5/6 h-5/6 my-8 mx-auto px-5 py-2.5 flex flex-col justify-start overflow-hidden bg-white/90 text-neutral-800 ">
        {/* Headline */}
        <div className="w-full mb-5 text-center">
          <p className="text-base">Why choose us?</p>
          <h1 className="text-2xl">Because we go further than others!</h1>
        </div>

        {/* Stuff about us */}
        <div className="w-full flex items-start justify-center flex-wrap overflow-y-scroll scrollbar scrollbar-thumb-neutral-800 scrollbar-track-neutral-100">
          {paragraphs.map((paragraph, index) => {
            return (
              <div
                key={index}
                className="max-w-xs flex flex-col justify-start items-center w-4/5 bg-white p-3.5 mb-3.5 border-b-2 border-neutral-800 shadow shadow-neutral-800 rounded-lg overflow-hidden sm:mr-4  sm:h-52"
              >
                {paragraph.icon}
                {paragraph.text}
              </div>
            );
          })}
        </div>

        {/* Rate us section */}
        <div className="w-full mt-5 flex justify-center items-center">
          <h3 className="text-xl mr-7">Rate Us</h3>
          <div className="flex" onMouseLeave={() => turnToDefault()}>
            {hoverStars.map((star) => {
              return (
                <FaStar
                  key={star.name}
                  id={star.name}
                  className={star.class}
                  onMouseEnter={(e) => rateUsFunction(e)}
                  onClick={() => submitRating(star.name)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
