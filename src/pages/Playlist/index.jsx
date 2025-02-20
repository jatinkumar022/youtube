import React, { useEffect, useState } from "react";
import PlaylistComponent from "./PlaylistPage";
import PlaylistImg from "../../assets/thumbnails/1.jpg";
import { connect } from "react-redux";
import { getUserPlaylists } from "../../redux/slice/playlist/getUserPlaylists";
import VideosLoader from "../../components/Loaders/VideosLoader";
import Container from "../../components/common/Container";

const PlaylistPage = (props) => {
  const {
    callCurrentUserData,
    callGetUserPlaylists,
    callGetUserPlaylistsData,
  } = props;
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    try {
      if (callCurrentUserData?.getCurrentUserData?.user?._id) {
        setLoading(true);

        const getPlaylists = async () => {
          const response = await callGetUserPlaylists(
            callCurrentUserData?.getCurrentUserData?.user?._id
          );
        };
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
      callCurrentUserData?.getCurrentUserData?.user?._id
    );
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Container>
          {Array.from({ length: 10 }).map((_, index) => (
            <VideosLoader />
          ))}
        </Container>
      ) : (
        <PlaylistComponent
          playlist={callGetUserPlaylistsData?.getUserPlaylistsData?.data}
          getPlaylists={getPlaylists}
        />
      )}
    </>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
