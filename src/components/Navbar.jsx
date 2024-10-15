import React from "react";
import { CiMenuBurger } from "react-icons/ci";

const Navbar = () => {
  return (
    <div>
      <div className="w-full h-16  bg-pink-300 flex justify-between items-center pr-2 pl-2 rounded-b-lg">
        <CiMenuBurger className="text-4xl" color="red" />
        <h2 className="text-2xl font-semibold">My Hospital</h2>
        <button className="w-3/12  border border-black h-11 text-lg rounded-xl font-medium text-red-500 hover:scale-110 duration-200 hover:bg-pink-500 hover:text-white">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
