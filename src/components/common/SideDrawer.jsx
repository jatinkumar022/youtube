import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { FiMenu } from "react-icons/fi";
import { darkLogo, logo } from "../../assets";
import { AiOutlineHome, AiOutlineLike } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { TfiTwitter } from "react-icons/tfi";
import {
  MdFormatListBulleted,
  MdHistory,
  MdOutlineSubscriptions,
  MdOutlineWatchLater,
} from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { PiPlaylistDuotone } from "react-icons/pi";
import { HiOutlineVideoCamera } from "react-icons/hi";
import channel from "../../assets/thumbnails/channel.jpg";
import { useLocation } from "react-router";

const SideDrawer = ({ open, setOpen, Subscriptions }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(false);
  }, [location]);
  return (
    <>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        key="left"
        width={250}
        className="dark:bg-black dark:text-white w-full"
        bodyStyle={{ padding: 0, overflow: "auto" }}
      >
        <div className="p-2 bg-white dark:bg-black">
          <div className="flex sm:px-3   justify-between items-center">
            <div className=" flex gap-3 items-center  ">
              <div className="p-2 hover:bg-[#f2f2f2] hover:dark:bg-[#202121]  sm:block rounded-full cursor-pointer">
                <FiMenu
                  className=" opacity-60  "
                  size={23}
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="cursor-pointer ml-3 sm:ml-0">
                <img src={darkLogo} className=" hidden dark:block h-8 " />
                <img src={logo} className="dark:hidden h-8" />
              </div>
            </div>
          </div>

          <div className=" w-full mt-3    ">
            <div className="flex  w-full  flex-col pl-1 mt-3 font-light ">
              <Link
                to={"/"}
                className="flex p-2 px-3 items-center hover:bg-[#f2f2f2] cursor-pointer hover:text-black text-black dark:text-white hover:dark:bg-[#202121] rounded-lg gap-6 "
              >
                <AiOutlineHome size={23} />
                <h2 className="text-sm font-normal">Home</h2>
              </Link>

              <Link
                to={"/tweet"}
                className="flex p-2 px-3 items-center hover:bg-[#f2f2f2] cursor-pointer text-black hover:text-black dark:text-white hover:dark:bg-[#202121] rounded-lg gap-6"
              >
                <TfiTwitter size={23} />
                <h2 className="text-sm font-normal">Tweets</h2>
              </Link>

              <button
                onClick={() => navigate("/subscription?type=videos")}
                className="flex p-2 px-3 items-center hover:bg-[#f2f2f2] cursor-pointer text-black dark:text-white hover:text-black hover:dark:bg-[#202121] rounded-lg gap-6"
              >
                <MdOutlineSubscriptions size={23} />
                <h2 className="text-sm font-normal">Subscriptions</h2>
              </button>
            </div>
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="flex  w-full  flex-col pl-1 mt-1 font-light ">
              <Link
                to={"/library"}
                className="flex p-2 px-3 items-center hover:bg-[#f2f2f2] cursor-pointer hover:text-black text-black dark:text-white hover:dark:bg-[#202121] rounded-lg gap-2"
              >
                <h1 className="text-lg font-medium ">You</h1> <FaChevronRight />
              </Link>
              <Link
                to={"/history"}
                className="flex p-2 px-3 items-center hover:bg-[#f2f2f2] cursor-pointer hover:text-black text-black dark:text-white hover:dark:bg-[#202121] rounded-lg gap-6 "
              >
                <MdHistory size={23} />
                <h2 className="text-sm font-normal">History</h2>
              </Link>
              <Link
                to={"/playlists"}
                className="flex p-2 px-3 items-center hover:bg-[#f2f2f2] cursor-pointer hover:text-black text-black dark:text-white hover:dark:bg-[#202121] rounded-lg gap-6 "
              >
                <PiPlaylistDuotone size={23} />
                <h2 className="text-sm font-normal">Playlists</h2>
              </Link>
              <Link
                to={"/your-content?type=videos"}
                className="flex p-2 px-3 items-center hover:bg-[#f2f2f2] cursor-pointer hover:text-black text-black dark:text-white hover:dark:bg-[#202121] rounded-lg gap-6 "
              >
                <HiOutlineVideoCamera size={23} />
                <h2 className="text-sm font-normal">Your videos</h2>
              </Link>
              <Link
                to={"/your-content?type=tweets"}
                className="flex p-2 px-3 items-center hover:bg-[#f2f2f2] cursor-pointer hover:text-black text-black dark:text-white hover:dark:bg-[#202121] rounded-lg gap-6 "
              >
                <TfiTwitter size={23} />
                <h2 className="text-sm font-normal">Your tweets</h2>
              </Link>
              <Link
                to={"/watchlater"}
                className="flex p-2 px-3 items-center hover:bg-[#f2f2f2] cursor-pointer hover:text-black text-black dark:text-white hover:dark:bg-[#202121] rounded-lg gap-6 "
              >
                <MdOutlineWatchLater size={23} />
                <h2 className="text-sm font-normal">Watch later</h2>
              </Link>
              <Link
                to={"/liked-videos"}
                className="flex p-2 px-3 items-center hover:bg-[#f2f2f2] cursor-pointer hover:text-black text-black dark:text-white hover:dark:bg-[#202121] rounded-lg gap-6 "
              >
                <AiOutlineLike size={23} />
                <h2 className="text-sm font-normal">Liked videos</h2>
              </Link>
            </div>
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="flex  w-full  flex-col pl-1 mt-1 font-light ">
              {Subscriptions?.length > 0 ? (
                Subscriptions?.map((item) => (
                  <Link
                    to={"/"}
                    className="flex p-2 px-3 items-center hover:bg-[#f2f2f2] cursor-pointer hover:text-black text-black dark:text-white hover:dark:bg-[#202121] rounded-lg gap-6 "
                  >
                    <img src={item?.avatar} className="w-7 rounded-full" />
                    <h2 className="text-sm font-normal">{item?.fullName}</h2>
                  </Link>
                ))
              ) : (
                <></>
              )}

              <button
                onClick={() => navigate("/subscription?type=channels")}
                className="flex ml-[4px] p-2 px-3 items-center hover:bg-[#f2f2f2] cursor-pointer text-black hover:text-black dark:text-white hover:dark:bg-[#202121] rounded-lg gap-6"
              >
                <MdFormatListBulleted size={23} />
                <h2 className="text-sm font-normal">All subscriptions</h2>
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default SideDrawer;
