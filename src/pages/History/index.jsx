import React, { useEffect } from "react";
import HistoryComponent from "./HistoryPage";
import { connect } from "react-redux";
import useMessage from "../../utils/useMessage";
import { getWatchHistory } from "../../redux/slice/users/getWatchHistorySlice";

const HistoryPage = (props) => {
  const { callGetWatchHistory, callGetWatchHistoryData } = props;
  const { showMessage } = useMessage();

  useEffect(() => {
    const getWatchedHistory = async () => {
      try {
        const response = await callGetWatchHistory();
      } catch (error) {
        showMessage("error", error.message);
      }
    };
    getWatchedHistory();
  }, []);

  return (
    <>
      <HistoryComponent
        history={callGetWatchHistoryData?.getWatchHistoryData?.data}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    callGetWatchHistoryData: state.getWatchHistoryData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetWatchHistory: () => dispatch(getWatchHistory()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
