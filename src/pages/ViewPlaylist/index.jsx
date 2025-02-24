import React, { useEffect, useState } from "react";
import ViewPlaylistComponent from "./ViewPlaylistPage";

import EmptyPlaylist from "./EmptyPlaylist";
import { useNavigate, useParams } from "react-router";
import { connect } from "react-redux";
import { getPlaylistById } from "../../redux/slice/playlist/getPlaylistByIdSlice";
import { addVideoToPlaylist } from "../../redux/slice/playlist/addVideoToPlaylistSlice";
import { deletePlaylist } from "../../redux/slice/playlist/deletePlaylistSlice";
import PlayListLoader from "../../components/Loaders/PlaylistLoader";
import useMessage from "../../utils/useMessage";

const ViewPlaylistPage = (props) => {
  const {
    callGetPlaylistById,
    callGetPlaylistByIdData,
    callAddVideoToPlaylist,
    callDeletePlaylist,
  } = props;
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [loading, setLoading] = useState();
  const { showMessage } = useMessage();
  useEffect(() => {
    const getPlaylistInfo = async () => {
      try {
        if (playlistId) {
          setLoading(true);
          const response = await callGetPlaylistById(playlistId);
          setLoading(false);
        }
      } catch (error) {
        showMessage("error", error.message, 2);

        setLoading(false);
      }
    };
    getPlaylistInfo();
  }, []);

  const getPlaylistInfo = async () => {
    try {
      if (playlistId) {
        const response = await callGetPlaylistById(playlistId);
      }
    } catch (error) {}
  };
  const handleEditOk = async () => {
    try {
      if (playlistId) {
        const response = await callGetPlaylistById(playlistId);
      }
    } catch (error) {}
  };

  // delete Playlist
  const openDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };
  const handleDelete = async (id) => {
    try {
      const response = await callDeletePlaylist(id);
      if (response.type === "deletePlaylist/fulfilled") {
        showMessage("error", "Playlist Deleted");
        await getPlaylistInfo();
      }
      navigate(-1);
    } catch (error) {
      showMessage("error", error.message, 2);
    }
    closeDeleteModal();
  };

  // Add Video to playlist
  const handleSelectVideo = async (videoId) => {
    const data = {
      videoId,
      playlistId,
    };
    setLoading(true);

    const response = await callAddVideoToPlaylist(data);

    if (response.type === "addVideoToPlaylist/fulfilled") {
      showMessage("success", "Video added to Playlist");
      await getPlaylistInfo();
    }
    setLoading(false);
  };

  // remove

  return (
    <>
      {callGetPlaylistByIdData?.getPlaylistByIdData?.data?.videos?.length >
      0 ? (
        loading ? (
          <PlayListLoader />
        ) : (
          <ViewPlaylistComponent
            PlaylistInfo={callGetPlaylistByIdData?.getPlaylistByIdData?.data}
            handleDelete={handleDelete}
            handleSelectVideo={handleSelectVideo}
            isDeleteModalVisible={isDeleteModalVisible}
            closeDeleteModal={closeDeleteModal}
            openDeleteModal={openDeleteModal}
            handleEditOk={handleEditOk}
            getPlaylistInfo={getPlaylistInfo}
          />
        )
      ) : (
        <EmptyPlaylist
          PlaylistInfo={callGetPlaylistByIdData?.getPlaylistByIdData?.data}
          handleDelete={handleDelete}
          handleSelectVideo={handleSelectVideo}
          isDeleteModalVisible={isDeleteModalVisible}
          closeDeleteModal={closeDeleteModal}
          openDeleteModal={openDeleteModal}
          handleEditOk={handleEditOk}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    callCurrentUserData: state.getCurrentUserData,
    callGetPlaylistByIdData: state.getPlaylistByIdData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callGetPlaylistById: (playlistId) => dispatch(getPlaylistById(playlistId)),
    callAddVideoToPlaylist: (data) => dispatch(addVideoToPlaylist(data)),
    callDeletePlaylist: (playlistId) => dispatch(deletePlaylist(playlistId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPlaylistPage);
