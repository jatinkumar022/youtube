import React, { useEffect, useState } from "react";
import DarkModeSwitch from "../Ui/ThemeSwitch";
import { darkLogo, logo } from "../../assets";
import { IoIosSearch, IoMdNotificationsOutline } from "react-icons/io";
import { LiaChromecast } from "react-icons/lia";
import { FiMenu } from "react-icons/fi";
import { GoBroadcast, GoHistory, GoPlus, GoUpload } from "react-icons/go";
import { Popover } from "antd";
import { IoCreateOutline } from "react-icons/io5";
import SideDrawer from "../common/SideDrawer";
import ProfileMenu from "../common/ProfileDropdown";
import VoiceToTextPopover from "../common/VoiceToTextPopover";
import { Link, useNavigate } from "react-router";

const Header = ({ isVideo, onUploadClick, Subscriptions }) => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("bottomLeft");
  const [popoverVisible, setPopoverVisible] = useState(false);
  const navigate = useNavigate();
  const handleVisibleChange = (visible) => {
    setPopoverVisible(visible);
  };

  const handleLinkClick = () => {
    setPopoverVisible(false); // Hide the Popover
  };
  // Detect screen size to change placement
  useEffect(() => {
    const updatePlacement = () => {
      if (window.innerWidth < 590) {
        setPlacement("bottom"); // Mobile view
      } else {
        setPlacement("bottomLeft"); // Larger screens
      }
    };
    // Run on mount and on resize
    updatePlacement();
    window.addEventListener("resize", updatePlacement);

    return () => {
      window.removeEventListener("resize", updatePlacement);
    };
  }, []);

  const content = (
    <div className="dark:bg-[#212121] dark:text-white p-1 rounded-md">
      <div
        className="p-3 hover:bg-[#f2f2f2] cursor-pointer hover:dark:bg-[#2a2c2c]  flex items-center gap-3 rounded-lg "
        onClick={() => {
          navigate("/your-channel");
          onUploadClick();
          handleLinkClick();
        }}
      >
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
      <div
        className="p-3 hover:bg-[#f2f2f2] cursor-pointer hover:dark:bg-[#2a2c2c]  flex items-center gap-3 rounded-lg"
        onClick={() => {
          handleLinkClick();
          navigate("/your-content?type=tweets");
        }}
      >
        <IoCreateOutline
          size={45}
          className="p-3 dark:bg-[#373737] bg-[#e1dede] rounded-full"
        />
        Upload a Tweet
      </div>
    </div>
  );

  const notificationContent = (
    <>
      <div className="dark:bg-[#212121] dark:text-white p-1 rounded-md ">
        <div className="p-3 hover:bg-[#f2f2f2] cursor-pointer w-full hover:dark:bg-[#2a2c2c]  flex items-center gap-3 rounded-lg ">
          <div className="flex justify-between gap-20 items-center">
            <div className="flex gap-3">
              <div>
                <img className="w-12 rounded-full" />
              </div>
              <div>
                <p className="text-base font-normal"> For you: Channel Name</p>
                <p className="text-sm font-normal text-[#aaa]">
                  For you: Channel Name
                </p>
              </div>
            </div>
            <div>
              <img className="w-24 rounded-md " />
            </div>
          </div>
        </div>

        <div className="p-3 hover:bg-[#f2f2f2] cursor-pointer w-full hover:dark:bg-[#2a2c2c]  flex items-center gap-3 rounded-lg ">
          <div className="flex justify-between gap-20 items-center">
            <div className="flex gap-3">
              <div>
                <img className="w-12 rounded-full" />
              </div>
              <div>
                <p className="text-base font-normal"> For you: Channel Name</p>
                <p className="text-sm font-normal text-[#aaa]">
                  For you: Channel Name
                </p>
              </div>
            </div>
            <div>
              <img className="w-24 rounded-md " />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const searchContent = (
    <>
      <div className="dark:bg-[#212121] dark:text-white p-1  rounded-md ">
        <div className=" hover:bg-[#f2f2f2] cursor-pointer hover:dark:bg-[#2a2c2c]  items-center gap-3  ">
          <div className="flex justify-between items-center p-1 gap-3 ">
            <div className="flex gap-2 items-center w-96">
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
    </>
  );
  return (
    <div
      className={`w-full z-20 fixed  sm:px-5  ${
        isVideo ? `dark:bg-[#0f0f0f] bg-white ` : " dark:bg-black bg-white "
      } `}
    >
      <div className="flex justify-between items-center">
        <div className=" flex gap-2 items-center  ">
          <div
            className={`p-2 hover:bg-[#f2f2f2] hover:dark:bg-[#202121] ${
              isVideo ? "block ml-2" : "hidden"
            } sm:block rounded-full cursor-pointer`}
          >
            <FiMenu
              className=" opacity-60  "
              size={23}
              onClick={() => setOpen(true)}
            />
            <SideDrawer
              open={open}
              setOpen={setOpen}
              Subscriptions={Subscriptions}
            />
          </div>
          <Link to={"/"} className="cursor-pointer ml-3 sm:ml-0">
            <img src={darkLogo} className=" hidden dark:block h-8 " />
            <img src={logo} className="dark:hidden h-8" />
          </Link>
        </div>

        <div className="relative w-[40%]  max-w-2xl hidden sm:flex">
          {/* Search Input */}
          <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400  ">
            <IoIosSearch />
          </div>
          <Popover content={searchContent} trigger="focus">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-5 py-[8px] pl-10 text-sm rounded-l-full dark:text-white text-black bg-white dark:bg-black  placeholder-gray-500 focus:outline-none focus:border-blue-300 dark:focus:border-blue-900  border-[1.5px] dark:border-[#222222]"
            />
          </Popover>
          {/* Search Icon */}
          <button className="dark:bg-[#222222] bg-[#f2f2f2] px-4 rounded-r-full  text-gray-400 hover:text-black dark:hover:text-white focus:outline-none ">
            <IoIosSearch />
          </button>

          <div className="p-2 dark:bg-[#222222] hover:dark:bg-[#2b2c2c] bg-[#f2f2f2]  hover:bg-[#eae9e9] cursor-pointer ml-3 rounded-full">
            <VoiceToTextPopover />
          </div>
        </div>
        <div className="flex mr-2 gap-2  items-center ">
          <div className="hidden">
            <DarkModeSwitch />
          </div>
          <Popover
            content={content}
            className="dark:bg-[#212121] dark:text-white "
            trigger="click"
            visible={popoverVisible}
            onVisibleChange={handleVisibleChange}
          >
            <div className="dark:bg-[#272829]  cursor-pointer hover:dark:bg-[#202121] bg-[#f2f2f2] hover:bg-[#eae9e9] ml-3 text-black  dark:text-white px-2 pr-[13px]  p-[8px] rounded-full hidden md:flex gap-1  items-start font-semibold">
              <GoPlus size={20} /> <p className="text-[12px]">Create</p>
            </div>
          </Popover>
          <div className="p-2 hover:bg-[#f2f2f2] cursor-pointer hover:dark:bg-[#202121] rounded-full block md:hidden">
            <LiaChromecast size={22} />
          </div>
          <div className="relative">
            <Popover
              content={notificationContent}
              trigger="click"
              placement={placement}
            >
              <div className="p-2 hover:bg-[#f2f2f2] cursor-pointer hover:dark:bg-[#202121] rounded-full">
                <IoMdNotificationsOutline size={22} />
                <div className="absolute  flex text-[10px]  top-2 right-[10px] items-center justify-center  h-2 w-2 bg-red-600 rounded-full"></div>
              </div>
            </Popover>
          </div>

          <Link
            to={"/search"}
            className="p-1 hover:bg-[#f2f2f2] hover:dark:bg-[#202121] cursor-pointer block sm:hidden rounded-full "
          >
            <IoIosSearch size={22} />
          </Link>
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
