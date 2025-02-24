import React from "react";
import Container from "../../components/common/Container";
import VideoCard from "../../components/common/VideoCard";
import PlaylistCard from "../../components/common/PlaylistCard";
import { mergeVideoAndPlaylists } from "../../utils/mergeVideoAndPlaylists";
import VideosLoader from "../../components/Loaders/VideosLoader";

const HomeComponent = ({ Videos, playLists, loading }) => {
  let HomeData;
  if (Videos && playLists) {
    HomeData = mergeVideoAndPlaylists(Videos, playLists);
  } else {
    HomeData = Videos;
  }

  return (
    <Container>
      {loading
        ? // Show skeleton loaders while data is loading
          Array.from({ length: 10 }).map((_, index) => (
            <VideosLoader key={index} />
          ))
        : // Show actual data once loading is complete
          HomeData?.map((item) => (
            <>
              {item?.type === "video" ? (
                <VideoCard item={item} key={item?._id} />
              ) : (
                <>
                  {item?.videos?.length > 0 ? (
                    <PlaylistCard item={item} key={item?._id} />
                  ) : (
                    ""
                  )}
                </>
              )}
            </>
          ))}
    </Container>
  );
};

export default HomeComponent;
