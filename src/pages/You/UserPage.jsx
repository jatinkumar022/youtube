import React, { useState } from "react";
import avatar from "../../assets/avatar/avatar.jpg";
import { MdLogout, MdOutlineSwitchAccount } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import SwiperComponent from "../../components/common/Swiper";
import { IoMdPlay } from "react-icons/io";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import LikedVideosSwiper from "../../components/common/LikedVideosSwiper";
import { GoPlus } from "react-icons/go";
import PlaylistModal from "../../components/common/Modals/PlaylistModal";
import PlaylistSwiperComponent from "../../components/common/PlaylistSwiper";
const UserComponent = (props) => {
  const { handleLogout, playlist, user, LikedVideos, getPlaylists } = props;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open state

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <>
      <div className="p-4 min-[500px]:p-10  min-[600px]:px-32 min-[800px]:px-18 ">
        <div className=" lg:w-full flex flex-col justify-start">
          <div className="flex flex-col gap-3  w-full ">
            <div className="flex items-center gap-4">
              <div className="">
                <img
                  src={user.avatar}
                  className="rounded-full w-[70px] min-[500px]:w-[123px]"
                />
              </div>
              <div className="flex flex-col gap-1 min-[500px]:gap-2 w-full">
                <h1 className="text-xl min-[500px]:text-2xl font-[650]">
                  {user.fullName}
                </h1>
                <div className="flex text-xs min-[500px]:text-sm font-semibold text-[#525252] dark:text-[#aaa] gap-1">
                  <p> @{user.username}</p>
                  <p>•</p>
                  <Link to={"/your-channel"}>View channel</Link>
                </div>
                <div className="min-[750px]:flex gap-1 hidden">
                  <div className="flex justify-center items-center h-9  text-[14px] font-[600]">
                    <div className="flex rounded-l-full  h-full gap-2 items-center bg-[#f2f2f2] hover:bg-[#e6e6e6]  dark:bg-[#272727] hover:dark:bg-[#373737]">
                      <button
                        className={`flex gap-2 border-r border-zinc-400  px-4 text-xs roboto-medium`}
                        onClick={() => navigate("/your-content?type=videos")}
                      >
                        Your Videos
                      </button>
                    </div>
                    <div className="flex rounded-r-full  px-4 h-full gap-2 items-center bg-[#f2f2f2] hover:bg-[#e6e6e6] dark:bg-[#272727] hover:dark:bg-[#373737]">
                      <button
                        className="text-xs roboto-medium"
                        onClick={() => navigate("/your-content?type=tweets")}
                      >
                        Your Tweets
                      </button>
                    </div>
                  </div>
                  <Popconfirm
                    onConfirm={handleLogout}
                    showCancel={true}
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
                    <button className="p-2  w-40 rounded-full dark:bg-[#272727] bg-[#f2f2f2] hover:dark:bg-[#2f2f2f] text-xs font-medium flex items-center justify-center gap-2">
                      <MdLogout size={17} />
                      Logout
                    </button>
                  </Popconfirm>
                </div>
              </div>
            </div>
            <div className="flex gap-1 w-full min-[750px]:hidden">
              <div className="flex justify-center items-center h-9 w-full text-[14px] font-[600]">
                <div className="flex rounded-l-full  h-full gap-2 items-center bg-[#f2f2f2] hover:bg-[#e6e6e6]  dark:bg-[#272727] hover:dark:bg-[#373737]">
                  <button
                    className={`flex gap-2 border-r border-zinc-400  px-4 text-xs roboto-medium`}
                    onClick={() => navigate("/your-content?type=videos")}
                  >
                    Your Videos
                  </button>
                </div>
                <div className="flex rounded-r-full  px-4 h-full gap-2 items-center bg-[#f2f2f2] hover:bg-[#e6e6e6] dark:bg-[#272727] hover:dark:bg-[#373737]">
                  <button
                    className="text-xs roboto-medium"
                    onClick={() => navigate("/your-content?type=tweets")}
                  >
                    Your Tweets
                  </button>
                </div>
              </div>
              <Popconfirm
                onConfirm={handleLogout}
                showCancel={true}
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
                <button className="p-2  w-full rounded-full dark:bg-[#272727] bg-[#f2f2f2] hover:dark:bg-[#2f2f2f] text-xs font-medium flex items-center justify-center gap-2">
                  <MdLogout size={17} />
                  Logout
                </button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 min-[500px]:p-10  min-[600px]:px-32 min-[800px]:px-18  ">
        <div className=" lg:w-full flex flex-col justify-start min-[300px]:items-center lg:items-start">
          <div className="w-full ">
            {false ? (
              <>
                <div className="flex justify-between w-full">
                  <h1 className="text-2xl font-semibold">History</h1>

                  <div className="flex items-center gap-3">
                    <button
                      className="dark:hover:bg-[#272727] text-[#aaa] rounded-full w-10 h-10 flex items-center justify-center"
                      onClick={() => navigate("/")}
                    >
                      <GoPlus size={35} className="" />
                    </button>
                    <Link
                      to={"/history"}
                      className="p-1 text-base h-10 px-5 border border-[#272727] hover:bg-[#272727] rounded-full flex items-center justify-center hover:text-white"
                    >
                      View All
                    </Link>
                  </div>
                </div>
                {/* Card start */}

                {/* <SwiperComponent items={items} /> */}
              </>
            ) : (
              <>
                <h1 className="text-lg  font-semibold">History</h1>
                <p className="text-base text-[#aaa]">
                  Videos you watch will show up here.
                  <Link className="text-blue-500">Browse videos</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 min-[500px]:p-10  min-[600px]:px-32 min-[800px]:px-18  ">
        <div className=" lg:w-full flex flex-col justify-start min-[300px]:items-center lg:items-start">
          <div className="w-full ">
            {playlist?.length > 0 ? (
              <>
                <div className="flex justify-between w-full">
                  <h1 className="text-2xl font-semibold">Playlists</h1>

                  <div className="flex items-center gap-3">
                    <button
                      className="dark:hover:bg-[#272727] text-[#aaa] rounded-full w-10 h-10 flex items-center justify-center"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <GoPlus size={35} className="" />
                    </button>
                    <PlaylistModal
                      open={isModalOpen}
                      closeModal={closeModal}
                      getPlaylists={getPlaylists}
                    />
                    <Link
                      to={"/playlists"}
                      className="p-1 text-base h-10 px-5 border border-[#272727] hover:bg-[#272727] rounded-full flex items-center justify-center hover:text-white"
                    >
                      View All
                    </Link>
                  </div>
                </div>
                {/* Card start */}

                <PlaylistSwiperComponent playlist={playlist} />
              </>
            ) : (
              <>
                <h1 className="text-lg  font-semibold">Playlists</h1>
                <p className="text-base text-[#aaa]">
                  Your playlists will show up here.
                  <Link
                    className="text-blue-500"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Create new
                  </Link>
                  <PlaylistModal
                    open={isModalOpen}
                    closeModal={closeModal}
                    getPlaylists={getPlaylists}
                  />
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 min-[500px]:p-10 -mt-1 md:-mt-10 min-[600px]:px-32 min-[800px]:px-18  ">
        <div className=" lg:w-full flex flex-col justify-start min-[300px]:items-center lg:items-start">
          <div className="w-full ">
            {false ? (
              <>
                <div className="flex justify-between w-full">
                  <h1 className="text-2xl font-semibold">Watch Later</h1>

                  <div className="flex items-center gap-3">
                    <Link
                      to={"/watchlater"}
                      className="p-1 text-base h-10 px-5 border border-[#272727] hover:bg-[#272727] rounded-full flex items-center justify-center hover:text-white"
                    >
                      View All
                    </Link>
                  </div>
                </div>
                {/* Card start */}

                <SwiperComponent items={items} />
              </>
            ) : (
              <>
                <h1 className="text-lg  font-semibold">Watch Later</h1>
                <p className="text-base text-[#aaa]">
                  Videos in Watch later will show up here.
                  <Link className="text-blue-500">Browse videos</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 min-[500px]:p-10 -mt-1 md:-mt-10 min-[600px]:px-32 min-[800px]:px-18  ">
        <div className=" lg:w-full flex flex-col justify-start min-[300px]:items-center lg:items-start">
          <div className="w-full ">
            {LikedVideos?.length > 0 ? (
              <>
                <div className="flex justify-between w-full">
                  <h1 className="text-2xl font-semibold">Liked Videos</h1>

                  <div className="flex items-center gap-3">
                    <Link
                      to={"/liked-videos"}
                      className="p-1 text-base h-10 px-5 border border-[#272727] hover:bg-[#272727] rounded-full flex items-center justify-center hover:text-white"
                    >
                      View All
                    </Link>
                  </div>
                </div>
                {/* Card start */}

                <LikedVideosSwiper LikedVideos={LikedVideos} />
              </>
            ) : (
              <>
                <h1 className="text-lg  font-semibold">Liked videos</h1>
                <p className="text-base text-[#aaa]">
                  Videos you liked will show up here.
                  <Link className="text-blue-500">Browse videos</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserComponent;
