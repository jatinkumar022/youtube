import React, { useEffect, useState } from "react";
import { Modal, Upload, Input, Button, Form, message } from "antd";

import { MdUpload } from "react-icons/md";
import { connect } from "react-redux";
import { uploadVideo } from "../../redux/slice/videos/uploadVideoSlice";
import useMessage from "../../utils/useMessage";

const { Dragger } = Upload;
const { TextArea } = Input;

const VideoUploadPage = (props) => {
  const { isVisible, setIsVisible, onClose, callUploadVideo } = props;
  const [fileUploaded, setFileUploaded] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState();
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { showMessage } = useMessage();

  const handleResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (!videoFile || !thumbnailFile) {
        message.error("Please upload both video and thumbnail!");
        return;
      }
      const formData = new FormData();
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnailFile);
      formData.append("title", values.title);
      formData.append("description", values.description);

      try {
        const handleUploadVideo = async () => {
          setIsLoading(true);
          const response = await callUploadVideo(formData);

          if (response.type == "uploadVideo/fulfilled") {
            showMessage("success", "Video Uploaded Successfully", 2);
          }
          setIsLoading(false);
          setIsVisible(false);
        };
        handleUploadVideo();
      } catch (error) {
        showMessage("error", error.message, 2);
        setIsLoading(false);
      }
    });
  };
  return (
    <Modal
      title="Upload Video"
      open={isVisible}
      footer={null}
      height={screenSize.width > 780 ? "90%" : "60%"}
      width={screenSize.width > 780 ? "60%" : "90%"}
      centered
      onCancel={onClose}
      className="custom-modal "
    >
      {!fileUploaded ? (
        <Dragger
          name="video"
          height={screenSize.width > 780 ? "80vh" : "40vh"}
          // height={"80vh"}
          multiple={false}
          beforeUpload={(file) => {
            setVideoFile(file);
            setFileUploaded(true);
            message.success(`${file.name} selected as video.`);
            return false; // Prevent auto-upload
          }}
          style={{ minHeight: "300px" }}
          accept="video/*"
        >
          <div className=" flex justify-center items-center">
            <div className="ant-upload-drag-icon flex justify-center items-center p-8 dark:bg-[#1f1f1f] bg-[#eeeeee] text-[#909090] rounded-full w-fit">
              <MdUpload size={70} />
            </div>
          </div>
          <p className=" dark:text-[#f1f0f0] roboto-medium text-base mt-5">
            Drag and drop video files to upload
          </p>
          <p className="dark:text-[#868686] roboto-medium text-xs ">
            Your videos will be private until you publish them.
          </p>
        </Dragger>
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title!" }]}
          >
            <Input
              placeholder="Enter video title"
              className="dark:text-white placeholder:dark:text-[#979797] custom-input"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description!" }]}
          >
            <TextArea
              placeholder="Enter video description"
              rows={4}
              className="dark:text-white placeholder:dark:text-[#979797]  custom-input"
            />
          </Form.Item>
          <Form.Item
            label="Thumbnail"
            rules={[{ required: true, message: "Please upload a thumbnail!" }]}
          >
            <Upload
              name="thumbnail"
              listType="picture-card"
              beforeUpload={(file) => {
                setThumbnailFile(file);
                message.success(`${file.name} selected as thumbnail.`);
                return false; // Prevent auto-upload
              }}
              className="text-[#bbb8b8] roboto-regular"
              accept="image/*"
            >
              {" Upload Thumbnail"}
            </Upload>
          </Form.Item>
          <Button
            type="primary"
            block
            onClick={handleSubmit}
            loading={isLoading}
          >
            Upload Video
          </Button>
        </Form>
      )}
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    callUploadVideoData: state.uploadVideoData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callUploadVideo: (video) => dispatch(uploadVideo(video)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoUploadPage);
