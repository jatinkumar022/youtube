import React, { useEffect } from "react";
import VideoComponent from "./VideoComponent";
import channel from "../../assets/thumbnails/channel.jpg";

import { useParams } from "react-router";

const VideoPage = (props) => {
  const { videoId } = useParams();

  return <VideoComponent videoId={videoId} />;
};

export default VideoPage;
