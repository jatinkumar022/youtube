import React from "react";
import { IoShuffle } from "react-icons/io5";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useNavigate } from "react-router";
import { formatTime, timeAgo, timesAgo } from "../../utils/timeAgo";

const LikedVideosPage = ({ Videos }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col xl:flex-row relative justify-center xl:h-full overflow-x-hidden">
      {/* Left Section - Playlist Details */}
      {Videos?.length > 0 ? (
        <div className="max-xl:w-full flex flex-col relative justify-center xl:ml-9 xl:max-h-[calc(100vh-5rem)]">
          <div className="relative xl:rounded-3xl xl:overflow-hidden xl:p-10 xl:mx-6 xl:h-full m-5 ">
            {/* Blurred Background Image */}
            <img
              src={Videos[0]?.video?.thumbnail}
              alt="Playlist Thumbnail"
              className="absolute top-2 left-0 w-full h-full object-cover z-0 blur-xl scale-110"
            />
            {/* Playlist Details */}
            <div className="relative w-full z-10 text-white flex flex-col gap-4 p-8 xl:max-h-full">
              <div className="flex xl:w-72 justify-center">
                <img
                  src={Videos[0]?.video?.thumbnail}
                  alt="Thumbnail"
                  className="w-96 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <h1 className="font-bold text-2xl">Liked Videos</h1>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex gap-2 text-xs">
                      <p>{Videos?.length} videos</p>
                      <p className="hidden sm:flex md:hidden">
                        Last updated on {Videos[0]?.updatedAt}
                      </p>
                    </div>
                    <p className="sm:hidden md:flex text-xs">
                      Last updated on {timeAgo(Videos[0]?.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full md:max-xl:px-20">
                <button className="flex justify-center items-center bg-white rounded-full text-black p-2 font-medium w-1/2 text-sm gap-2 hover:bg-[#dad9d9]">
                  <TbPlayerPlayFilled />
                  <p>Play all</p>
                </button>
                <button className="flex justify-center items-center bg-[#4c4b4b84] hover:bg-[#4c4b4ba0] rounded-full w-1/2 font-medium text-sm gap-2">
                  <IoShuffle />
                  <p>Shuffle</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="xl:h-[50rem] overflow-hidden z-50   xl:overflow-y-auto">
        {/* Right Section - Video Items */}
        <div className="dark:bg-black bg-white   xl:px-8">
          <div className="max-w-full md:max-w-3xl md:mx-auto p-4 gap-4 flex flex-col shadow">
            {Videos?.length > 0 ? (
              Videos?.map((item) => (
                <div
                  key={item?.video?._id}
                  className="bg-white dark:bg-[#222222] rounded-lg shadow p-4 w-full flex md:flex-row flex-col gap-4 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] md:max-w-xs w-full md:w-auto">
                    <img
                      src={item?.video?.thumbnail}
                      alt={item?.video?.title}
                      className="rounded-lg w-full h-full object-cover cursor-pointer"
                      onClick={() => navigate(`/video/${item?.video?._id}`)}
                    />
                    <p className="absolute bottom-2 right-2 bg-zinc-900 py-[2px] px-1 text-[13px] bg-opacity-70 rounded-md text-white">
                      {formatTime(item?.video?.duration)}
                    </p>
                  </div>

                  <div className="flex-1 min-w-0 ">
                    <div className="flex items-center ">
                      <div className="flex gap-3">
                        <img
                          src={item?.video?.owner?.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full cursor-pointer"
                          onClick={() =>
                            navigate(`/channel/${item?.video?.owner?.username}`)
                          }
                        />
                        <div>
                          <h2
                            className="text-lg font-medium text-gray-800 dark:text-gray-200 line-clamp-2 hover:underline  cursor-pointer min-w-full text-balance"
                            onClick={() =>
                              navigate(`/video/${item?.video?._id}`)
                            }
                          >
                            {item?.video?.title}
                          </h2>
                          <div className="">
                            <div className=" text-sm text-gray-500 dark:text-gray-400 ">
                              <div className="roboto-medium ">
                                {item?.video?.owner?.username}{" "}
                              </div>
                              <div className="flex items-center gap-2">
                                <span>{item?.video?.views} views</span>
                                <span>•</span>
                                <span>{timesAgo(item?.video?.updatedAt)}</span>
                              </div>
                            </div>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No liked videos available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedVideosPage;
