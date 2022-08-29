import { BiError } from "react-icons/bi";

const Error = ({ message }) => {
  return (
    <div className="flex justify-center items-center w-full text-red-500 text-base rounded-md mx-auto my-2.5 py-2.5 px-1.5">
      <BiError className="w-10 h-10 mr-3" />
      {message}
    </div>
  );
};

export default Error;
