import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import { createPlaylist } from "../../../redux/slice/playlist/createPlaylistSlice";
import { connect } from "react-redux";
import useMessage from "../../../utils/useMessage";

const PlaylistModal = ({
  open,
  closeModal,
  callCreatePlaylist,
  getPlaylists,
}) => {
  const [form] = Form.useForm(); // Ant Design Form instance for managing form state
  const { showMessage } = useMessage();

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const response = await callCreatePlaylist(values);
      if (response.type === "createPlaylist/fulfilled") {
        showMessage("success", "Playlist Created");
        await getPlaylists();
      }
    } catch (error) {
      showMessage("error", error.message);
    }
    form.resetFields(); // Reset the form fields after submission
    closeModal(); // Close the modal after submission
  };

  return (
    <Modal
      title="Create Playlist"
      open={open}
      onOk={() => form.submit()} // Trigger form submission
      onCancel={closeModal} // Close modal on cancel
      centered // Center the modal in the middle of the page
      className="w-full max-w-lg mx-auto dark:bg-gray-800 dark:text-white rounded-3xl" // Tailwind: Center and apply dark mode classes
    >
      <Form
        form={form}
        name="playlist-form"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ name: "", description: "" }} // Initial form values
      >
        <Form.Item
          name="name"
          label="Playlist name"
          rules={[
            { required: true, message: "Please input the playlist name!" },
          ]}
        >
          <Input
            className="border-2 border-gray-300 p-2 rounded-md dark:bg-[#1b1b1b] dark:text-white dark:border-gray-600 dark:placeholder:text-[#aaa]"
            placeholder="Enter playlist name"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea
            className="border-2 border-gray-300 p-2 rounded-md dark:bg-[#1b1b1b] dark:text-white dark:border-gray-600 dark:placeholder:text-[#aaa]"
            placeholder="Enter description"
            rows={4}
          />
        </Form.Item>
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
    callCreatePlaylist: (data) => dispatch(createPlaylist(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistModal);
