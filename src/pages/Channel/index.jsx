import React, { useEffect, useState } from "react";

import ChannelComponent from "./ChannelPage";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { getChannel } from "../../redux/slice/users/getChannelSlice";
import { getChannelVideos } from "../../redux/slice/videos/getChannelVideosSlice";
import { toggleSubscribe } from "../../redux/slice/subscription/toggleSubscribeSlice";
import { getUserPlaylists } from "../../redux/slice/playlist/getUserPlaylists";
import ChannelLoader from "../../components/Loaders/ChannelLoader";
import useMessage from "../../utils/useMessage";

const ChannelPage = (props) => {
  const { username } = useParams();
  const { showMessage } = useMessage();
  const {
    callGetChannel,
    callGetChannelData,
    callGetChannelVideos,
    callGetChannelVideosData,
    callToggleSubscribe,
    callGetUserPlaylists,
    callGetUserPlaylistsData,
  } = props;
  const [latestVideos, setLatestVideos] = useState([]);
  const [mostViewedVideos, setMostViewedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      setLoading(true);
      const getChannelInfo = async () => {
        const response = await callGetChannel(username);
      };
      const getChannelPlaylists = async () => {
        const response = await callGetUserPlaylists(
          callGetChannelData?.getChannelData?.data?._id
        );
      };
      getChannelPlaylists();
      getChannelInfo();
      setLoading(false);
    } catch (error) {
      showMessage("error", error.message, 2);
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    const handleGetVideos = async () => {
      setLoading(true);

      try {
        const response = await callGetChannelVideos(
          callGetChannelData?.getChannelData?.data?._id
        );
        const videos = response?.payload?.data?.videos || [];
        const copiedVideos = [...videos];
        const sortedLatestVideos = copiedVideos
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5); // Get the last 5 videos

        const sortedMostViewedVideos = copiedVideos
          .slice()
          .sort((a, b) => b.views - a.views)
          .slice(0, 10); // Limit to the top 10 most viewed videos

        setLatestVideos(sortedLatestVideos);

        setMostViewedVideos(sortedMostViewedVideos);
        setLoading(false);
      } catch (error) {
        showMessage("error", error.message, 2);

        setLoading(false);
      }
    };

    if (callGetChannelData?.getChannelData?.data?._id) {
      handleGetVideos();
    }
  }, []);

  const handleSubscribe = async (userId) => {
    try {
      const response = await callToggleSubscribe(userId);

      callGetChannel(username);
    } catch (error) {}
  };
  return loading ? (
    <ChannelLoader />
  ) : (
    <ChannelComponent
      playlistItem={callGetUserPlaylistsData?.getUserPlaylistsData?.data}
      channelData={callGetChannelData?.getChannelData?.data}
      Video={callGetChannelVideosData?.getChannelVideosData?.data?.videos}
      latestVideos={latestVideos}
      mostViewedVideos={mostViewedVideos}
      handleSubscribe={handleSubscribe}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    callGetChannelData: state.getChannelData,
    callGetChannelVideosData: state.getChannelVideosData,
    callGetUserPlaylistsData: state.getUserPlaylistsData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetChannel: (username) => dispatch(getChannel(username)),
    callGetChannelVideos: (channelId) => dispatch(getChannelVideos(channelId)),
    callToggleSubscribe: (userId) => dispatch(toggleSubscribe(userId)),
    callGetUserPlaylists: (userId) => dispatch(getUserPlaylists(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);
