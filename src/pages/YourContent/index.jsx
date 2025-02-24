import React, { useEffect } from "react";

import { Dropdown, Form, Menu } from "antd";
import { CheckOutlined, DownOutlined } from "@ant-design/icons";

import { useState } from "react";
import { useSearchParams } from "react-router";
import VideoComponent from "./YourVideos";
import TweetComponent from "./YourTweets";
import { connect } from "react-redux";
import { uploadTweet } from "../../redux/slice/tweets/uploadTweetSlice";
import { getTweets } from "../../redux/slice/tweets/getTweetsSlice";
import { deleteTweet } from "../../redux/slice/tweets/deleteTweetSlice";
import { updateTweet } from "../../redux/slice/tweets/updateTweetSlice";
import { getYourVideos } from "../../redux/slice/dashboard/GetYourVideosSlice";
import { isLikedTweet } from "../../redux/slice/likes/isLikedTweetSlice";
import { likeTweet } from "../../redux/slice/likes/likeTweetSlice";
import TweetpageLoader from "../../components/Loaders/TweetPageLoader";
import VideoListLoader from "../../components/Loaders/VideoListLoader";
import useMessage from "../../utils/useMessage";

const YourContent = (props) => {
  const [searchParams] = useSearchParams();
  const {
    callCurrentUserData,
    callUploadTweet,
    callGetTweets,
    callDeleteTweet,
    callUpdateTweet,
    callGetYourVideosData,
    callGetTweetsData,
    callGetYourVideos,
    callLikeTweet,
    callIsLikedTweet,
  } = props;
  const [tweetForm] = Form.useForm(); // Initialize form instance in parent
  const [tweet, setTweets] = useState([]);
  const [editTweetForm] = Form.useForm();
  const [isTweetLoading, setIsTweetLoading] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const { showMessage } = useMessage();
  const handleMenuClick = (e) => {
    setSelected(e.key);
  };
  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "videos" || type === "tweets") {
      setSelected(type);
    }
  }, [searchParams]);
  const [selected, setSelected] = useState(searchParams);

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          key: "tweets",
          label: (
            <div className="flex items-center justify-between dark:bg-[#212121] bg-[#e7e3e3] dark:hover:bg-[#323131] text-black dark:text-white p-2">
              Tweets
              {selected === "tweets" && <CheckOutlined />}
            </div>
          ),
        },
        {
          key: "videos",
          label: (
            <div className="flex items-center justify-between dark:bg-[#2c2c2c] bg-[#f2f2f2] dark:hover:bg-[#323131] text-black dark:text-white p-2">
              Videos
              {selected === "videos" && <CheckOutlined />}
            </div>
          ),
        },
      ]}
    />
  );

  // Tweets =========================

  useEffect(() => {
    const getUserTweets = async () => {
      try {
        setIsTweetLoading(true);
        if (
          callCurrentUserData.getCurrentUserData &&
          callCurrentUserData.getCurrentUserData.user._id
        ) {
          const response = await callGetTweets(
            callCurrentUserData.getCurrentUserData.user._id
          );
          setTweets(response.payload.message);
        }
        setIsTweetLoading(false);

        // const response = await
      } catch (error) {
        showMessage("error", error, 2);

        setIsTweetLoading(false);
      }
    };

    getUserTweets();
  }, [selected, callCurrentUserData, callUpdateTweet]);

  const saveChanges = (data) => {
    try {
      const handleUploadTweet = async () => {
        const response = await callUploadTweet(data);

        if (response.type == "uploadTweet/fulfilled") {
          showMessage("success", "Tweet Uploaded Successfully", 2);
          const response2 = await callGetTweets(
            callCurrentUserData.getCurrentUserData.user._id
          );
          setTweets(response2?.payload?.message);
          tweetForm.resetFields();
        }
      };
      handleUploadTweet();
    } catch (error) {
      showMessage("error", error, 2);
    }
  };

  const getUserTweets = async () => {
    try {
      if (
        callCurrentUserData.getCurrentUserData &&
        callCurrentUserData.getCurrentUserData.user._id
      ) {
        const response = await callGetTweets(
          callCurrentUserData.getCurrentUserData.user._id
        );
        setTweets(response.payload.message);
      }
      // const response = await
    } catch (error) {
      showMessage("error", error, 2);
    }
  };
  // Videos
  useEffect(() => {
    const handleGetYourVideos = async () => {
      setIsVideoLoading(true);
      try {
        const response = await callGetYourVideos();
        setIsVideoLoading(false);
      } catch (error) {
        showMessage("error", error, 2);

        setIsVideoLoading(false);
      }
    };
    handleGetYourVideos();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center p-7">
        {selected === "tweets" ? (
          <h2 className="md:text-3xl text-lg sm:text-2xl font-semibold ">
            Your Tweets
          </h2>
        ) : (
          <h2 className="md:text-3xl text-lg sm:text-2xl font-semibold">
            Your Videos
          </h2>
        )}

        <div>
          <Dropdown overlay={menu} trigger={["click"]}>
            <button
              className={`flex px-4 p-2 gap-4 rounded-md items-center justify-between bg-[#f7f3f3] dark:bg-[#272727]  dark:hover:bg-[#323131] text-black dark:text-white }`}
            >
              {selected === "tweets" ? "Tweets" : "Videos"}
              <DownOutlined className="sm:ml-2" />
            </button>
          </Dropdown>
        </div>
      </div>

      {selected === "videos" ? (
        isVideoLoading ? (
          Array.from({ length: 10 }).map((_, index) => <VideoListLoader />)
        ) : (
          <VideoComponent
            Video={callGetYourVideosData?.getYourVideosData?.data}
            currentUserData={callCurrentUserData?.getCurrentUserData?.user}
          />
        )
      ) : isTweetLoading ? (
        <>
          <div className="mb-32 mt-10">
            <TweetpageLoader />
          </div>
          {Array.from({ length: 2 }).map((_, index) => (
            <TweetpageLoader />
          ))}
        </>
      ) : (
        <TweetComponent
          Tweet={tweet}
          currentUserData={callCurrentUserData?.getCurrentUserData?.user}
          saveChanges={saveChanges}
          tweetForm={tweetForm}
          callDeleteTweet={callDeleteTweet}
          editTweetForm={editTweetForm}
          callUpdateTweet={callUpdateTweet}
          callGetTweetsData={callGetTweetsData}
          getUserTweets={getUserTweets}
          callIsLikedTweet={callIsLikedTweet}
          callLikeTweet={callLikeTweet}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    callCurrentUserData: state.getCurrentUserData,
    callGetTweetsData: state.getTweetsData,
    callGetYourVideosData: state.getYourVideosData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetTweets: (user) => dispatch(getTweets(user)),
    callUpdateTweet: (data) => dispatch(updateTweet(data)),
    callDeleteTweet: (tweet) => dispatch(deleteTweet(tweet)),
    callUploadTweet: (data) => dispatch(uploadTweet(data)),

    callGetYourVideos: (data) => dispatch(getYourVideos(data)),
    callIsLikedTweet: (tweetId) => dispatch(isLikedTweet(tweetId)),
    callLikeTweet: (tweetId) => dispatch(likeTweet(tweetId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(YourContent);
