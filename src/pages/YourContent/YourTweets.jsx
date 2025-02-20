import React, { useState } from "react";
import { format, isToday, isYesterday, compareDesc } from "date-fns"; // Added compareDesc for date sorting

import { TweetCard } from "../../utils/TweetsUtilsUser";
import TextArea from "antd/es/input/TextArea";
import { Form, Tooltip } from "antd";
import { BiSend } from "react-icons/bi";
import { connect } from "react-redux";
import { addComment } from "../../redux/slice/comments/addCommentSlice";
import { getComments } from "../../redux/slice/comments/getCommentsSlice";
import { updateComment } from "../../redux/slice/comments/updateCommentSlice";
import { deleteComment } from "../../redux/slice/comments/deleteCommentSlice";
import { deleteTweet } from "../../redux/slice/tweets/deleteTweetSlice";

const TweetComponent = (props) => {
  const {
    Tweet,
    callCurrentUserData,
    saveChanges,
    tweetForm,
    getUserTweets,
    callAddComment,
    callGetComments,
    callUpdateComment,
    callDeleteComment,
    editTweetForm,
    callUpdateTweet,
    callDeleteTweet,
    callGetTweetsData,
    callIsLikedTweet,
    callLikeTweet,
  } = props;
  const separateDateAndTime = (isoString) => {
    const [date, time] = isoString.split("T");
    return { date, time: time.split(".")[0] };
  };

  const groupByDate = (items) => {
    const grouped = items?.reduce((acc, item) => {
      const dateKey = format(
        new Date(separateDateAndTime(item.createdAt).date),
        "yyyy-MM-dd"
      );
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(item);

      return acc;
    }, {});

    return grouped;
  };

  // Render the grouped Tweet
  const renderGroupedTweet = (groupedTweet) => {
    // Sort dates: Today first, then Yesterday, then descending
    const sortedDates = Object.keys(groupedTweet).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);

      if (isToday(dateA)) return -1;
      if (isToday(dateB)) return 1;

      if (isYesterday(dateA)) return -1;
      if (isYesterday(dateB)) return 1;

      return compareDesc(dateA, dateB); // Descending order for other dates
    });

    return sortedDates.map((date) => {
      let title;
      const itemDate = new Date(date);
      if (isToday(itemDate)) title = "Today";
      else if (isYesterday(itemDate)) title = "Yesterday";
      else title = format(itemDate, "MMMM d, yyyy");

      return (
        <div key={date} className="mb-6 ">
          {/* Date Header */}
          <h2 className="text-lg  font-semibold text-gray-700 dark:text-gray-200 mb-4">
            {title}
          </h2>
          {/* Cards for the Date */}
          <div className="grid gap-4 ">
            {groupedTweet[date].map((tweet) => (
              <TweetCard
                key={tweet._id}
                tweet={tweet}
                callCurrentUserData={callCurrentUserData}
                callAddComment={callAddComment}
                callGetComments={callGetComments}
                editTweetForm={editTweetForm}
                callUpdateComment={callUpdateComment}
                callDeleteComment={callDeleteComment}
                callUpdateTweet={callUpdateTweet}
                callDeleteTweet={callDeleteTweet}
                callGetTweetsData={callGetTweetsData}
                getUserTweets={getUserTweets}
                callIsLikedTweet={callIsLikedTweet}
                callLikeTweet={callLikeTweet}
              />
            ))}
          </div>
        </div>
      );
    });
  };
  const groupedTweet = groupByDate(Tweet);
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-lg  font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Create a new Tweet
      </h1>

      <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md max-w-xl mx-auto my-4 relative">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={callCurrentUserData?.getCurrentUserData?.user?.avatar}
            alt={`${callCurrentUserData?.getCurrentUserData?.user?.username}'s avatar`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {callCurrentUserData?.getCurrentUserData?.user?.fullName}
            </h1>
            <h2 className="text-sm text-gray-600 dark:text-gray-400">
              @{callCurrentUserData?.getCurrentUserData?.user?.username}
            </h2>
          </div>
        </div>

        <p className="text-gray-800 dark:text-gray-300 mb-4 relative">
          <Form
            name="basic"
            onFinish={saveChanges}
            autoComplete="off"
            form={tweetForm}
          >
            <Form.Item
              name="content"
              rules={[
                {
                  required: true,
                  message: "Please type something!",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="What's  in your mind today!"
                maxLength={255}
                className="dark:bg-[#242323] dark:text-white dark:placeholder:text-[#aaa]  roboto-regular"
              />
            </Form.Item>
            <Tooltip title="Send">
              <button className="absolute bottom-4 right-2 rounded-full dark:text-white text-lg bg-[#e7e7e7] dark:bg-[#444444] p-3">
                <BiSend />
              </button>
            </Tooltip>
          </Form>
        </p>
      </div>
      {Object.keys(groupedTweet).length > 0 ? (
        renderGroupedTweet(groupedTweet)
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No Tweet available.</p>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    callCurrentUserData: state.getCurrentUserData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callDeleteTweet: (data) => dispatch(deleteTweet(data)),
    callAddComment: (comment) => dispatch(addComment(comment)),
    callGetComments: (tweetId) => dispatch(getComments(tweetId)),
    callUpdateComment: (comment) => dispatch(updateComment(comment)),
    callDeleteComment: (commentId) => dispatch(deleteComment(commentId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TweetComponent);
