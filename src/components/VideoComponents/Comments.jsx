import Linkify from "linkify-react";
import React, { useEffect, useState } from "react";
import { GrDislike, GrLike } from "react-icons/gr";
import { RiMore2Line, RiSendPlane2Line } from "react-icons/ri";
import { timesAgo } from "../../utils/timeAgo";
import { Button, Form, Input, Popconfirm, Popover } from "antd";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdDeleteOutline } from "react-icons/md";
import { isLikedComment } from "../../redux/slice/likes/isLikedCommentSlice";
import { connect } from "react-redux";
import { likeComment } from "../../redux/slice/likes/likeCommentSlice";

const Comments = (props) => {
  const {
    Comments,
    User,
    handleEditComment,
    form,
    isEditing,
    setIsEditing,
    handleDeleteComment,
    callIsLikedComment,
    toggleLikeCommentAction,
  } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [likedComments, setLikedComments] = useState({}); // Store the like status of each comment

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const linkifyOptions = {
    defaultProtocol: "https",
    className: "text-blue-600 hover:underline",
    target: "_blank",
  };
  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsEditing(false);
  };
  useEffect(() => {
    // Fetch the like status for each comment initially
    Comments?.forEach(async (comment) => {
      const response = await callIsLikedComment(comment?._id);
      const { likeCount, userLiked } = response?.payload?.data;
      setLikedComments((prev) => ({
        ...prev,
        [comment._id]: { likeCount, userLiked }, // Store likeCount and userLiked for each comment
      }));
    });
  }, [Comments]);

  const handleLikeClick = async (commentId) => {
    const currentStatus = likedComments[commentId]?.userLiked;

    // Toggle like/dislike with one action
    await toggleLikeCommentAction(commentId);

    // Update the local state based on the current status
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: {
        ...prev[commentId],
        userLiked: !currentStatus, // Toggle the liked status
        likeCount: prev[commentId].likeCount + (currentStatus ? -1 : 1), // Adjust the like count accordingly
      },
    }));
  };
  return (
    <>
      {Comments?.map((comment) => (
        <div className="flex justify-between py-3 relative ">
          <div className="w-full flex gap-4">
            <div className="min-w-11">
              <img
                src={comment?.owner?.avatar}
                alt=""
                className="h-11 w-11 object-cover rounded-full"
              />
            </div>
            <div className="">
              <div className="flex gap-2 text-sm ">
                {comment?.owner?._id === User?._id ? (
                  <h1 className="p-0.5 bg-[#888888] text-white rounded-full px-2">
                    @{comment?.owner?.username}
                  </h1>
                ) : (
                  <h1> @{comment?.owner?.username}</h1>
                )}

                <p className="font-normal text-[#353434] dark:text-[#d5d4d4] md:flex hidden">
                  {timesAgo(comment?.createdAt)}
                </p>
              </div>
              {/* prettier-ignore */}

              {isEditing && comment?.owner?._id === User?._id ? (
                <Form
                  form={form}
                  className="w-full"
                  initialValues={{ content: comment?.content }} // Set default value for comment content
                  onFinish={(values) =>
                    handleEditComment({
                      content: values.content,
                      commentId: comment?._id,
                    })
                  }
                >
                  <Form.Item name="content" style={{ marginBottom: 0 }}>
                    <Input.TextArea
                      placeholder="Add a comment..."
                      className="w-full bg-transparent dark:placeholder:text-[#aaa] mb-1 resize-auto custom-textarea"
                      rows={1}
                    />
                  </Form.Item>

                  <Form.Item>
                    <div className="flex w-full justify-between p-1">
                      <div className="flex gap-4">
                        <Button
                          className="flex gap-2 items-center px-5 py-[8px] text-[14px] font-[600] rounded-full hover:bg-[#f2f2f2] hover:dark:bg-[#313131]"
                          onClick={handleCancel} // Trigger cancel action
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex gap-2 items-center px-5 py-[8px] text-[14px] font-[500] rounded-full bg-[#f2f2f2] hover:bg-[#3ea6ff] dark:hover:bg-[#3ea6ff] hover:text-white dark:hover:text-white text-[#aaa] dark:text-[#717171] dark:bg-[#272727]"
                          type="primary"
                          htmlType="submit"
                        >
                          Edit Comment
                        </Button>
                      </div>
                    </div>
                  </Form.Item>
                </Form>
              ) : (
                <Linkify options={linkifyOptions}>
                  <pre
                    className={`whitespace-pre-line text-[15px] font-normal ${
                      isExpanded ? "" : "line-clamp-6"
                    } transition-all duration-200`}
                  >
                    {comment?.content}
                  </pre>
                </Linkify>
              )}

              {comment?.content.split("\n").length > 1 && (
                <button
                  onClick={toggleExpanded}
                  className="font-bold tracking-wider text-blue-600 dark:text-blue-400 mt-1"
                >
                  {isExpanded ? "Show Less" : "more"}
                </button>
              )}

              <div className="flex gap-4 ">
                <div className="flex gap-1 items-center">
                  <button
                    className={`p-2 rounded-full ${
                      likedComments[comment._id]?.userLiked
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => handleLikeClick(comment._id)}
                  >
                    <GrLike size={20} />
                  </button>
                  <p className="text-sm font-normal mt-1 text-[#353434] dark:text-[#d5d4d4]">
                    {likedComments[comment._id]?.likeCount || 0}
                  </p>
                </div>

                <button className="hover:bg-[#e6e6e6]  hover:dark:bg-[#373737] p-2 rounded-full text-[#353434] dark:text-[#d5d4d4]">
                  <GrDislike size={20} />
                </button>

                <p className="absolute bottom-4 right-0 font-normal text-[#353434] text-xs dark:text-[#d5d4d4] md:hidden flex">
                  {timesAgo(comment?.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {comment?.owner?._id === User?._id ? (
            <Popover
              trigger="click"
              placement="bottom"
              content={
                <>
                  <div className="w-full p-3 flex flex-col gap-2 cursor-pointer text-[#575757] dark:text-[#b6b5b5]">
                    <li
                      className="flex gap-3 items-center "
                      onClick={toggleIsEditing}
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
              <div className="p-2 hover:bg-[#e6e6e6]  hover:dark:bg-[#373737] w-fit h-fit rounded-full">
                <RiMore2Line size={20} className="" />
              </div>
            </Popover>
          ) : (
            <></>
          )}
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    callIsLikedCommentData: state.isLikedCommentData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callIsLikedComment: (commentId) => dispatch(isLikedComment(commentId)),
    toggleLikeCommentAction: (commentId) => dispatch(likeComment(commentId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
