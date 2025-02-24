import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { IoMdPlay } from "react-icons/io";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { getUserPlaylists } from "../../../redux/slice/playlist/getUserPlaylists";
import { defaultPlaylist } from "../../../assets";
import { getCurrentUser } from "../../../redux/slice/users/getCurrentUserSlice";
import { addVideoToPlaylist } from "../../../redux/slice/playlist/addVideoToPlaylistSlice";
import useMessage from "../../../utils/useMessage";

const PlaylistSelectModal = ({
  isVisible,
  closeModal,
  callAddVideoToPlaylist,
  callCurrentUserData,
  callGetUserPlaylists,
  callGetCurrentUser,
  callGetUserPlaylistsData,
  videoId,
}) => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const navigate = useNavigate();
  const playlists = callGetUserPlaylistsData?.getUserPlaylistsData?.data;
  const { showMessage } = useMessage();

  // Handle playlist card click to set selected playlist ID
  const handleSelectPlaylist = (id) => {
    setSelectedPlaylistId(id);
  };

  // Handle "Okay" button click to return selected playlist ID
  useEffect(() => {
    try {
      const getCurrentUser = async () => {
        try {
          await callGetCurrentUser;
        } catch (error) {
          showMessage("error", error.message);
        }
      };
      getCurrentUser;
      if (callCurrentUserData?.getCurrentUserData?.user?._id) {
        const getPlaylists = async () => {
          const response = await callGetUserPlaylists(
            callCurrentUserData?.getCurrentUserData?.user?._id
          );
        };
        getPlaylists();
      }
    } catch (error) {
      showMessage("error", error.message);
    }
  }, []);

  const handleOk = async () => {
    if (selectedPlaylistId) {
      try {
        if (callCurrentUserData?.getCurrentUserData?.user?._id) {
          const response = await callAddVideoToPlaylist({
            videoId,
            playlistId: selectedPlaylistId,
          });
          if (response.type === "addVideoToPlaylist/fulfilled") {
            showMessage("success", "Video added to Playlist");
          }
        }
      } catch (error) {
        showMessage("error", error.message);
      }
      closeModal();
    } else {
      showMessage("error", "Please select a playlist.");
    }
  };
  return (
    <Modal
      title="Select Playlist"
      visible={isVisible}
      onCancel={closeModal}
      onOk={handleOk}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={handleOk}
          disabled={!selectedPlaylistId}
        >
          Okay
        </Button>,
      ]}
      centered
      width={800} // Set a fixed width for the modal
      bodyStyle={{
        maxHeight: "70vh", // Ensure the modal body is not too tall
        overflowY: "auto", // Enable scrolling inside the modal
        padding: "20px", // Add padding for better spacing
      }}
      className="dark:bg-gray-800 dark:text-white"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists?.map((playlist) => (
          <div
            key={playlist?._id}
            className={`card border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              selectedPlaylistId === playlist?._id
                ? "border-4 border-blue-500"
                : ""
            }`}
            onClick={() => handleSelectPlaylist(playlist?._id)}
          >
            <div className="relative pb-[56.25%]">
              {playlist.videos?.length > 0 ? (
                <img
                  alt={playlist?.name}
                  src={playlist?.videos[0]?.thumbnail}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
              ) : (
                <img
                  alt="Default Playlist"
                  src={defaultPlaylist} // Replace with your default image
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
              )}
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center rounded-lg">
              <div className="text-white text-sm gap-2 items-center hidden group-hover:flex transition duration-300">
                <IoMdPlay size={18} />
                Play all
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold dark:text-white line-clamp-2">
                {playlist?.name}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {playlist?.videos?.length > 0
                  ? playlist?.videos
                      .map((video) => video?.owner?.fullName)
                      .filter(Boolean) // Remove undefined/null values
                      .join(", ")
                  : "No Videos"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 line-clamp-1">
                {playlist?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    callCurrentUserData: state.getCurrentUserData,
    callGetUserPlaylistsData: state.getUserPlaylistsData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callGetUserPlaylists: (userId) => dispatch(getUserPlaylists(userId)),
    callGetCurrentUser: () => dispatch(getCurrentUser()),
    callAddVideoToPlaylist: (data) => dispatch(addVideoToPlaylist(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistSelectModal);
