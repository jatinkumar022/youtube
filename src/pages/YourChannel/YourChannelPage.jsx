import React, { useEffect, useState } from "react";
import {
  MdDeleteOutline,
  MdEdit,
  MdOutlineSwitchAccount,
} from "react-icons/md";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button, Form, Input, Modal, Popconfirm, Popover } from "antd";
import { format, isToday, isYesterday, compareDesc } from "date-fns"; // Added compareDesc for date sorting
import { TbDotsVertical, TbWorld, TbWorldOff } from "react-icons/tb";
import VideoUpdate from "../../components/upload/VideoUpdate";
import { HiOutlinePencilSquare } from "react-icons/hi2";

import { formatTime, timeAgo } from "../../utils/timeAgo";
import { coverImage } from "../../assets";
const YourChannelComponent = (props) => {
  const {
    user,
    setCropping,
    cropData,
    cropping,
    cropperRef,
    avatarInputRef,
    coverInputRef,
    formatDate,
    onCrop,
    onFileChange,
    toggleEdit,
    saveChanges,
    editing,

    // video
    navigate,
    currentVideo,
    isModalVisible,
    setIsModalVisible,
    toggleModal,
    groupByDate,
    videoData,
    handlePublishVideo,
    handleDeleteVideo,
    // dashboard
    ChannelStats,
  } = props;
  // Render the grouped Video

  const [Video, SetVideo] = useState(videoData);

  useEffect(() => {
    SetVideo(videoData);
  }, [videoData]);

  const renderGroupedVideo = (groupedVideo) => {
    // Sort dates: Today first, then Yesterday, then descending
    const sortedDates = Object.keys(groupedVideo).sort((a, b) => {
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
        <div key={date} className="mb-4 mt-4 ">
          {/* Date Header */}

          <h2 className="text-lg  font-semibold text-gray-700 dark:text-gray-200 mb-4">
            {title}
          </h2>
          {/* Cards for the Date */}
          <div className="grid gap-4">
            {groupedVideo[date].map((item) => (
              <div
                key={item?.id}
                className="p-4 bg-white rounded-lg shadow w-full dark:bg-[#222222] flex max-[1220px]:flex-col gap-3 relative cursor-pointer"
              >
                {isModalVisible &&
                  currentVideo?.id === item.id && ( // Show modal only for the selected video
                    <VideoUpdate
                      isVisible={isModalVisible}
                      setIsVisible={setIsModalVisible}
                      onClose={() => setIsModalVisible(false)}
                      Data={currentVideo} // Pass the selected video as Data
                    />
                  )}
                {/* Thumbnail */}
                <div className="flex-shrink-0 ">
                  <div className="relative aspect-[16/9] min-[1220px]:max-w-xs">
                    <img
                      src={item?.thumbnail}
                      alt={item?.title}
                      className="rounded-lg aspect-[16/9] w-full h-full object-cover"
                      onClick={() => navigate("/video")}
                    />
                    <p className="absolute bottom-1 right-1 bg-zinc-900 py-[2px] px-1 text-[13px] bg-opacity-70 rounded-md text-white">
                      {formatTime(item?.duration)}
                    </p>
                  </div>
                </div>
                {/* Title and Channel Info */}
                <div className="flex-1 min-w-0">
                  <h1
                    className="text-pretty font-medium text-gray-800 dark:text-gray-200 break-words roboto-medium"
                    onClick={() => navigate("/video")}
                  >
                    {item?.title}
                  </h1>
                  <div className="flex gap-1 text-[#5e5c5c] dark:text-[#c5c3c3] mt-2">
                    <p className="flex gap-2 items-center roboto-regular">
                      {item?.isPublished ? (
                        <>
                          <TbWorld /> public
                        </>
                      ) : (
                        <>
                          <TbWorldOff /> Private
                        </>
                      )}
                    </p>
                    <p>•</p>
                    <p className="roboto-regular">{item?.views} views</p>
                  </div>
                  <p className="text-[#5e5c5c] dark:text-[#c5c3c3] roboto-regular">
                    Last updated: {timeAgo(item?.updatedAt)}{" "}
                  </p>
                </div>

                <Popover
                  trigger="click"
                  placement="bottom"
                  // onOpenChange={() => setIsEditing(false)}

                  content={
                    <>
                      <div
                        className={`w-full p-3 flex flex-col gap-2 cursor-pointer text-[#575757] dark:text-[#b6b5b5] ${
                          isModalVisible ? "hidden" : ""
                        }`}
                      >
                        <li
                          className="flex gap-3 items-center "
                          onClick={() => toggleModal(item)} // Pass the clicked item to toggleModal
                        >
                          <HiOutlinePencilSquare size={18} />

                          <p className="mt-0.5">Edit</p>
                        </li>
                        {item?.isPublished ? (
                          <Popconfirm
                            trigger="click"
                            title="Private The video?"
                            description="Are you sure to private this Video?"
                            placement="bottom"
                            onConfirm={() =>
                              handlePublishVideo({
                                videoId: item._id,
                                isPublished: false,
                              })
                            }
                          >
                            <li className="flex gap-3 items-center ">
                              <TbWorldOff size={18} /> Private
                            </li>
                          </Popconfirm>
                        ) : (
                          <Popconfirm
                            trigger="click"
                            title="Publish The video?"
                            description="Are you sure to publish this Video?"
                            placement="bottom"
                            onConfirm={() =>
                              handlePublishVideo({
                                videoId: item._id,
                                isPublished: true,
                              })
                            }
                          >
                            <li className="flex gap-3 items-center ">
                              <TbWorld size={18} /> Public
                            </li>
                          </Popconfirm>
                        )}

                        <Popconfirm
                          trigger="click"
                          title="Delete the Video"
                          description="Are you sure to delete this video?"
                          placement="bottom"
                          onConfirm={() => handleDeleteVideo(item._id)}
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
                  <div className="absolute right-3 top-3 p-2 hover:dark:bg-[#353535] rounded-full cursor-pointer hover:bg-[#f6f1f1]">
                    <TbDotsVertical />
                  </div>
                </Popover>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };
  const groupedVideo = groupByDate(Video);

  return (
    <>
      <div className="p-4 min-[600px]:px-32 min-[800px]:px-18 min-[1350px]:px-52">
        {/* Cover Image */}
        <div
          className="w-full relative group"
          style={{
            paddingTop: "calc(100% * 94 / 569)", // Maintain aspect ratio 94:569
            height: 0,
          }}
        >
          <img
            src={user.coverImage || coverImage}
            className="absolute top-0 left-0 w-full h-full rounded-xl object-cover group-hover:opacity-55 cursor-pointer"
            alt="Cover"
            onClick={() => coverInputRef.current.click()}
          />
          {/* Cover Edit Button (Appears on hover) */}
          <div className="absolute top-1 right-1  hidden group-hover:block">
            <button>
              <MdEdit />
            </button>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => onFileChange(e, "cover")}
            />
          </div>
        </div>

        {/* User Information Section */}
        <div className="lg:w-full flex flex-col justify-start mt-6 p-6 rounded-lg bg-gradient-to-r from-[#dbdbdbaa] to-[#f1f1f1aa] dark:from-[#313131] dark:to-[#161515]">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-6 relative">
              {/* Avatar Image */}
              <div className="relative group overflow-hidden rounded-full w-[100px] min-[500px]:w-[170px]">
                <img
                  src={user.avatar || "https://via.placeholder.com/150"}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-all duration-300"
                  alt="Avatar"
                />
                {/* Avatar Edit Button (Appears on hover) */}
                <div
                  className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black bg-opacity-60 rounded-full cursor-pointer"
                  onClick={() => avatarInputRef.current.click()}
                >
                  <button className="text-white text-lg">
                    <MdEdit />
                  </button>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => onFileChange(e, "avatar")}
                  />
                </div>
              </div>

              {/* Editable User Details */}
              <div className="flex flex-col gap-2 w-full">
                {editing ? (
                  <Form
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={saveChanges}
                    autoComplete="off"
                    className="w-full"
                  >
                    <Form.Item
                      label="Full Name"
                      name="fullName"
                      initialValue={user.fullName}
                      rules={[
                        {
                          required: true,
                          message: "Please input your full name!",
                        },
                      ]}
                    >
                      <Input className="w-full p-3 rounded-lg dark:bg-[#1e1e1e] bg-[#dbd9d9] text-[#353434] dark:text-white  shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      initialValue={user.email}
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input
                        prefix="@"
                        className="w-full p-3 rounded-lg dark:bg-[#1e1e1e] bg-[#dbd9d9] text-[#353434] dark:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </Form.Item>
                    <button className="mt-4 py-2 w-full rounded-lg bg-[#1d1c1c] hover:bg-[#464646] dark:bg-white dark:text-black dark:hover:bg-[#aaa] text-white text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 md:max-w-80">
                      Save Changes
                    </button>
                  </Form>
                ) : (
                  <>
                    <h1 className="text-xl min-[500px]:text-2xl font-semibold dark:text-[#dbdada] text-[#494949] ">
                      {user.fullName}
                    </h1>
                    <div className="flex text-sm min-[500px]:text-base font-semibold text-gray-400 dark:text-gray-500 gap-1">
                      <p>@{user.email}</p>
                    </div>
                  </>
                )}

                {/* Edit Button */}
                <div className="flex gap-1">
                  {!editing && (
                    <button
                      className="py-2 px-4 w-full rounded-lg bg-gray-700 hover:bg-gray-800 dark:bg-[#3c3c3c] dark:hover:bg-[#434343] text-gray-300 dark:text-white text-xs font-medium flex items-center justify-center gap-2 transition-all duration-300 md:max-w-80"
                      onClick={toggleEdit}
                    >
                      <MdOutlineSwitchAccount size={17} /> Edit Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 p-4 bg-white dark:bg-[#1f1f1f] rounded-lg shadow-lg mt-5">
          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-[#2a2a2a] rounded-lg">
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              Subscribers
            </span>
            <span className="text-2xl font-bold text-black dark:text-[#e0e0e0]">
              {ChannelStats?.totalSubscribers}
            </span>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-[#2a2a2a] rounded-lg">
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              Total Views
            </span>
            <span className="text-2xl font-bold text-black dark:text-[#e0e0e0]">
              {ChannelStats?.totalViews}
            </span>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-[#2a2a2a] rounded-lg">
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              Total Videos
            </span>
            <span className="text-2xl font-bold text-black dark:text-[#e0e0e0]">
              {ChannelStats?.totalVideos}
            </span>
          </div>

          <div className="flex flex-col items-center p-4 bg-gray-100 dark:bg-[#2a2a2a] rounded-lg">
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              Total Likes
            </span>
            <span className="text-2xl font-bold text-black dark:text-[#e0e0e0]">
              {ChannelStats?.totalLikes}
            </span>
          </div>
        </div>
        {/* Channel Information Section */}
        <div className="lg:w-full flex flex-col justify-start mt-6 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-[#0f0f0f] bg-white p-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="min-w-9">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-9 h-9 rounded-full"
                />
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                {user.fullName}
              </div>
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Visibility: <span className="font-semibold">Public</span>
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-base font-semibold text-gray-900 dark:text-gray-200">
              Channel Details:
            </h1>
            <div className="text-sm mt-5 roboto-medium text-gray-700 dark:text-gray-400">
              Joined at: {formatDate(user.createdAt)}
            </div>
            <div className="text-sm roboto-medium text-gray-700 dark:text-gray-400">
              Last online: {formatDate(user.updatedAt)}
            </div>
          </div>
        </div>
        <div className="w-full max-[768px]:flex flex-col items-center  md:mx-auto p-4 rounded-lg shadow">
          {Video !== undefined ?? Object?.keys(groupedVideo)?.length > 0 ? (
            renderGroupedVideo(groupedVideo)
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No search Video available.
            </p>
          )}
        </div>
      </div>

      {/* Cropper Modal */}
      <Modal
        title={`Crop ${cropping === "avatar" ? "Avatar" : "Cover"} Image`}
        visible={cropping !== null}
        onCancel={() => setCropping(null)}
        footer={null}
      >
        {cropData && (
          <div>
            {cropping === "cover" ? (
              <>
                <Cropper
                  src={cropData}
                  style={{ height: 400, width: "100%" }}
                  aspectRatio={{ 6.05: 1 }} // Cover: 6.05:1, Avatar: 1:1
                  guides={false}
                  ref={cropperRef}
                />
                <Button onClick={onCrop} className="mt-2">
                  Crop and Save
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Cropper
                  src={cropData}
                  style={{ height: 400, width: "100%" }}
                  aspectRatio={{ 1: 1 }} // Cover: 6.05:1, Avatar: 1:1
                  guides={false}
                  ref={cropperRef}
                />
                <Button onClick={onCrop} className="mt-2">
                  Crop and Save
                </Button>
              </>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default YourChannelComponent;
