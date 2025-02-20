import React from "react";
import { Modal, Button } from "antd";

const DeleteModal = ({
  isDeleteModalVisible,
  closeDeleteModal,
  onDelete,
  itemName,
  id,
}) => {
  // This function will trigger the onDelete callback passed from the parent
  const handleDelete = async () => {
    await onDelete(id); // Call the delete function passed from parent component
    closeDeleteModal(); // Close the modal after deletion
  };

  return (
    <Modal
      title="Confirm Deletion"
      visible={isDeleteModalVisible} // Modal visibility controlled by parent
      onCancel={closeDeleteModal} // Close modal on cancel
      footer={[
        <Button key="cancel" onClick={closeDeleteModal}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" danger onClick={handleDelete}>
          Delete
        </Button>,
      ]}
      centered
      width={400} // Set modal width
      className="dark:bg-gray-800 dark:text-white"
    >
      <div className="">
        <p className="text-gray-500 dark:text-gray-300">
          Are you sure you want to delete this {itemName}?
        </p>
      </div>
    </Modal>
  );
};

export default DeleteModal;
