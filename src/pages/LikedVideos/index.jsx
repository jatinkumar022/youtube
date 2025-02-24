import React, { useEffect, useState } from "react";
import LikedVideosPage from "./LikedVideosPage";

import { getLikedVideos } from "../../redux/slice/likes/getLikedVideosSlice";
import { connect } from "react-redux";
import PlayListLoader from "../../components/Loaders/PlaylistLoader";
import useMessage from "../../utils/useMessage";

const LikedVideos = (props) => {
  const { callLikedVideos, callLikedVideosData } = props;
  const [loading, setLoading] = useState();
  const { showMessage } = useMessage();
  useEffect(() => {
    const handleGetLikedVideos = async () => {
      try {
        setLoading(true);
        const response = await callLikedVideos();
        setLoading(false);
      } catch (error) {
        showMessage("error", error, 2);

        setLoading(false);
      }
    };
    handleGetLikedVideos();
  }, []);
  return (
    <div>
      {loading ? (
        <PlayListLoader />
      ) : (
        <LikedVideosPage
          Videos={callLikedVideosData?.getLikedVideosData?.message}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    callGetCurrentUserData: state.getCurrentUserData,
    callLikedVideosData: state.getLikedVideosData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callLikedVideos: () => dispatch(getLikedVideos()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LikedVideos);
