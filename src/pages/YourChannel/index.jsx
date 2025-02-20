import React, { useEffect, useRef, useState } from "react";
import YourChannelComponent from "./YourChannelPage";
import { connect } from "react-redux";
import { updateUser } from "../../redux/slice/users/updateUserSlice";
import { updateCoverImage } from "../../redux/slice/users/updateCoverImage";
import { updateAvatar } from "../../redux/slice/users/updateAvatarSlice";
import { useNavigate } from "react-router";
import Img from "../../assets/thumbnails/3.jpg";
import channel from "../../assets/thumbnails/channel.jpg";
import sample from "../../assets/video/sample.mp4";
import { format } from "date-fns"; // Added compareDesc for date sorting
import { getChannelStats } from "../../redux/slice/dashboard/getChannelStatsSlice";
import { getYourVideos } from "../../redux/slice/dashboard/GetYourVideosSlice";
import { togglePublish } from "../../redux/slice/videos/togglePublishSlice";
import { deleteVideo } from "../../redux/slice/videos/deleteVideoSlice";
import { getCurrentUser } from "../../redux/slice/users/getCurrentUserSlice";
import YourChannelLoader from "../../components/Loaders/YourChannelLoader";
const YourChannel = (props) => {
  const {
    callGetCurrentUserData,
    callUpdateUser,
    callUpdateCoverImage,
    callUpdateAvatar,
    callGetChannelStats,
    callGetYourVideos,
    callGetChannelStatsData,
    callGetYourVideosData,
    callTogglePublishData,
    callDeleteVideo,
    callGetCurrentUser,
  } = props;
  const [editing, setEditing] = useState(false);
  const [cropping, setCropping] = useState(null);
  const [cropData, setCropData] = useState(null);

  const cropperRef = useRef(null);
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState();

  // Function to format dates
  const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  // Handle Crop Completion
  const onCrop = () => {
    const cropper = cropperRef.current.cropper;
    const croppedImage = cropper.getCroppedCanvas().toDataURL();
    if (cropping === "avatar") {
      handleAvatarUpload(croppedImage);
    } else if (cropping === "cover") {
      handleCoverImageUpload(croppedImage);
    }
    setCropping(null);
  };

  // Handle File Upload for Avatar and Cover Image
  const onFileChange = async (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropping(type); // Set cropping type as either avatar or cover
        setCropData(reader.result); // Load the image into cropper
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle Edit Mode
  const toggleEdit = () => setEditing(!editing);

  const saveChanges = async (data) => {
    const fullName = callGetCurrentUserData?.getCurrentUserData?.user?.fullName;
    const email = callGetCurrentUserData?.getCurrentUserData?.user?.email;

    if (data.fullName !== fullName || data.email !== email) {
      try {
        const response = await callUpdateUser(data);
        await callGetCurrentUser();
        toggleEdit();
      } catch (error) {
        console.error(error);
      }
    } else {
      toggleEdit();
    }
  };
  // Function to convert base64 to Blob
  function base64ToBlob(base64Data, mimeType) {
    const byteCharacters = atob(base64Data); // Decode the base64 string
    const byteArrays = [];

    // Convert the characters to a byte array
    for (let offset = 0; offset < byteCharacters.length; offset++) {
      byteArrays.push(byteCharacters.charCodeAt(offset));
    }

    // Create and return the Blob object
    return new Blob([new Uint8Array(byteArrays)], { type: mimeType });
  }

  const handleCoverImageUpload = async (croppedCoverImage) => {
    try {
      const cleanBase64 = croppedCoverImage.replace(
        /^data:image\/(png|jpeg|jpg);base64,/,
        ""
      );
      const blob = base64ToBlob(cleanBase64, "image/jpeg");
      const file = new File([blob], "cover_image.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("coverImage", file);
      const response = await callUpdateCoverImage(formData);
      await callGetCurrentUser();
    } catch (error) {
      console.error("Error uploading cover image:", error);
    }
  };

  const handleAvatarUpload = async (croppedAvatarBase64) => {
    try {
      const cleanBase64 = croppedAvatarBase64.replace(
        /^data:image\/(png|jpeg|jpg);base64,/,
        ""
      );
      const blob = base64ToBlob(cleanBase64, "image/jpeg");
      const file = new File([blob], "avatar_image.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("avatar", file);
      const response = await callUpdateAvatar(formData);
      await callGetCurrentUser();
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  // video

  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = (item) => {
    setIsModalVisible((prev) => !prev);
    setCurrentVideo(item);
  };

  const separateDateAndTime = (isoString) => {
    const [date, time] = isoString.split("T");
    return { date, time: time.split(".")[0] };
  };

  // Function to group Video by date
  const groupByDate = (items) => {
    const grouped = items?.reduce((acc, item) => {
      const dateKey = format(
        new Date(separateDateAndTime(item?.createdAt)?.date),
        "yyyy-MM-dd"
      );
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(item);
      return acc;
    }, {});

    return grouped;
  };

  // Channel stats ===========================
  useEffect(() => {
    setLoading(true);
    const handleGetChannelStats = async () => {
      try {
        const response = await callGetChannelStats();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const handleGetYourVideos = async () => {
      try {
        const response = await callGetYourVideos();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    handleGetYourVideos();
    handleGetChannelStats();
    setLoading(false);
  }, []);

  const handlePublishVideo = async (data) => {
    try {
      const response = await callTogglePublishData(data);
      await callGetYourVideos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const response = await callDeleteVideo(videoId);
      await callGetYourVideos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? (
        <YourChannelLoader />
      ) : (
        <YourChannelComponent
          user={callGetCurrentUserData?.getCurrentUserData?.user}
          setCropping={setCropping}
          editing={editing}
          cropperRef={cropperRef}
          cropping={cropping}
          cropData={cropData}
          avatarInputRef={avatarInputRef}
          coverInputRef={coverInputRef}
          formatDate={formatDate}
          onCrop={onCrop}
          onFileChange={onFileChange}
          toggleEdit={toggleEdit}
          saveChanges={saveChanges}
          // video
          navigate={navigate}
          currentVideo={currentVideo}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          toggleModal={toggleModal}
          groupByDate={groupByDate}
          videoData={callGetYourVideosData?.getYourVideosData?.data}
          handleDeleteVideo={handleDeleteVideo}
          // dashboard
          ChannelStats={callGetChannelStatsData?.getChannelStatsData?.data}
          handlePublishVideo={handlePublishVideo}
        />
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    callGetCurrentUserData: state.getCurrentUserData,
    callGetChannelStatsData: state.getChannelStatsData,
    callGetYourVideosData: state.getYourVideosData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callUpdateUser: (data) => dispatch(updateUser(data)),
    callUpdateCoverImage: (data) => dispatch(updateCoverImage(data)),
    callUpdateAvatar: (data) => dispatch(updateAvatar(data)),
    callGetYourVideos: (data) => dispatch(getYourVideos(data)),
    callGetChannelStats: (data) => dispatch(getChannelStats(data)),
    callTogglePublishData: (data) => dispatch(togglePublish(data)),
    callDeleteVideo: (videoId) => dispatch(deleteVideo(videoId)),
    callGetCurrentUser: () => dispatch(getCurrentUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(YourChannel);
