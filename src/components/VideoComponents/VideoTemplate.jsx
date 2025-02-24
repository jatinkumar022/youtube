import { GrDislike, GrLike } from "react-icons/gr";
import Linkify from "linkify-react";
import { FiBell } from "react-icons/fi";
import { TfiDownload } from "react-icons/tfi";
import { PiShareFatLight } from "react-icons/pi";
import { RiMore2Line, RiPlayListAddFill } from "react-icons/ri";
import { Popover } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getVideoById } from "../../redux/slice/videos/getVideoByIdSlice";
import { getChannel } from "../../redux/slice/users/getChannelSlice";
import { timesAgo } from "../../utils/timeAgo";
import { useLocation, useNavigate } from "react-router";
import { isLikedVideo } from "../../redux/slice/likes/isLikedVideoSlice";
import { likeVideo } from "../../redux/slice/likes/likeVideoSlice";
import { toggleSubscribe } from "../../redux/slice/subscription/toggleSubscribeSlice";
import { formatSubscribers } from "../../utils/subscriberCount";
import PlaylistSelectModal from "../common/Modals/openPlaylistsModal";
import useMessage from "../../utils/useMessage";
import VideoLoader from "../Loaders/VideoLoader";
import ShareModal from "./ShareButton";
import { incrementVideoView } from "../../redux/slice/videos/incrementVideoViewSlice";

const linkifyOptions = {
  defaultProtocol: "https",
  className: "text-blue-600 hover:underline",
  target: "_blank",
};

function extractPublicId(videoFileUrl) {
  const parts = videoFileUrl?.split("/");
  const publicIdWithExtension = parts[parts?.length - 1]; // Extract the last part (file name with extension)
  const publicId = publicIdWithExtension?.split(".")[0]; // Remove the file extension (.mp3, .mp4, etc.)
  return publicId;
}

