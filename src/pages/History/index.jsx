import React from "react";
import HistoryComponent from "./HistoryPage";
import Img from "../../assets/thumbnails/3.jpg";
import channel from "../../assets/thumbnails/channel.jpg";
import sample from "../../assets/video/sample.mp4";
const sampleHistory = [
  {
    type: "video",
    title:
      "Ravi Basrur, Anirudh Ravichander, Santhosh Narayanan, and more Updated today",
    thumbnail: Img,
    channel: "T-Series",
    views: "1.2M views",
    date: "2024-12-23",
    channel_dp: channel,
    videoSource: sample,
  },
  {
    type: "video",
    title:
      "Ravi Basrur, Anirudh Ravichander, Santhosh Narayanan, and more Updated today",
    thumbnail: Img,
    channel: "T-Series",
    views: "1.2M views",
    date: "2024-12-23",
    channel_dp: channel,
    videoSource: sample,
  },

  {
    type: "video",
    title: "Another Video Title",
    thumbnail: Img,
    channel: "Channel Name",
    views: "2.1M views",
    date: "2024-12-24",
    videoSource: sample,
  },
  {
    type: "video",
    title: "Another Video Title",
    thumbnail: Img,
    channel: "Channel Name",
    views: "2.1M views",
    date: "2024-10-25",
    videoSource: sample,
  },
  {
    type: "video",
    title: "Another Video Title",
    thumbnail: Img,
    channel: "Channel Name",
    views: "2.1M views",
    date: "2024-10-25",
    videoSource: sample,
  },
  {
    type: "video",
    title: "Another Video Title",
    thumbnail: Img,
    channel: "Channel Name",
    views: "2.1M views",
    date: "2024-10-25",
    videoSource: sample,
  },
  {
    type: "video",
    title: "Another Video Title",
    thumbnail: Img,
    channel: "Channel Name",
    views: "2.1M views",
    date: "2024-1-25",
    videoSource: sample,
  },

  {
    type: "video",
    title: "Another Video Title",
    thumbnail: Img,
    channel: "Channel Name",
    date: "2024-12-2",
    time: "1 week ago",
  },
  {
    type: "video",
    title: "Another Video Title",
    thumbnail: Img,
    channel: "Channel Name",
    views: "2.1M views",
    date: "2024-12-25",
  },
];

const HistoryPage = () => {
  return (
    <>
      <HistoryComponent history={sampleHistory} />
    </>
  );
};

export default HistoryPage;
