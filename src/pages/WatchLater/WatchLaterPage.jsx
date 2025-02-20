import React from "react";
import { IoShuffle } from "react-icons/io5";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { TfiDownload } from "react-icons/tfi";
import { useNavigate } from "react-router";

const WatchLaterComponent = ({ playlist, items }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col xl:flex-row relative justify-center overflow-hidden xl:h-full">
      {/* Left Section */}
      <div className="max-xl:w-full flex flex-col relative justify-center  xl:ml-9 ">
        {/* Blurred Background Image for Playlist */}
        <div className="relative xl:rounded-3xl xl:overflow-hidden xl:p-10 xl:mx-6 xl:h-full m-5 ">
          <img
            src={playlist[0].thumbnail}
            alt="Playlist Thumbnail"
            className="absolute top-2 left-0 w-full h-full object-cover z-0 blur-xl scale-110"
          />
          <img
            src={playlist[0].thumbnail}
            alt="Playlist Thumbnail"
            className="absolute top-2 left-0 w-full h-full object-cover z-0 blur-xl scale-110"
          />
          {/* Playlist Details */}
          <div className="relative w-full z-10 text-white flex flex-col gap-4 p-8   ">
            <div className="flex xl:w-72 justify-center">
              <img
                src={playlist[0].thumbnail}
                alt="Thumbnail"
                className="w-96 rounded-lg "
              />
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <h1 className="font-bold text-2xl">Watch later</h1>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium">Jatin Ramani</h3>
                  <div className="flex gap-2 text-xs">
                    <p>22 videos</p>
                    <p>No views</p>
                    <p className="hidden sm:flex md:hidden">
                      Last updated on Sep 5, 2024
                    </p>
                  </div>
                  <p className="sm:hidden md:flex text-xs">
                    Last updated on Sep 5, 2024
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-[#4c4b4b84] hover:bg-[#4c4b4ba0] rounded-full">
                    <TfiDownload />
                  </button>
                  <button className="p-2 bg-[#4c4b4b84] hover:bg-[#4c4b4ba0] rounded-full">
                    <PiDotsThreeVerticalBold />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:max-xl:px-20">
              <button className="flex justify-center items-center bg-white rounded-full text-black p-2 font-medium w-1/2 text-sm gap-2  hover:bg-[#dad9d9]">
                <TbPlayerPlayFilled />
                <p>Play all</p>
              </button>
              <button className="flex justify-center items-center bg-[#4c4b4b84] hover:bg-[#4c4b4ba0] rounded-full w-1/2  font-medium text-sm gap-2">
                <IoShuffle />
                <p>Shuffle</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Video Items */}
      <div className="dark:bg-black bg-white w-full z-50 h-full overflow-auto  xl:px-8">
        <div className="max-[768px]:w-full max-[768px]:flex flex-col items-center md:max-w-3xl md:mx-auto p-4  shadow">
          {Object.keys(items).length > 0 ? (
            <div className="mb-6">
              <div className="grid gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate("/video")}
                    className="p-4 bg-white rounded-lg shadow dark:bg-[#222222] max-[768px]:max-w-80 flex max-[768px]:flex-col gap-3 relative xl:rounded-md cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="relative w-fit">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="rounded-lg object-cover"
                        />
                        <p className="absolute bottom-1 right-1 bg-zinc-900 py-[2px] px-1 text-[10px] bg-opacity-70 rounded-md text-white">
                          11:20
                        </p>
                      </div>
                    </div>

                    {/* Title and Channel Info */}
                    <div className="flex-1 min-w-0">
                      <h1 className="text-pretty font-medium text-gray-800 dark:text-gray-200 break-words">
                        {item.title}
                      </h1>
                      <div className="flex gap-1 text-[#aaa]">
                        <p>{item.channel}</p>
                        <p>•</p>
                        <p>{item.views}</p>
                      </div>
                    </div>

                    {/* Remove Icon */}
                    <div className="absolute right-3 bottom-3 p-2 hover:dark:bg-[#353535] rounded-full cursor-pointer hover:bg-[#f6f1f1]">
                      <RxCross1 />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No search history available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchLaterComponent;
