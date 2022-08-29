// Main stuff
import { useState } from "react";

// Icons
import {
  FaChevronCircleUp,
  FaChevronCircleDown,
  FaInstagram,
  FaFacebookSquare,
} from "react-icons/fa";

const Footer = () => {
  // Show footer state
  const [showFooter, setSHowFooter] = useState(false);

  return (
    <footer className="w-full bg-cyan-700 text-white absolute bottom-0 left-0 z-10">
      {!showFooter ? (
        <FaChevronCircleUp
          className="text-cyan-700 w-8 h-8 absolute -top-8 left-2/4 -translate-x-2/4 cursor-pointer hover:text-cyan-500"
          onClick={() => setSHowFooter(!showFooter)}
        />
      ) : (
        <FaChevronCircleDown
          className="text-cyan-700 w-8 h-8 absolute -top-8 left-2/4 -translate-x-2/4 cursor-pointer hover:text-cyan-500"
          onClick={() => setSHowFooter(!showFooter)}
        />
      )}

      {showFooter && (
        <div className="flex justify-center items-center w-full px-1.5 py-2.5 text-xs">
          <h1 className="mr-2">Follow us on social:</h1>
          <a
            href="https://www.instagram.com/"
            target={"_blank"}
            rel="noreferrer"
          >
            <FaInstagram className="w-5 h-5 text-white mr-2 cursor-pointer hover:scale-110" />
          </a>
          <a
            href="https://www.facebook.com/"
            target={"_blank"}
            rel="noreferrer"
          >
            <FaFacebookSquare className="w-5 h-5 text-white cursor-pointer hover:scale-110" />
          </a>
        </div>
      )}
    </footer>
  );
};

export default Footer;
