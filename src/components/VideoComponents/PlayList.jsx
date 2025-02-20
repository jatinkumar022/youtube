import React, { useState, useRef, useEffect } from "react";
import { RiMore2Fill, RiPlayListAddFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import { getAllVideos } from "../../redux/slice/videos/getAllVideoSlice";
import { getChannelPlaylists } from "../../redux/slice/playlist/getChannelPlaylistsSlice";
import { connect } from "react-redux";
import { mergeVideoAndPlaylists } from "../../utils/mergeVideoAndPlaylists";
import { useShowMore } from "../../utils/useShowMore";
import { formatTime, timesAgo } from "../../utils/timeAgo";
import { Popconfirm, Popover } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdMore, IoMdPlay } from "react-icons/io";
import PlaylistSelectModal from "../common/Modals/openPlaylistsModal";

const PlayList = ({
  callGetAllVideosData,
  callGetAllVideos,
  callGetChannelPlaylists,
  callGetChannelPlaylistsData,
}) => {
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState(false);
  const VideosData = callGetAllVideosData?.getAllVideosData?.data?.videos;

  const updatedVideo = VideosData?.map((video) => {
    return Object.assign({}, video, { type: "video" });
  });

  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    const handleGetAllVideos = async () => {
      try {
        const response = await callGetAllVideos();
      } catch (error) {
        console.log(error);
      }
    };
    handleGetAllVideos();
  }, []);

  useEffect(() => {
    const handleGetChannelPlaylists = async () => {
      try {
        const response = await callGetChannelPlaylists();
      } catch (error) {
        console.log(error);
      }
    };
    handleGetChannelPlaylists();
  }, []);

  let HomeData;
  if (
    updatedVideo &&
    callGetChannelPlaylistsData?.getChannelPlaylistsData?.data
  ) {
    HomeData = mergeVideoAndPlaylists(
      updatedVideo,
      callGetChannelPlaylistsData?.getChannelPlaylistsData?.data
    );
  }

  const { visibleItems, showMore, hasMore } = useShowMore(HomeData, 5);
  return (
    <div>
      {visibleItems?.map((item) =>
        item?.type === "video" ? (
          <div
            key={item?.video?._id}
            className="rounded-lg shadow p-4 w-full flex md:flex-row flex-col gap-4 transition-all duration-300 hover:shadow-lg relative"
          >
            {/* Thumbnail Container */}
            <div className="relative w-full aspect-[16/9] md:w-[200px] lg:w-[170px]  ">
              <img
                src={item?.thumbnail}
                alt={item?.title}
                className="absolute top-0 left-0 w-full h-full rounded-lg object-cover cursor-pointer"
                onClick={() => navigate(`/video/${item?._id}`)}
              />
              <p className="absolute bottom-2 right-2 bg-zinc-900 py-[2px] px-1 text-[13px] bg-opacity-70 rounded-md text-white">
                {formatTime(item?.duration)}
              </p>
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <div className="flex gap-3">
                  <div>
                    <h2
                      className="text-lg font-medium text-gray-800 dark:text-gray-200 line-clamp-2 hover:underline cursor-pointer min-w-52"
                      onClick={() => navigate(`/video/${item?._id}`)}
                    >
                      {item?.title}
                    </h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div className="roboto-medium flex items-center gap-2">
                        <img
                          src={item?.owner?.avatar}
                          alt="Avatar"
                          className="w-6 h-6 rounded-full cursor-pointer"
                          onClick={() =>
                            navigate(`/channel/${item?.owner?.username}`)
                          }
                        />{" "}
                        {item?.owner?.fullName}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{item?.views} views</span>
                        <span>•</span>
                        <span>{timesAgo(item?.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popover Button */}
                <Popover
                  trigger="click"
                  placement="bottom"
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
                  <div className="h-7 w-7 hover:bg-[#424242] absolute md:top-6 bottom-6 right-4 rounded-full flex items-center justify-center cursor-pointer">
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
          </div>
        ) : item?.videos?.length > 0 ? (
          <div
            key={item?._id}
            className="rounded-lg shadow p-4 w-full flex md:flex-row flex-col gap-4 transition-all duration-300 hover:shadow-lg relative group"
            onClick={() => navigate(`/playlist/${item?._id}`)}
          >
            {/* Thumbnail Container */}
            <div className="relative w-full aspect-[16/9] md:w-[200px] lg:w-[170px]   cursor-pointer">
              <img
                src={item?.videos[0]?.thumbnail}
                alt={item?.name}
                className="absolute top-0 left-0 w-full h-full rounded-lg object-cover cursor-pointer group-hover:brightness-50 transition duration-300"
                onClick={() => navigate(`/video/${item?._id}`)}
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center rounded-lg ">
                <div className="text-white text-sm  gap-2 items-center hidden group-hover:flex transition duration-300">
                  <IoMdPlay size={18} />
                  Play all
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <div className="flex gap-3">
                  <div>
                    <h2
                      className="text-lg font-medium text-gray-800 dark:text-gray-200 line-clamp-2 hover:underline cursor-pointer "
                      onClick={() => navigate(`/video/${item?._id}`)}
                    >
                      {item?.name}
                    </h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div className="roboto-medium">
                        {item?.owner?.fullName}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Playlist</span>
                        <span>•</span>
                        <span>{timesAgo(item?.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )
      )}
      {hasMore ? (
        <button
          className="font-medium w-full p-1.5 rounded-full dark:text-[#3ea6ff] text-[#065fd4] border border-zinc-200 dark:border-zinc-900 hover:bg-[#def1ff] hover:border-[#def1ff] hover:dark:bg-[#263850] dark:hover:border-[#263850] "
          onClick={() => showMore()}
        >
          Show more
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    callGetAllVideosData: state.getAllVideosData,
    callGetChannelPlaylistsData: state.getChannelPlaylistsData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetAllVideos: () => dispatch(getAllVideos()),
    callGetChannelPlaylists: () => dispatch(getChannelPlaylists()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
