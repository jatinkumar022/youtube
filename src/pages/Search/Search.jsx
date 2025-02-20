import React from "react";
import { GoHistory } from "react-icons/go";
import VoiceToTextPopover from "../../components/common/VoiceToTextPopover";
import { IoIosSearch } from "react-icons/io";
import { useDarkMode } from "../../context/DarkModeContext";

const Search = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="p-3 overflow-x-hidden h-full">
      <div className=" relative  sm:hidden flex ">
        {/* Search Input */}
        <div className="absolute top-1/2 left-6 transform -translate-y-1/2 text-gray-400  ">
          <IoIosSearch />
        </div>

        <input
          type="text"
          placeholder="Search"
          className="w-full px-5 py-[8px] pl-10 text-sm rounded-l-full dark:text-white text-black bg-white dark:bg-black  placeholder-gray-500 focus:outline-none focus:border-blue-300 dark:focus:border-blue-900  border-[1.5px] dark:border-[#222222]"
        />

        {/* Search Icon */}
        <button className="dark:bg-[#222222] bg-[#f2f2f2] px-4 rounded-r-full  text-gray-400 hover:text-black dark:hover:text-white focus:outline-none ">
          <IoIosSearch />
        </button>

        <div className="p-2 dark:bg-[#222222] hover:dark:bg-[#2b2c2c] bg-[#f2f2f2]  hover:bg-[#eae9e9] cursor-pointer ml-3 rounded-full">
          <VoiceToTextPopover />
        </div>
      </div>

      <div className="mt-3">
        <div className="  cursor-pointer  w-full items-center gap-3  ">
          <div className="flex justify-between items-center p-1 gap-3 ">
            <div className="flex gap-2 items-center w-56">
              <div>
                <GoHistory />
              </div>
              <p className="truncate">
                Lorem ipsum dolor sit amet consectetur a Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Cupiditate, delectus!
                dipisicing elit.sdsdasdasdasdadasdas
              </p>
            </div>
            <button className="text-blue-500 ml-3">remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
