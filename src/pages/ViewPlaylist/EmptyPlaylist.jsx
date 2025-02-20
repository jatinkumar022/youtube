import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { TbDotsVertical } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import VideoSelectModal from "../../components/common/Modals/VideoSelectModal";
import { MdDeleteOutline } from "react-icons/md";
import EditPlaylistModal from "../../components/common/Modals/EditPlaylist";
import DeleteModal from "../../components/common/Modals/DeleteModal";
import { addVideoToPlaylist } from "../../redux/slice/playlist/addVideoToPlaylistSlice";
import { getYourVideos } from "../../redux/slice/dashboard/getYourVideosSlice";
import { connect } from "react-redux";

const EmptyPlaylist = (props) => {
  const {
    PlaylistInfo,
    callGetYourVideos,
    callGetYourVideosData,
    handleDelete,
    handleSelectVideo,
    isDeleteModalVisible,
    closeDeleteModal,
    openDeleteModal,
    handleEditOk,
  } = props;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Track modal open state
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    const getYourVideos = async () => {
      try {
        await callGetYourVideos();
      } catch (error) {
        console.log(error);
      }
    };
    getYourVideos();
  }, []);

  return (
    <div className="p-4 min-[500px]:p-10 min-[600px]:px-32 min-[800px]:px-18 ">
      <div className="lg:w-full flex flex-col justify-start">
        <div className="flex flex-col gap-1">
          <h1 className="roboto-bold text-xl mb-2">{PlaylistInfo?.name}</h1>
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
          <div className="text-xs text-[#535151] dark:text-[#9e9c9c] flex gap-1">
            <p className="roboto-medium">Playlist</p>•
            <p className="roboto-medium">No videos</p>
          </div>
          <div className="text-xs mt-3">
            <p className="roboto-medium ">Description:</p>
            <p className="roboto-medium text-[#535151] dark:text-[#eeecec]">
              {PlaylistInfo?.description}
            </p>
          </div>
        </div>
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
              videos={callGetYourVideosData?.getYourVideosData?.data}
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
              id={PlaylistInfo?._id}
              itemName={PlaylistInfo?.name}
            />
          </div>
        </div>
        <div className="mt-5">No videos in this playlist yet </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    callCurrentUserData: state.getCurrentUserData,
    callGetYourVideosData: state.getYourVideosData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callAddVideoToPlaylist: (data) => dispatch(addVideoToPlaylist(data)),
    callGetYourVideos: () => dispatch(getYourVideos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmptyPlaylist);
