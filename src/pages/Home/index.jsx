import React, { useEffect, useState } from "react";
import HomeComponent from "./Homepage";
import { getAllVideos } from "../../redux/slice/videos/getAllVideoSlice";
import { connect } from "react-redux";
import { getChannelPlaylists } from "../../redux/slice/playlist/getChannelPlaylistsSlice";

const Homepage = (props) => {
  const {
    callGetAllVideosData,
    callGetAllVideos,
    callGetChannelPlaylists,
    callGetChannelPlaylistsData,
  } = props;
  const [loading, setLoading] = useState(true); // Add loading state

  const VideosData = callGetAllVideosData?.getAllVideosData?.data?.videos;

  const updatedVideo = VideosData?.map((video) => {
    return Object.assign({}, video, { type: "video" });
  });

  useEffect(() => {
    const handleGetAllVideos = async () => {
      try {
        setLoading(true);
        const response = await callGetAllVideos();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    handleGetAllVideos();
  }, []);

  useEffect(() => {
    const handleGetChannelPlaylists = async () => {
      try {
        setLoading(true);
        const response = await callGetChannelPlaylists();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    handleGetChannelPlaylists();
  }, []);

  return (
    <>
      <HomeComponent
        Videos={updatedVideo}
        playLists={callGetChannelPlaylistsData?.getChannelPlaylistsData?.data}
        loading={loading}
      />
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
