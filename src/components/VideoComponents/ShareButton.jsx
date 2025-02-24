import React, { useState } from "react";
import { Modal, message } from "antd";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  RedditIcon,
  EmailIcon,
} from "react-share";
import { PiShareFatLight } from "react-icons/pi";
import { FiCopy } from "react-icons/fi";

const ShareModal = ({ url, title }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    message.info("Link copied to clipboard!");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
        message.success("Content shared successfully");
      } catch (error) {
        message.error("Error sharing content");
      }
    } else {
      message.error("Sharing is not supported on this device.");
    }
  };

  return (
    <>
      <button
        onClick={showModal}
        className="flex gap-2 items-center px-5 py-[8px] text-[14px] font-[600] rounded-full bg-[#f2f2f2] hover:bg-[#e6e6e6] dark:bg-[#272727] hover:dark:bg-[#373737]"
      >
        <PiShareFatLight size={18} /> Share
      </button>

      <Modal
        title="Share this content"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        className="p-4"
      >
        {/* Social Media Share Buttons */}
        <div className="flex space-x-4 justify-center mb-4 ">
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>

          <LinkedinShareButton url={url} title={title}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>

          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>

          <RedditShareButton url={url} title={title}>
            <RedditIcon size={40} round />
          </RedditShareButton>

          <EmailShareButton url={url} subject={title} body={url}>
            <EmailIcon size={40} round />
          </EmailShareButton>
        </div>

        {/* Copy Link and Native Share Options */}
        <div className="flex space-x-4 justify-center">
          <button
            onClick={copyLink}
            className="flex items-center px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            <FiCopy size={20} className="mr-2" /> Copy Link
          </button>

          <button
            onClick={handleNativeShare}
            className="flex items-center px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600"
          >
            <PiShareFatLight size={20} className="mr-2" /> Share via App
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
