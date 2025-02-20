import React, { useEffect, useState } from "react";
import Img from "../../assets/thumbnails/3.jpg"; // Video thumbnail
import channel from "../../assets/thumbnails/channel.jpg";
import sample from "../../assets/video/sample.mp4";
import UserComponent from "./UserPage";
import PlaylistImg from "../../assets/thumbnails/1.jpg"; // Playlist thumbnail
import { useNavigate } from "react-router";
import { logout } from "../../redux/slice/users/logoutSlice";
import { getCurrentUser } from "../../redux/slice/users/getCurrentUserSlice";
import { connect } from "react-redux";
import { getLikedVideos } from "../../redux/slice/likes/getLikedVideosSlice";
import { getUserPlaylists } from "../../redux/slice/playlist/getUserPlaylists";
import UserLoader from "../../components/Loaders/UserLoader";

const UserPage = (props) => {
  const {
    callLogout,
    callLikedVideosData,
    callLikedVideos,
    callGetUserPlaylists,
    callGetUserPlaylistsData,
    callGetCurrentUserData,
  } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      const response = await callLogout();
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

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
      console.log(error);
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
    />
  );
};

const mapStateToProps = (state) => {
  return {
    callLogoutData: state.logoutData,
    callGetCurrentUserData: state.getCurrentUserData,
    callLikedVideosData: state.getLikedVideosData,
    callGetUserPlaylistsData: state.getUserPlaylistsData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callLogout: () => dispatch(logout()),
    callLikedVideos: () => dispatch(getLikedVideos()),
    callGetUserPlaylists: (userId) => dispatch(getUserPlaylists(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
