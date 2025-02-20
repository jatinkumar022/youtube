import React, { useState } from "react";
import { Modal, Button } from "antd";
import { formatTime } from "../../../utils/timeAgo";

const VideoSelectModal = ({ isVisible, closeModal, videos, onSelectVideo }) => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  // Handle video card click to set selected video ID
  const handleSelectVideo = (id) => {
    setSelectedVideoId(id);
  };

  // Handle "Okay" button click to return selected video ID
  const handleOk = () => {
    if (selectedVideoId) {
      onSelectVideo(selectedVideoId);
      closeModal();
    } else {
      alert("Please select a video.");
    }
  };

  return (
    <Modal
      title="Select YouTube Video"
      visible={isVisible}
      onCancel={closeModal}
      onOk={handleOk}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={handleOk}
          disabled={!selectedVideoId}
        >
          Okay
        </Button>,
      ]}
      centered
      width={800} // Set a fixed width for the modal
      bodyStyle={{
        maxHeight: "70vh", // Ensure the modal body is not too tall
        overflowY: "auto", // Enable scrolling inside the modal
        padding: "20px", // Add padding for better spacing
      }}
      className="dark:bg-gray-800 dark:text-white"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos?.map((video) => (
          <div
            key={video._id}
            className={`card border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              selectedVideoId === video._id ? "border-4 border-blue-500" : ""
            }`}
            onClick={() => handleSelectVideo(video._id)}
          >
            <div className="relative pb-[56.25%]">
              <img
                alt={video?.title}
                src={video?.thumbnail}
                className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold dark:text-white">
                {video.title}
              </h3>

              <p className="text-sm text-gray-400">
                <span className="font-medium">Views:</span> {video?.views}
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium">Duration:</span>{" "}
                {formatTime(video?.duration)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default VideoSelectModal;
