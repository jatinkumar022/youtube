import React, { useEffect, useState } from "react";
import {
  Modal,
  Upload,
  Input,
  Button,
  Form,
  message,
  Switch,
  Radio,
} from "antd";
import { connect } from "react-redux";
import { updateVideo } from "../../redux/slice/videos/updateVideoSlice";
import { PlusOutlined } from "@ant-design/icons";
// eslint-disable-next-line import/no-unresolved
import { getYourVideos } from "../../redux/slice/dashboard/GetYourVideosSlice";
import useMessage from "../../utils/useMessage";
const { TextArea } = Input;

const VideoUpdate = (props) => {
  const {
    isVisible,
    setIsVisible,
    onClose,
    callUpdateVideo,
    callGetYourVideos,
    Data, // Old video details coming from props
  } = props;
  const { showMessage } = useMessage();

  const [thumbnailFile, setThumbnailFile] = useState(); // New uploaded thumbnail file
  const [selectedThumbnail, setSelectedThumbnail] = useState("old"); // To track selected thumbnail (old or new)
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
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

  // Pre-populate form with old values when Data changes
  useEffect(() => {
    if (Data) {
      form.setFieldsValue({
        title: Data.title,
        description: Data.description,
      });
    }
  }, [Data, form]);

  const handleSubmit = async () => {
    const videoId = Data?._id;
    try {
      await form.validateFields();
      let finalThumbnail;

      // Handling old thumbnail
      if (selectedThumbnail === "old" && Data.thumbnail) {
        const response = await fetch(Data.thumbnail);
        const blob = await response.blob();
        finalThumbnail = new File([blob], "thumbnail.jpg", {
          type: "image/jpeg",
        });
      }
      // Handling new thumbnail
      else if (selectedThumbnail === "new" && thumbnailFile) {
        finalThumbnail = thumbnailFile;
      } else {
        message.error("Please upload or select a thumbnail!");
        return;
      }

      // Prepare FormData
      const formData = new FormData();
      formData.append("thumbnail", finalThumbnail);
      formData.append("title", form.getFieldValue("title"));
      formData.append("description", form.getFieldValue("description"));

      // API call to update video
      setIsLoading(true);
      const response = await callUpdateVideo({ videoId, formData });
      if (response.type == "updateVideo/fulfilled") {
        showMessage("success", "Video Updated Successfully", 2);
      }
      await callGetYourVideos();
      setIsLoading(false);
      setIsVisible(false); // Close the modal
    } catch (error) {
      showMessage("error", error, 2);
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Update Video Details"
      open={isVisible}
      footer={null}
      height={screenSize.width > 780 ? "90%" : "60%"}
      width={screenSize.width > 780 ? "60%" : "90%"}
      centered
      onCancel={onClose}
      className="custom-modal"
    >
      <Form form={form} layout="vertical" initialValues={true}>
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

        {/* Radio to select between old or new thumbnail */}
        <Form.Item label="Thumbnail">
          <Radio.Group
            onChange={(e) => setSelectedThumbnail(e.target.value)}
            value={selectedThumbnail}
          >
            <Radio value="old">Use Existing Thumbnail</Radio>
            <Radio value="new">Upload New Thumbnail</Radio>
          </Radio.Group>

          {selectedThumbnail === "old" && (
            <img
              src={Data.thumbnail} // Old thumbnail URL
              alt="Old Thumbnail"
              style={{ width: 200, marginTop: 10 }}
            />
          )}

          {selectedThumbnail === "new" && (
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
              {"Upload Thumbnail"}
              <PlusOutlined />
            </Upload>
          )}
        </Form.Item>

        <Button type="primary" block onClick={handleSubmit} loading={isLoading}>
          Update Details
        </Button>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    callUpdateVideoData: state.updateVideoData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callUpdateVideo: (videoDetails) => dispatch(updateVideo(videoDetails)),
    callGetYourVideos: () => dispatch(getYourVideos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoUpdate);
