import React, { useEffect, useState } from "react";
import UserComponent from "./UserPage";
import { useNavigate } from "react-router";
import { logout } from "../../redux/slice/users/logoutSlice";
import { connect } from "react-redux";
import { getLikedVideos } from "../../redux/slice/likes/getLikedVideosSlice";
import { getUserPlaylists } from "../../redux/slice/playlist/getUserPlaylists";
import UserLoader from "../../components/Loaders/UserLoader";
import useMessage from "../../utils/useMessage";
import { getWatchHistory } from "../../redux/slice/users/getWatchHistorySlice";

const UserPage = (props) => {
  const {
    callLogout,
    callLikedVideosData,
    callLikedVideos,
    callGetUserPlaylists,
    callGetUserPlaylistsData,
    callGetCurrentUserData,
    callGetWatchHistory,
    callGetWatchHistoryData,
  } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { showMessage } = useMessage();
  const handleLogout = async () => {
    try {
      const response = await callLogout();
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  // Watch history
  useEffect(() => {
    const getWatchHistory = async () => {
      try {
        const response = await callGetWatchHistory();
      } catch (error) {
        showMessage("error", error.message);
      }
    };
    getWatchHistory();
  }, []);

  // Playlists
  useEffect(() => {
    try {
      setLoading(true);
      if (callGetCurrentUserData?.getCurrentUserData?.user?._id) {
        const getPlaylists = async () => {
          const response = await callGetUserPlaylists(
            callGetCurrentUserData?.getCurrentUserData?.user?._id
          );
        };
        const handleGetLikedVideos = async () => {
          const response = await callLikedVideos();
        };
        handleGetLikedVideos();
        getPlaylists();
        setLoading(false);
      }
    } catch (error) {
      showMessage("error", error.message, 2);

      setLoading(false);
    }
  }, []);

  const getPlaylists = async () => {
    setLoading(true);

    const response = await callGetUserPlaylists(
      callGetCurrentUserData?.getCurrentUserData?.user?._id
    );
    setLoading(false);
  };

  return loading ? (
    <UserLoader />
  ) : (
    <UserComponent
      playlist={callGetUserPlaylistsData?.getUserPlaylistsData?.data}
      handleLogout={handleLogout}
      user={callGetCurrentUserData.getCurrentUserData.user}
      LikedVideos={callLikedVideosData?.getLikedVideosData?.message}
      getPlaylists={getPlaylists}
      watchHistory={callGetWatchHistoryData?.getWatchHistoryData?.data}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    callLogoutData: state.logoutData,
    callGetCurrentUserData: state.getCurrentUserData,
    callLikedVideosData: state.getLikedVideosData,
    callGetUserPlaylistsData: state.getUserPlaylistsData,
    callGetWatchHistoryData: state.getWatchHistoryData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callLogout: () => dispatch(logout()),
    callLikedVideos: () => dispatch(getLikedVideos()),
    callGetUserPlaylists: (userId) => dispatch(getUserPlaylists(userId)),
    callGetWatchHistory: () => dispatch(getWatchHistory()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
