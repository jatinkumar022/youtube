import React, { useState } from "react";
import { Button, Form, Input, Popover } from "antd";
import { PiSortAscending } from "react-icons/pi";
import { BsEmojiGrin } from "react-icons/bs";
const UserComment = (props) => {
  const { currentUser, handleAddComment, form, commentsCount } = props;

  const [showButtons, setShowButtons] = useState(false);

  const autoResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };
  const handleBlur = () => {
    setTimeout(() => {
      setShowButtons(false);
    }, 200);
  };

  return (
    <div className="w-full mb-6">
      <div className="w-full">
        <div className="flex gap-8 mb-4">
          <h1 className="p-0.5 text-xl">{commentsCount?.length} Comments</h1>
          <Popover
            trigger="focus"
            className="flex items-center font-medium text-sm gap-2 p-0.5 hover:bg-[#f0f0f0] dark:hover:bg-[#161616] rounded"
          >
            <PiSortAscending size={20} />
            Sort by
          </Popover>
        </div>
        <div className="w-full flex gap-4">
          <div className="min-w-11">
            <img
              src={currentUser?.avatar || ""}
              alt=""
              className="h-11 w-11 object-cover rounded-full"
            />
          </div>
          <Form className="w-full" onFinish={handleAddComment} form={form}>
            <Form.Item name="content" style={{ marginBottom: 0 }}>
              <Input.TextArea
                placeholder="Add a comment..."
                className="w-full  bg-transparent  dark:placeholder:text-[#aaa] mb-1 resize-auto custom-textarea"
                rows={1}
                onInput={autoResize} // Trigger autoResize on typing
                onFocus={() => setShowButtons(true)} // Show buttons when input is focused
                onBlur={handleBlur} // Hide buttons when input loses focus
              />
            </Form.Item>

            {showButtons && (
              <div className="flex w-full justify-between p-1">
                <div className="flex gap-2 items-center p-[12px] text-[14px] font-[600] rounded-full hover:bg-[#f2f2f2] hover:dark:bg-[#313131] dark:text-white cursor-pointer">
                  <BsEmojiGrin size={18} />
                </div>
                <div className="flex gap-4">
                  <Button
                    className="flex gap-2 items-center px-5 py-[8px] text-[14px] font-[600] rounded-full  hover:bg-[#f2f2f2] hover:dark:bg-[#313131]"
                    onClick={() => form.resetFields()} // Clear text on Cancel
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex gap-2 items-center px-5 py-[8px] text-[14px] font-[500] rounded-full bg-[#f2f2f2] hover:bg-[#3ea6ff] dark:hover:bg-[#3ea6ff] hover:text-white dark:hover:text-white text-[#aaa] dark:text-[#717171] dark:bg-[#272727] "
                    type="primary"
                    htmlType="submit"
                  >
                    Comment
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
