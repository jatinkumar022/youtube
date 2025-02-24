import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatTime, timeAgo, timesAgo } from "../../utils/timeAgo";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
import EditPlaylistModal from "../../components/common/Modals/EditPlaylist";

import { getmyVideos } from "../../redux/slice/dashboard/getMyVideosSlice";
import { connect } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import VideoSelectModal from "../../components/common/Modals/VideoSelectModal";
import { IoMdMore } from "react-icons/io";

import DeleteModal from "../../components/common/Modals/DeleteModal";
import { Popconfirm, Popover } from "antd";
import { removeVideoFromPlaylist } from "../../redux/slice/playlist/removeVideoFromPlaylistSlice";
import useMessage from "../../utils/useMessage";

const ViewPlaylistComponent = ({
  PlaylistInfo,
  callgetMyVideos,
  callgetMyVideosData,
  callRemoveVideoFromPlaylist,
  handleDelete,
  handleSelectVideo,
  isDeleteModalVisible,
  closeDeleteModal,
  openDeleteModal,
  handleEditOk,
  getPlaylistInfo,
}) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Track modal open state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { showMessage } = useMessage();
  // Select Video
  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // edit

  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close modal
  };

  useEffect(() => {
    const getMyVideos = async () => {
      try {
        await callgetMyVideos();
      } catch (error) {
        showMessage("error", error, 2);
      }
    };
    getMyVideos();
  }, []);

  const handleRemoveVideo = async (videoId) => {
    try {
      await callRemoveVideoFromPlaylist({
        videoId,
        playlistId: PlaylistInfo._id,
      });
      getPlaylistInfo();
    } catch (error) {
      showMessage("error", error, 2);
    }
  };

  return (
    <div className="w-full flex flex-col xl:flex-row relative justify-center xl:h-full overflow-x-hidden">
      {/* Left Section - Playlist Details */}
      {PlaylistInfo ? (
        <div className="max-xl:w-full flex flex-col relative justify-center xl:ml-9 xl:max-h-[calc(100vh-5rem)]">
          <div className="relative xl:rounded-3xl xl:overflow-hidden xl:p-10 xl:mx-6 xl:h-full m-5">
            {/* Blurred Background Image */}
            <img
              src={PlaylistInfo?.videos[0]?.thumbnail}
              alt="Playlist Thumbnail"
              className="absolute top-2 left-0 w-full h-full object-cover z-0 blur-xl scale-110"
            />
            {/* Playlist Details */}
            <div className="relative w-full z-10 text-white flex flex-col gap-4 p-8 xl:max-h-full">
              <div className="flex xl:w-72 justify-center">
                <img
                  src={PlaylistInfo?.videos[0]?.thumbnail}
                  alt="Thumbnail"
                  className="w-96 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <h1 className="font-bold text-2xl">{PlaylistInfo?.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="max-w-6 ">
                    <img
                      src={PlaylistInfo?.owner?.avatar}
                      alt=""
                      className="w-full rounded-full"
                    />
                  </div>
                  <p className="text-xs roboto-medium">
                    by {PlaylistInfo?.owner?.fullName}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex gap-2 text-xs">
                      <p className="roboto-medium">Playlist</p>•
                      <p>{PlaylistInfo?.videos?.length} videos</p>
                      <p className="hidden sm:flex md:hidden">
                        Last updated on {timeAgo(PlaylistInfo?.updatedAt)}
                      </p>
                      <p className="hidden sm:flex md:hidden">
                        Created on {timeAgo(PlaylistInfo?.createdAt)}
                      </p>
                    </div>
                    <p className="sm:hidden md:flex text-xs">
                      Last updated on {timeAgo(PlaylistInfo?.updatedAt)}
                    </p>
                    <p className="sm:hidden md:flex text-xs">
                      Created on {timeAgo(PlaylistInfo?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <p className="roboto-medium text-sm">Description:</p>
              <p className="roboto-medium text-[#413e3e] dark:text-[#eeecec] -mt-5">
                {PlaylistInfo?.description}
              </p>
              <div className="flex gap-6  mt-4">
                <div className="w-full max-w-72">
                  <button
                    className="flex items-center gap-2  w-full rounded-full dark:bg-white dark:text-black h-9 bg-black text-white px-2 py-1.5 roboto-medium justify-center"
                    onClick={showModal}
                  >
                    <AiOutlinePlus />
                    Add videos
                  </button>
                  <VideoSelectModal
                    isVisible={isModalVisible}
                    closeModal={closeModal}
                    videos={callgetMyVideosData?.getMyVideosData?.data}
                    onSelectVideo={handleSelectVideo}
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <button
                    className="dark:bg-[#272727] p-2 h-9 w-9 flex items-center justify-center rounded-full bg-[#f0f0f0]"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    <BsPencil />
                  </button>
                  <EditPlaylistModal
                    open={isEditModalOpen}
                    handleEditOk={handleEditOk}
                    closeModal={closeEditModal}
                    PlaylistInfo={PlaylistInfo}
                  />

                  <button
                    className="dark:bg-[#272727] p-2 h-9 w-9 flex items-center justify-center rounded-full bg-[#f0f0f0]"
                    onClick={() => openDeleteModal("true")}
                  >
                    <MdDeleteOutline />
                  </button>
                  <DeleteModal
                    isDeleteModalVisible={isDeleteModalVisible}
                    closeDeleteModal={closeDeleteModal}
                    onDelete={handleDelete}
                    itemName={PlaylistInfo?.name}
                    id={PlaylistInfo?._id}
                  />
                </div>
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
            {PlaylistInfo?.videos?.length > 0 ? (
              PlaylistInfo?.videos?.map((item) => (
                <div
                  key={item?.video?._id}
                  className="bg-white dark:bg-[#222222] rounded-lg shadow p-4 w-full flex md:flex-row flex-col gap-4 transition-all duration-300 hover:shadow-lg relative"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] md:max-w-xs w-full md:w-auto">
                    <img
                      src={item?.thumbnail}
                      alt={item?.title}
                      className="rounded-lg w-full h-full object-cover cursor-pointer"
                      onClick={() => navigate(`/video/${item?._id}`)}
                    />
                    <p className="absolute bottom-2 right-2 bg-zinc-900 py-[2px] px-1 text-[13px] bg-opacity-70 rounded-md text-white">
                      {formatTime(item?.duration)}
                    </p>
                  </div>

                  <div className="flex-1 min-w-0 ">
                    <div className="flex items-center ">
                      <div className="flex gap-3">
                        <img
                          src={item?.owner?.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full cursor-pointer"
                          onClick={() =>
                            navigate(`/channel/${item?.owner?.username}`)
                          }
                        />
                        <div>
                          <h2
                            className="text-lg font-medium text-gray-800 dark:text-gray-200 line-clamp-2 hover:underline  cursor-pointer min-w-full text-balance"
                            onClick={() => navigate(`/video/${item?._id}`)}
                          >
                            {item?.title}
                          </h2>
                          <div className="">
                            <div className=" text-sm text-gray-500 dark:text-gray-400 ">
                              <div className="roboto-medium ">
                                {item?.owner?.fullName}{" "}
                              </div>
                              <div className="flex items-center gap-2">
                                <span>{item?.views} views</span>
                                <span>•</span>
                                <span>{timesAgo(item?.createdAt)}</span>
                              </div>
                            </div>{" "}
                          </div>
                        </div>
                        <Popover
                          trigger="click"
                          placement="bottom"
                          content={
                            <>
                              <div className="w-full p-3 flex flex-col gap-2 cursor-pointer text-[#575757] dark:text-[#b6b5b5]">
                                <Popconfirm
                                  trigger="click"
                                  title="Remove the video?"
                                  description="Are you sure to remove this Video from playlist?"
                                  placement="bottom"
                                  onConfirm={() => handleRemoveVideo(item?._id)}
                                >
                                  <li className="flex gap-3 items-center ">
                                    <MdDeleteOutline size={18} />
                                    <p className="mt-0.5">Remove</p>
                                  </li>
                                </Popconfirm>
                              </div>
                            </>
                          }
                        >
                          <div className="h-7 w-7 hover:bg-[#424242]  absolute md:top-6 bottom-6  right-4 rounded-full flex items-center justify-center cursor-pointer">
                            <IoMdMore size={20} className="" />
                          </div>
                        </Popover>
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

const mapStateToProps = (state) => {
  return {
    callCurrentUserData: state.getCurrentUserData,
    callgetMyVideosData: state.getMyVideosData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callgetMyVideos: () => dispatch(getmyVideos()),
    callRemoveVideoFromPlaylist: (data) =>
      dispatch(removeVideoFromPlaylist(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPlaylistComponent);
