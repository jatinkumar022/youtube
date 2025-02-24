import React, { useEffect, useState } from "react";
import VideoTemplate from "../../components/VideoComponents/VideoTemplate";
import PlayList from "../../components/VideoComponents/PlayList";
import Comments from "../../components/VideoComponents/Comments";
import UserComment from "../../components/VideoComponents/UserComment";
import { connect } from "react-redux";
import { getChannel } from "../../redux/slice/users/getChannelSlice";
import { addComment } from "../../redux/slice/comments/addCommentSlice";
import { getComments } from "../../redux/slice/comments/getCommentsSlice";
import { Form } from "antd";
import { updateComment } from "../../redux/slice/comments/updateCommentSlice";
import { deleteComment } from "../../redux/slice/comments/deleteCommentSlice";

import useMessage from "../../utils/useMessage";

const VideoComponent = (props) => {
  const {
    videoId,
    callCurrentUserData,
    // Comments
    callAddComment,
    callGetComments,
    callGetCommentsData,
    callUpdateComment,
    callDeleteComment,
  } = props;
  const { showMessage } = useMessage();
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1200);
  const [isEditing, setIsEditing] = useState();
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    try {
      const handleGetComments = async () => {
        const response = await callGetComments(videoId);
      };
      handleGetComments();
    } catch (error) {
      showMessage("error", error, 2);
    }
  }, []);

  const handleAddComment = async (comment) => {
    if (comment.content !== undefined) {
      try {
        comment.videoId = videoId;
        const response = await callAddComment(comment);
        await callGetComments(videoId);
        form.resetFields();
      } catch (error) {
        showMessage("error", error, 2);
      }
    }
  };

  const handleEditComment = async (comment) => {
    if (comment.content !== "") {
      try {
        const response = await callUpdateComment(comment);
        await callGetComments(videoId);

        setIsEditing(false);
      } catch (error) {
        showMessage("error", error, 2);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await callDeleteComment(commentId);
      await callGetComments(videoId);
    } catch (error) {
      showMessage("error", error, 2);
    }
  };

  //  =========================Subscribe
  return (
    <>
      <div className="p-3 px-5 flex gap-5 h-full w-full">
        <div className="w-full">
          <VideoTemplate videoId={videoId} />
          {/* Pass video source here */}
          {isWideScreen ? (
            <></>
          ) : (
            <div>
              <PlayList />
            </div>
          )}
          <div>
            <UserComment
              currentUser={callCurrentUserData?.getCurrentUserData?.user}
              handleAddComment={handleAddComment}
              form={form}
              commentsCount={
                callGetCommentsData?.getCommentsData?.data?.comments
              }
            />
            <Comments
              Comments={callGetCommentsData?.getCommentsData?.data?.comments}
              User={callCurrentUserData?.getCurrentUserData?.user}
              handleEditComment={handleEditComment}
              form={formEdit}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handleDeleteComment={handleDeleteComment}
            />
          </div>
        </div>
        {isWideScreen ? (
          <div className="flex flex-col gap-3">
            <PlayList />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    callGetChannelData: state.getChannelData,
    callGetCommentsData: state.getCommentsData,
    callCurrentUserData: state.getCurrentUserData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetChannel: (username) => dispatch(getChannel(username)),
    callAddComment: (comment) => dispatch(addComment(comment)),
    callGetComments: (contentId) => dispatch(getComments(contentId)),
    callUpdateComment: (comment) => dispatch(updateComment(comment)),
    callDeleteComment: (commentId) => dispatch(deleteComment(commentId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoComponent);
