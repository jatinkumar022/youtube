import React from "react";
import channel from "../../assets/thumbnails/channel.jpg";
import sample from "../../assets/video/sample.mp4";
import Img from "../../assets/thumbnails/3.jpg"; // Video thumbnail
import PlaylistImg from "../../assets/thumbnails/1.jpg";
import WatchLaterComponent from "./WatchLaterPage";
const items = [
  {
    type: "video",
    title:
      "Ravi Basrur, Anirudh Ravichander, Santhosh Narayanan, and more Updated today",
    thumbnail: Img,
    channel: "T-Series",
    views: "1.2M views",
    time: "2 days ago",
    channel_dp: channel,
    videoSource: sample,
  },

  {
    type: "video",
    title: "Another Video Title",
    thumbnail: Img,
    channel: "Channel Name",
    views: "2.1M views",
    time: "1 week ago",
    videoSource: sample,
  },
  {
    type: "video",
    title: "Another Video Title",
    thumbnail: Img,
    channel: "Channel Name",
    views: "2.1M views",
    time: "1 week ago",
    videoSource: sample,
  },
  {
    type: "video",
    title: "Another Video Title",
    thumbnail: Img,
    channel: "Channel Name",
    views: "2.1M views",
    time: "1 week ago",
    videoSource: sample,
  },

  {
    type: "video",
    title: "Another Video Title",
    thumbnail: Img,
    channel: "Channel Name",
    views: "2.1M views",
    time: "1 week ago",
  },
  {
    type: "video",
    title: "Another Video Title",
    thumbnail: Img,
    channel: "Channel Name",
    views: "2.1M views",
    time: "1 week ago",
  },
];

const playlist = [
  {
    type: "Watch Later",
    title: "Mix - Music of aura",
    thumbnail: PlaylistImg,
    videoCount: 50,
    videoChannelNames: [
      "T-Series",
      "Mr.Beast",
      "Technical Guruji",
      "Jatin Ramani",
    ],
  },
];
const WatchLaterPage = () => {
  return (
    <>
      <WatchLaterComponent items={items} playlist={playlist} />
    </>
  );
};

export default WatchLaterPage;
