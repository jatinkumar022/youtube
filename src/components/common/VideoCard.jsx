import React, { useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";
import ReactPlayer from "react-player"; // Import ReactPlayer
import { IoVolumeMuteOutline, IoVolumeHighOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { formatTime, timesAgo } from "../../utils/timeAgo";
import { RiPlayListAddFill } from "react-icons/ri";

import { Popover } from "antd";
import PlaylistSelectModal from "./Modals/openPlaylistsModal";
const VideoCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlay, setIsAutoPLay] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // State for mute functionality
  const [progress, setProgress] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const playerRef = useRef(null); // Reference to ReactPlayer

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const closeModal = () => setModalVisible(false);

  const handleMuteToggle = () => {
    setIsMuted((prevState) => !prevState);
  };
  const handleProgress = (state) => {
    setProgress(state.played * 100); // Set the progress in percentage
  };
  const handleSeek = (e) => {
    const progressBar = e.target;
    const clickPosition =
      (e.clientX - progressBar.getBoundingClientRect().left) /
      progressBar.offsetWidth;
    const seekTo = clickPosition * playerRef.current.getDuration();
    playerRef.current.seekTo(seekTo);
  };

  return (
    <div
      className="flex flex-col justify-start items-stretch w-full max-w-[450px] sm:max-w-[400px] md:max-w-[300px] lg:max-w-[390px] 2xl:max-w-[490px] 3xl:max-w-[590px] bg-white rounded-lg  dark:bg-[#0b0b0b] overflow-hidden transition-transform duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)} // Hover event
      onMouseLeave={() => setIsHovered(false)} // Hover out event
    >
      <>
        <div className="relative w-full h-0 pb-[56.25%]">
          {/* Conditionally render the video player */}
          {isHovered && isAutoPlay ? (
            <div className="absolute inset-0 z-10 w-full h-full">
              <ReactPlayer
                url={item?.videoFile} // Pass the video URL
                playing={true} // Automatically start playing the video
                muted={true}
                width="100%" // Full width
                height="100%"
                onProgress={handleProgress}
                onClick={() => navigate(`/video/${item?._id}`)}
              />
              <button
                onClick={handleMuteToggle}
                className="absolute top-4 right-4 p-2 bg-opacity-70 bg-black text-white rounded-full"
                aria-label="Toggle Mute "
              >
                {isMuted ? (
                  <IoVolumeMuteOutline size={20} />
                ) : (
                  <IoVolumeHighOutline size={20} />
                )}
              </button>
              <div
                className="absolute bottom-0 left-0 right-0 mx-4 h-[2px] bg-gray-600  rounded-md cursor-pointer"
                onClick={handleSeek}
                style={{
                  background: `linear-gradient(to right, red ${progress}%, gray ${progress}%)`,
                }}
              >
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <img
                src={item?.thumbnail}
                alt={item?.title}
                className="absolute top-0 left-0 rounded-lg w-full h-full object-cover"
                onClick={() => navigate(`/video/${item?._id}`)}
              />
              <p className="absolute bottom-1 right-1 bg-zinc-900 py-[2px] px-1 text-[10px] bg-opacity-70 rounded-md text-white">
                {formatTime(item?.duration)}
              </p>
            </>
          )}
        </div>

        <div className="p-3 flex flex-col gap-2">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-zinc-900  ">
              <img
                src={item?.owner?.avatar || ""}
                alt=""
                className="object-cover w-10 h-10 rounded-full bg-gray-300 dark:bg-zinc-900"
              />
            </div>
            <div className="flex-1">
              <h3
                className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 roboto-medium"
                onClick={() => navigate(`/video/${item?._id}`)}
              >
                {item?.title}
              </h3>
              <p
                className="text-xs text-gray-600 dark:text-gray-400 roboto-medium"
                onClick={() => navigate(`/channel/${item?.owner?.username}`)}
              >
                {item?.owner?.fullName}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 roboto-medium">
                {item?.views} • {timesAgo(item?.createdAt)}
              </p>
            </div>
            {/* Popover Button */}
            <Popover
              trigger="click"
              placement="bottom"
              open={open}
              content={
                <div
                  className="w-full p-3 flex items-center gap-2 cursor-pointer text-[#575757] dark:text-[#b6b5b5] "
                  onClick={() => {
                    setModalVisible(true);
                    setOpen(false);
                  }}
                >
                  <RiPlayListAddFill /> Add To playlist
                </div>
              }
            >
              <div
                className="h-7 w-7 hover:bg-[#424242]  rounded-full flex items-center justify-center cursor-pointer"
                onClick={handleOpen}
              >
                <IoMdMore size={20} />
              </div>
            </Popover>
            <PlaylistSelectModal
              videoId={item?._id}
              isVisible={isModalVisible}
              closeModal={closeModal}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default VideoCard;
