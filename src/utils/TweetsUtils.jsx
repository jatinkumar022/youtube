import React, { useEffect, useRef, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RxCross2, RxDotsHorizontal } from "react-icons/rx";
import { RiChat3Line, RiSendPlane2Line } from "react-icons/ri";
import { timeAgo } from "./timeAgo";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button, Form, Input, Popconfirm, Popover } from "antd";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router";
import useMessage from "./useMessage";

export const TweetCard = (props) => {
  const {
    tweet,
    callCurrentUserData,
    callAddComment,
    callGetComments,
    callUpdateComment,
    callDeleteComment,
    callDeleteTweet,
    callUpdateTweet,
    editTweetForm,
    callIsLikedTweet,
    callLikeTweet,
    handleGetTweets,
  } = props;
  const [newComment, setNewComment] = useState();
  const [comments, setComments] = useState();
  const [editedCommentText, setEditedCommentText] = useState();
  const [editingCommentId, setEditingCommentId] = useState();
  const [activeTweetId, setActiveTweetId] = useState(null); // Track the active comment section
  const commentSectionRef = useRef(null);
  const [isEditing, setIsEditing] = useState();
  const { showMessage } = useMessage();
  const [likes, setLikes] = useState({
    likeCount: 0,
    userLiked: false,
  });
  useEffect(() => {
    try {
      const handleGetComments = async () => {
        const response = await callGetComments(tweet?._id);
        setComments(response?.payload?.data?.comments);
      };
      handleGetComments();
    } catch (error) {
      showMessage("error", error.message, 2);
    }
  }, []);

  const handleAddComment = async () => {
    try {
      const data = {
        videoId: tweet?._id,
        content: newComment,
      };
      if (newComment !== "") {
        const response = await callAddComment(data);
        const getComments = await callGetComments(tweet?._id);
        setComments(getComments?.payload?.data?.comments);
        setNewComment("");
      }
    } catch (error) {
      showMessage("error", error.message, 2);
    }
  };
  const handleClickOutside = (event) => {
    if (
      commentSectionRef.current &&
      !commentSectionRef.current.contains(event.target)
    ) {
      setActiveTweetId(null); // Close the comment section
    }
  };

  useEffect(() => {
    if (activeTweetId === tweet?._id) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeTweetId, tweet?._id]);

  const toggleIsEditing = (commentId, commentContent) => {
    setEditingCommentId(commentId); // Set the comment being edited
    setEditedCommentText(commentContent); // Set the current comment content in the text area
  };

  const handleEditComment = async (commentId) => {
    const updatedComment = {
      commentId,
      content: editedCommentText,
    };
    try {
      await callUpdateComment(updatedComment);
      // After updating, you can refresh the comments
      const getComments = await callGetComments(tweet?._id);
      setComments(getComments?.payload?.data?.comments);
      setEditingCommentId(null); // Reset the editing state
    } catch (error) {
      showMessage("error", error.message, 2);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await callDeleteComment(commentId);
      // After deleting, you can refresh the comments
      const getComments = await callGetComments(tweet?._id);
      setComments(getComments?.payload?.data?.comments);
      setEditingCommentId(null); // Reset the editing state
    } catch (error) {
      showMessage("error", error.message, 2);
    }
  };
  //Tweets

  const onFinish = (values) => {
    handleUpdateTweet({ tweetId: tweet._id, ...values });
    setIsEditing(false);
  };

  // likes

  const toggleLike = async () => {
    await callLikeTweet(tweet._id);
    const response = await callIsLikedTweet(tweet?._id);
    const { likeCount, userLiked } = response?.payload?.data;
    setLikes({ likeCount, userLiked });
  };

  useEffect(() => {
    const getLikeStatus = async () => {
      const response = await callIsLikedTweet(tweet?._id);
      const { likeCount, userLiked } = response?.payload?.data;
      setLikes({ likeCount, userLiked });
    };
    getLikeStatus();
  }, []);

  const handleDeleteTweet = async (tweetId) => {
    try {
      const response = await callDeleteTweet(tweetId);

      if (response?.type === "deleteTweet/fulfilled") {
        showMessage("error", "Tweet deleted", 2);
        handleGetTweets();
      }
    } catch (error) {
      showMessage("error", error.message, 2);
    }
  };

  const handleUpdateTweet = async (updatedTweet) => {
    try {
      const response = await callUpdateTweet(updatedTweet);
      if (response?.type === "updateTweet/fulfilled") {
        showMessage("success", "Tweet Updated Successfully", 2);
      }
      handleGetTweets();
    } catch (error) {
      showMessage("error", error.message, 2);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md max-w-xl mx-auto my-4 relative w-full">
      {/* Tweet Header */}
      <Link
        to={`/channel/${tweet?.owner?.username}`}
        className="flex items-center gap-4 mb-4"
      >
        <img
          src={tweet?.owner?.avatar}
          alt={`${tweet?.owner?.username}'s avatar`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {tweet?.owner?.fullName}
          </h1>
          <h2 className="text-sm text-gray-600 dark:text-gray-400">
            @{tweet?.owner?.username}
          </h2>
        </div>
      </Link>

      {/* Tweet Content */}
      {isEditing ? (
        <div className="flex gap-2">
          <Form
            form={editTweetForm}
            layout="inline"
            onFinish={onFinish}
            initialValues={{ content: tweet.content }}
          >
            <Form.Item
              name="content"
              rules={[
                { required: true, message: "Tweet content is required!" },
              ]}
            >
              <Input className="text-gray-800 dark:text-gray-300 bg-transparent w-full h-9 border rounded-xl p-2 mb-3" />
            </Form.Item>

            <Form.Item>
              <Button
                type="default"
                icon={<RxCross2 />}
                onClick={() => setIsEditing(false)}
                className="rabsolute rounded-full h-9 dark:text-white text-lg bg-[#e7e7e7] dark:bg-[#444444] p-2 pl-2.5"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<RiSendPlane2Line />}
                className="rabsolute rounded-full h-9 dark:text-white text-lg bg-[#e7e7e7] dark:bg-[#444444] p-2 pl-2.5"
              />
            </Form.Item>
          </Form>
        </div>
      ) : (
        <p className="text-gray-800 dark:text-gray-300 mb-4">
          {tweet?.content}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-2 ${
              likes?.userLiked ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            {likes?.userLiked ? (
              <FaHeart size={18} />
            ) : (
              <FaRegHeart size={18} />
            )}
            <p className="text-sm">{likes?.likeCount}</p>
          </button>
          <button
            onClick={() =>
              setActiveTweetId(activeTweetId === tweet._id ? null : tweet._id)
            }
            className="flex items-center gap-2 hover:text-blue-500"
          >
            <RiChat3Line size={18} />
            <span className="text-sm">Comment</span>
          </button>
          {tweet?.owner?._id ===
          callCurrentUserData?.getCurrentUserData?.user?._id ? (
            <Popover
              trigger="click"
              placement="bottom"
              content={
                <>
                  <div className="w-full p-3 flex flex-col gap-2 cursor-pointer text-[#575757] dark:text-[#b6b5b5]">
                    <li
                      className="flex gap-3 items-center "
                      onClick={() => setIsEditing(true)}
                    >
                      <HiOutlinePencilSquare size={18} />

                      <p className="mt-0.5">Edit</p>
                    </li>

                    <Popconfirm
                      trigger="click"
                      title="Delete the Comment"
                      description="Are you sure to delete this Comment?"
                      placement="bottom"
                      onConfirm={() => handleDeleteTweet(tweet._id)}
                    >
                      <li className="flex gap-3 items-center ">
                        <MdDeleteOutline size={18} />
                        <p className="mt-0.5">Delete</p>
                      </li>
                    </Popconfirm>
                  </div>
                </>
              }
            >
              <button className="hover:text-gray-700 dark:hover:text-gray-300">
                <RxDotsHorizontal size={18} />
              </button>
            </Popover>
          ) : (
            <></>
          )}
        </div>
        <p className="text-xs roboto-regular">{timeAgo(tweet?.createdAt)}</p>
      </div>
      {/* Comment Section */}
      {activeTweetId === tweet?._id && (
        <div className="mt-4 space-y-4" ref={commentSectionRef}>
          {comments.map((comment, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex">
                <img
                  src={comment?.owner?.avatar}
                  alt={`${comment?.owner?.username}'s avatar`}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              {editingCommentId === comment?._id ? (
                <div className="flex gap-3 mt-4">
                  <textarea
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-[#242424]"
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                  />
                  <button
                    onClick={() => handleEditComment(comment?._id)}
                    className="text-blue-500 ml-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="text-red-500 ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex-1">
                  {comment?.owner?._id ===
                  callCurrentUserData?.getCurrentUserData?.user?._id ? (
                    <div className="flex items-center gap-1">
                      <p className="roboto-medium bg-[#e6e4e4] rounded-full p-0.5 px-3 w-fit text-black mb-1 text-sm">
                        @{comment?.owner?.username}
                      </p>
                      <p className="roboto-medium text-xs">- You</p>
                    </div>
                  ) : (
                    <p className="roboto-medium text-sm">
                      @{comment?.owner?.username}
                    </p>
                  )}
                  <pre className="roboto-regular text-sm text-[#242424] dark:text-[#f0eded]">
                    {comment?.content}
                  </pre>
                </div>
              )}

              {comment?.owner?._id ===
              callCurrentUserData?.getCurrentUserData?.user?._id ? (
                <Popover
                  trigger="click"
                  placement="bottom"
                  ref={commentSectionRef}
                  content={
                    <>
                      <div className="w-full p-3 flex flex-col gap-2 cursor-pointer text-[#575757] dark:text-[#b6b5b5]">
                        <li
                          className="flex gap-3 items-center "
                          onClick={() =>
                            toggleIsEditing(comment?._id, comment?.content)
                          }
                        >
                          <HiOutlinePencilSquare size={18} />

                          <p className="mt-0.5">Edit</p>
                        </li>

                        <Popconfirm
                          trigger="click"
                          title="Delete the Comment"
                          description="Are you sure to delete this Comment?"
                          placement="bottom"
                          onConfirm={() => handleDeleteComment(comment._id)}
                        >
                          <li className="flex gap-3 items-center ">
                            <MdDeleteOutline size={18} />
                            <p className="mt-0.5">Delete</p>
                          </li>
                        </Popconfirm>
                      </div>
                    </>
                  }
                >
                  <div className="h-7 w-7 hover:bg-[#424242] rounded-full flex items-center justify-center cursor-pointer">
                    <HiOutlineDotsVertical />
                  </div>
                </Popover>
              ) : (
                <></>
              )}
            </div>
          ))}
          {/* Add Comment */}
          <div className="flex gap-3 mt-4">
            <img
              src={callCurrentUserData?.getCurrentUserData?.user?.avatar}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <textarea
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none dark:bg-[#242424]"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment} className="text-blue-500 ml-2">
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const TweetFeed = (props) => {
  const {
    tweets,
    callCurrentUserData,
    callAddComment,
    callGetComments,
    callUpdateComment,
    callDeleteComment,
    handleEditTweet2,
    callIsLikedTweet,
    callLikeTweet,
    callDeleteTweet,
    callUpdateTweet,
    handleGetTweets,
  } = props;

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => {
        return (
          <TweetCard
            key={tweet._id}
            tweet={tweet}
            callCurrentUserData={callCurrentUserData}
            callDeleteTweet={callDeleteTweet}
            callAddComment={callAddComment}
            callUpdateTweet={callUpdateTweet}
            callGetComments={callGetComments}
            callUpdateComment={callUpdateComment}
            callDeleteComment={callDeleteComment}
            handleEditTweet2={handleEditTweet2}
            callIsLikedTweet={callIsLikedTweet}
            callLikeTweet={callLikeTweet}
            handleGetTweets={handleGetTweets}
          />
        );
      })}
    </div>
  );
};
