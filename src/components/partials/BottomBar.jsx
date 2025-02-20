import React, { useState } from "react";
import { add, d_add } from "../../assets";
import DrawerComponent from "../common/Drawer";
import { GoUpload } from "react-icons/go";
import { GoBroadcast } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import { GoHomeFill } from "react-icons/go";
import { GoHome } from "react-icons/go";
import { TfiTwitter } from "react-icons/tfi";
import { TfiTwitterAlt } from "react-icons/tfi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdSubscriptions } from "react-icons/md";
import { PiVideoLight } from "react-icons/pi";
import { PiVideoFill } from "react-icons/pi";

const BottomBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full fixed bottom-0 p-1  items-center  z-40 bg-white dark:bg-black sm:hidden">
      <div className="flex justify-between px-7  items-center font-light">
        <NavLink to={"/"} className="flex flex-col items-center max-w-3 ">
          {/* <img src={home} className="min-w-7 dark:hidden" />
          <img src={d_home} className="min-w-7 hidden dark:block" /> */}
          {({ isActive }) => (
            <>
              {isActive ? <GoHomeFill size={25} /> : <GoHome size={25} />}
              <p className="text-xs">Home</p>
            </>
          )}
        </NavLink>
        <NavLink to={"/tweet"} className="flex flex-col items-center max-w-3 ">
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
        <div className="flex flex-col items-center max-w-3 ">
          <img
            src={add}
            className="min-w-10 dark:hidden"
            onClick={() => setOpen(true)}
          />
          <img
            src={d_add}
            className="min-w-10 hidden dark:block"
            onClick={() => setOpen(true)}
          />
          <DrawerComponent
            open={open}
            setOpen={setOpen}
            placement={"bottom"}
            title={"Create"}
            className="bg-white dark:bg-black "
          >
            <div className="p-3 hover:bg-[#f2f2f2] cursor-pointer hover:dark:bg-[#2a2c2c]  flex items-center gap-3 rounded-lg ">
              <GoUpload
                size={45}
                className="p-3 dark:bg-[#373737] rounded-full bg-[#e1dede]"
              />
              Upload a Video
            </div>
            <div className="p-3 hover:bg-[#f2f2f2] cursor-pointer hover:dark:bg-[#2a2c2c]  flex items-center gap-3 rounded-lg">
              <GoBroadcast
                size={45}
                className="p-3 dark:bg-[#373737] bg-[#e1dede] rounded-full"
              />
              Go live
            </div>
            <div className="p-3 hover:bg-[#f2f2f2] cursor-pointer hover:dark:bg-[#2a2c2c]  flex items-center gap-3 rounded-lg">
              <IoCreateOutline
                size={45}
                className="p-3 dark:bg-[#373737] bg-[#e1dede] rounded-full"
              />
              Upload a Tweet
            </div>
          </DrawerComponent>
        </div>
        <NavLink
          to={"/subscription"}
          className="flex flex-col items-center max-w-3 "
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
          className="flex flex-col items-center max-w-3 "
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <PiVideoFill size={25} />
              ) : (
                <PiVideoLight size={25} />
              )}
              <p className="text-xs">Library</p>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default BottomBar;