const VideoTemplate = (props) => {
  const {
    callGetVideoById,
    callGetVideoByIdData,
    callIsLikedVideo,
    videoId,
    callLikeVideoAction,
    callIsLikedVideoData,
    callGetChannel,
    callGetChannelData,
    callToggleSubscribe,
    callIncrementVideoView,
  } = props;
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const Video = callGetVideoByIdData?.getVideoByIdData?.data;
  const Channel = callGetChannelData?.getChannelData?.data;
  const [isModalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(true);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const closeModal = () => setModalVisible(false);
  const location = useLocation();
  useEffect(() => {
    try {
      setLoading(true);
      const getVideoDetails = async () => {
        if (videoId) {
          const response = await callGetVideoById(videoId);
          console.log(response);
        } else {
          showMessage("error", "Invalid Video or video not found");
        }
      };
      getVideoDetails();
      setLoading(false);
    } catch (error) {
      showMessage("error", error.message);
      setLoading(false);
    }
  }, [location?.pathname]);

  useEffect(() => {
    try {
      const getChannelInfo = async () => {
        const response = await callGetChannel(Video?.owner?.username);
      };
      getChannelInfo();
    } catch (error) {
      showMessage("error", error.message);
    }
  }, [Video?.owner]);

  useEffect(() => {
    const handleGetLikesStatus = async () => {
      try {
        const response = await callIsLikedVideo(videoId);
      } catch (error) {
        showMessage("error", error.message);
      }
    };
    handleGetLikesStatus();
  }, []);

  const handleLikeClick = async (videoId) => {
    const response = await callLikeVideoAction(videoId);

    await callIsLikedVideo(videoId);
  };
  // Toggle between expanded and collapsed states
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const handleSubscribe = async (userId) => {
    const response = await callToggleSubscribe(userId);

    callGetChannel(Video?.owner?.username);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        callGetVideoByIdData?.getVideoByIdData?.data?.videoFile
      );
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = callGetVideoByIdData?.getVideoByIdData?.data?.title; // You can specify the name of the downloaded file
      link.click();
      window.URL.revokeObjectURL(link.href); // Clean up the URL object
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };
  const content = (
    <div className="dark:bg-[#212121] p-3 dark:text-white  rounded-md">
      <div
        className="  min-[450px]:max-[640px]:hidden min-[1040px]:hidden w-full p-3 flex items-center gap-2 cursor-pointer text-[#575757] dark:text-[#b6b5b5] "
        onClick={handleDownload}
      >
        <TfiDownload size={18} />
        Download
      </div>

      <div
        className="w-full p-3 flex items-center gap-2 cursor-pointer text-[#575757] dark:text-[#b6b5b5] "
        onClick={() => {
          setModalVisible(true);
          setOpen(false);
        }}
      >
        <RiPlayListAddFill /> Add To playlist
      </div>
    </div>
  );

  // video Views count
  useEffect(() => {
    if (Video && Video._id) {
      const timer = setTimeout(() => {
        callIncrementVideoView(Video._id)
          .unwrap()
          .then((updatedVideo) => {
            console.log("Video view incremented:", updatedVideo);
          })
          .catch((error) => {
            console.error("Error incrementing video view:", error);
          });
      }, 3000); // 30 seconds timer

      return () => clearTimeout(timer);
    }
  }, [Video, callIncrementVideoView]);

  return (
    <>
      {callGetVideoByIdData?.getVideoByIdData ?? !loading ? (
        <div className="w-full">
          <div
            className="relative w-full rounded-lg "
            style={{ paddingBottom: "56.25%" /* 16:9 aspect ratio */ }}
          >
            <iframe
              src={`https://player.cloudinary.com/embed/?public_id=${
                Video ? extractPublicId(Video?.videoFile) : ""
              }&cloud_name=dvwnrzsjh&profile=Video`}
              // src={`https://player.cloudinary.com/embed/?public_id=rh9osdftezovbbgtio2l&cloud_name=jatinramani022&profile=Video%20default&autoplay=1 [title]=${items[0].title}`}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowfullscreen
              frameborder="0"
              className="rounded-xl absolute  w-full h-full left-0"
            ></iframe>
          </div>
          {/* about channel  */}
          <div className="py-2  w-full h-full">
            {/* title  */}
            <h1 className="font-semibold text-lg py-1 roboto-bold">
              {Video?.title}
            </h1>
            <div className="flex sm:items-center flex-col sm:flex-row py-4 justify-between gap-3">
              <div className="flex items-center gap-3 w-full ">
                {/* Avatar */}
                <div
                  className="flex-shrink-0 cursor-pointer"
                  onClick={() => navigate(`/channel/${Channel?.username}`)}
                >
                  <img
                    src={Channel?.avatar}
                    alt="Avatar"
                    className="w-11 h-11 rounded-full"
                  />
                </div>

                {/* Channel Info and Subscribe Button */}
                <div className="flex-1 flex items-center min-w-0 ">
                  {/* Channel Info */}
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => navigate(`/channel/${Channel?.username}`)}
                  >
                    <h1 className="font-[500] truncate">{Channel?.fullName}</h1>
                    <p className="text-[#606060] text-xs dark:text-[#aaa]">
                      {formatSubscribers(Channel?.subscribersCount)} subscribers
                    </p>
                  </div>

                  {/* Subscribe Button */}
                  <div className="flex-shrink-0 ml-4">
                    {!Channel?.isSubscribed ? (
                      <button
                        className="px-5 py-[8px] text-[14px] font-[600] rounded-full bg-black hover:bg-[#2a2a2a] text-white dark:hover:bg-[#e7e7e7] dark:bg-white dark:text-black"
                        onClick={() => handleSubscribe(Channel?._id)}
                      >
                        Subscribe
                      </button>
                    ) : (
                      <button
                        className="flex   gap-2 items-center px-5 py-[8px] text-[14px] font-[600] rounded-full bg-[#f2f2f2] hover:bg-[#e6e6e6]  dark:bg-[#272727] hover:dark:bg-[#373737] "
                        onClick={() => handleSubscribe(Channel?._id)}
                      >
                        <FiBell size={18} className="mt-[1px]" />
                        Subscribed
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex  gap-3 w-full">
                <div className="flex justify-center items-center h-9  text-[14px] font-[600]">
                  <div className="flex rounded-l-full  h-full gap-2 items-center bg-[#f2f2f2] hover:bg-[#e6e6e6]  dark:bg-[#272727] hover:dark:bg-[#373737]">
                    <button
                      onClick={() => handleLikeClick(videoId)}
                      className={`flex gap-2 border-r border-zinc-400  px-4 ${
                        callIsLikedVideoData?.isLikedVideoData?.data?.userLiked
                          ? "text-blue-500"
                          : "text-gray-500"
                      }`}
                    >
                      <GrLike size={18} />
                      {formatSubscribers(
                        callIsLikedVideoData?.isLikedVideoData?.data?.likeCount
                      )}
                    </button>
                  </div>
                  <div className="flex rounded-r-full px-4 h-full gap-2 items-center bg-[#f2f2f2] hover:bg-[#e6e6e6] dark:bg-[#272727] hover:dark:bg-[#373737]">
                    <button>
                      <GrDislike size={18} />
                    </button>
                  </div>
                </div>
                <button>
                  <ShareModal
                    url={`http://localhost:5173/video/${videoId}`}
                    title="Check out this awesome content!"
                  />
                </button>

                <button
                  className="hidden min-[450px]:max-[640px]:flex min-[1040px]:flex  gap-2 items-center px-5 py-[8px] text-[14px] font-[600] rounded-full bg-[#f2f2f2] hover:bg-[#e6e6e6]  dark:bg-[#272727] hover:dark:bg-[#373737]"
                  onClick={handleDownload}
                >
                  <TfiDownload size={18} />
                  Download
                </button>
                <Popover
                  open={open}
                  content={content}
                  trigger="click"
                  placement="bottom"
                >
                  <button
                    className="flex   gap-2 items-center p-[8px] px-[10px] text-[14px] font-[600] rounded-full bg-[#f2f2f2] hover:bg-[#e6e6e6]  dark:bg-[#272727] hover:dark:bg-[#373737]"
                    onClick={handleOpen}
                  >
                    <RiMore2Line size={18} />
                  </button>
                </Popover>
                {/*  */}

                <PlaylistSelectModal
                  videoId={videoId}
                  isVisible={isModalVisible}
                  closeModal={closeModal}
                />
              </div>
            </div>
            <div className="w-full text-[14px] relative  rounded-xl bg-[#f2f2f2] dark:bg-[#272727] cursor-pointer p-2 px-4">
              <div className="font-[550] flex gap-2 flex-wrap">
                <p>{formatSubscribers(Video?.views)} views</p>
                <p>{timesAgo(Video?.createdAt)}</p>
                <p className="text-[#606060] dark:text-[#aaa] truncate">Tags</p>
              </div>
              {/* prettier-ignore */}
              <Linkify options={linkifyOptions}>
          <pre  className="whitespace-pre-line text-[15px] font-medium ">

         {isExpanded ? Video?.description : Video?.description?.split("\n")[0]}
         {!isExpanded && Video?.description?.includes("\n") && "... "}
          </pre></Linkify>
              {Video?.description?.includes("\n") && (
                <button
                  onClick={toggleExpanded}
                  className="absolute font-bold  bottom-2 right-2 tracking-wider"
                >
                  {isExpanded ? "Show Less" : "...more"}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <VideoLoader />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    callGetVideoByIdData: state.getVideoByIdData,
    callGetChannelData: state.getChannelData,
    callIsLikedVideoData: state.isLikedVideoData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetVideoById: (videoId) => dispatch(getVideoById(videoId)),
    callGetChannel: (username) => dispatch(getChannel(username)),
    callIsLikedVideo: (videoId) => dispatch(isLikedVideo(videoId)),
    callLikeVideoAction: (videoId) => dispatch(likeVideo(videoId)),
    callToggleSubscribe: (userId) => dispatch(toggleSubscribe(userId)),
    callIncrementVideoView: (videoId) => dispatch(incrementVideoView(videoId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoTemplate);
