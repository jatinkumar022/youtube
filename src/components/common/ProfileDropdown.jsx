import React, { useState, useRef } from "react";
import DarkModeSwitch from "../Ui/ThemeSwitch";
import avatar from "../../assets/avatar/avatar.jpg";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { LuChevronRight } from "react-icons/lu";
import { SiYoutubestudio } from "react-icons/si";
import { IoMoonOutline, IoSettingsOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { Link } from "react-router";
import { logout } from "../../redux/slice/users/logoutSlice";
import { connect } from "react-redux";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
const ProfileMenu = (props) => {
  const { callLogout, callGetCurrentUserData } = props;
  const user = callGetCurrentUserData?.getCurrentUserData?.user;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const avatarRef = useRef(null);
  const navigate = useNavigate();

  // Toggle menu visibility
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close menu when clicking outside
  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      avatarRef.current &&
      !avatarRef.current.contains(e.target)
    ) {
      setMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await callLogout();
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex justify-end p-4">
      {/* Profile Icon */}
      <button onClick={toggleMenu} ref={avatarRef}>
        <img
          src={user?.avatar || null}
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-14  right-4 bg-white dark:bg-[#282828] shadow-lg rounded-lg w-72 text-sm dark:text-gray-200"
        >
          {/* Section 1 */}
          <div className="p-4 border-b flex gap-3 dark:border-[#535252]">
            <div>
              <img
                src={user?.avatar || null}
                className="w-11 h-11 rounded-full cursor-pointer"
              />
            </div>
            <div>
              <p className="font-medium text-[17px]">{user?.fullName || ""}</p>
              <p className="text-gray-500 text-base">{user?.email || ""}</p>
              <Link
                className="text-blue-400 text-base"
                to={"/library"}
                onClick={() => setMenuOpen(false)}
              >
                View your channel
              </Link>
            </div>
          </div>

          {/* Section 2 */}
          <ul className="p-1">
            <li className="px-4 flex gap-5 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#313131] cursor-pointer">
              <FaGoogle size={20} />
              <p className="font-normal text-[17px]">Your Channel</p>
            </li>
            <li className=" flex justify-between items-center rounded-lg px-4 py-3 hover:bg-gray-100 dark:hover:bg-[#313131]">
              <div className="flex gap-5   cursor-pointer ">
                <MdOutlineSwitchAccount size={20} />
                <p className="font-normal text-[17px]">Switch Account</p>
              </div>
              <div>
                <LuChevronRight size={18} />
              </div>
            </li>

            <Popconfirm
              className="px-4 flex gap-5 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#313131] cursor-pointer"
              onConfirm={handleLogout}
              showCancel={true}
              ref={menuRef}
              title="Delete the task"
              description="Are you sure to delete this task?"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              <IoIosLogOut size={20} />
              <p className="font-normal text-[17px]">Sign out</p>
            </Popconfirm>
          </ul>

          <hr className="my-2 border-gray-200 dark:border-[#535252]" />

          {/* Section 3 */}
          <ul className="p-1">
            <Link
              to={"/your-channel"}
              className="px-4 flex gap-5 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#313131] cursor-pointer"
            >
              <SiYoutubestudio size={20} />
              <p className="font-normal text-[17px]">Youtube Studio</p>
            </Link>
            <li className="px-4 flex gap-5 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#313131] cursor-pointer">
              <IoMoonOutline size={20} />
              <p className="font-normal text-[17px]">Appearance</p>
              <div className="">
                <DarkModeSwitch />
              </div>
            </li>
            <Link
              to={"/settings"}
              className="px-4 flex gap-5 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#313131] cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <IoSettingsOutline size={20} />
              <p className="font-normal text-[17px]">Settings</p>
            </Link>
          </ul>

          <hr className="my-2 border-gray-200 dark:border-[#535252]" />

          {/* Logout */}
          <ul className="p-1">
            <li className="px-4 flex gap-5 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#313131] cursor-pointer">
              <GoQuestion size={20} />
              <p className="font-normal text-[17px]">Help</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    callLogoutData: state.logoutData,
    callGetCurrentUserData: state.getCurrentUserData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callLogout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
