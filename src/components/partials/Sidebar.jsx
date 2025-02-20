import React from "react";
import { NavLink } from "react-router";
import { GoHomeFill } from "react-icons/go";
import { GoHome } from "react-icons/go";
import { TfiTwitter } from "react-icons/tfi";
import { TfiTwitterAlt } from "react-icons/tfi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdSubscriptions } from "react-icons/md";

import { FaRegCircleUser } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className=" w-18 sticky ml-[0.5px] left-0 bg-white dark:bg-black hidden sm:flex h-screen ">
      <div className="flex  gap-2 flex-col pl-1 mt-3 font-light">
        <NavLink
          to={"/"}
          // className="flex flex-col items-center py-4 hover:bg-[#f2f2f2] cursor-pointer hover:dark:bg-[#202121] rounded-lg "
          className={({ isActive }) =>
            isActive
              ? "bg-[#f2f2f2] dark:bg-[#202121] flex flex-col items-center py-4  cursor-pointer  rounded-lg"
              : "flex flex-col items-center py-4 hover:bg-[#f2f2f2] cursor-pointer hover:dark:bg-[#202121] rounded-lg"
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <GoHomeFill size={25} /> : <GoHome size={25} />}
              <p className="text-xs">Home</p>
            </>
          )}
        </NavLink>
        <NavLink
          to={"/tweet"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#f2f2f2] dark:bg-[#202121] flex flex-col items-center py-4  cursor-pointer  rounded-lg"
              : "flex flex-col items-center py-4 hover:bg-[#f2f2f2] cursor-pointer hover:dark:bg-[#202121] rounded-lg"
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <TfiTwitterAlt size={25} />
              ) : (
                <TfiTwitter size={25} />
              )}
              <p className="text-xs">Tweets</p>
            </>
          )}
        </NavLink>

        <NavLink
          to={"subscription"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#f2f2f2] dark:bg-[#202121] flex flex-col items-center py-4  cursor-pointer  rounded-lg"
              : "flex flex-col items-center py-4 hover:bg-[#f2f2f2] cursor-pointer hover:dark:bg-[#202121] rounded-lg"
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <MdSubscriptions size={25} />
              ) : (
                <MdOutlineSubscriptions size={25} />
              )}
              <p className="text-xs">Subscriptions</p>
            </>
          )}
        </NavLink>
        <NavLink
          to={"/library"}
          className={({ isActive }) =>
            isActive
              ? "bg-[#f2f2f2] dark:bg-[#202121] flex flex-col items-center py-4  cursor-pointer  rounded-lg"
              : "flex flex-col items-center py-4 hover:bg-[#f2f2f2] cursor-pointer hover:dark:bg-[#202121] rounded-lg"
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <FaUserCircle size={25} />
              ) : (
                <FaRegCircleUser size={25} />
              )}
              <p className="text-xs">You</p>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
