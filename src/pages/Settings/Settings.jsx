import React from "react";
import { appear } from "../../assets";
import { Button, Form, Input, Modal } from "antd";
import { Link } from "react-router";
const SettingsPage = (props) => {
  const { showModal, open, closeModal, handleChangePassword, isLoading, user } =
    props;

  return (
    <div className="w-full justify-center flex ">
      <div className=" w-[70%]">
        <h1 className="py-10 roboto-medium">Account</h1>

        <div className="flex items-center justify-between gap-6 border-b dark:border-[#4f4f4f] pb-4">
          <div className="flex flex-col gap-4">
            <h1 className="roboto-normal text-xl  sm:text-2xl md:text-3xl roboto-regular">
              Choose how you appear and what you see on REELIFY
            </h1>
            <p className="text-sm font-medium dark:text-[#aaa] text-[#606060] roboto-regular">
              Signed in as jatin.r.dvijinfotech@gmail.com
            </p>
          </div>
          <div className="min-w-20 ">
            <img src={appear} alt="" className="w-28 md:w-44" />
          </div>
        </div>

        <div className="py-9 border-b dark:border-[#4f4f4f] ">
          <h1 className="text-lg roboto-medium pb-1">Your REELIFY channel</h1>
          <p className="roboto-regular text-xs dark:text-[#aaa] text-[#606060] ">
            This is your public presence on REELIFY. You need a channel to
            upload your own videos, comment on videos, or create playlists.
          </p>
          <div className="pt-4 sm:flex sm:gap-20  ">
            <h1 className="w-[160px] roboto-medium text-sm max-sm:pb-2">
              Your channel
            </h1>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5 ">
                <img src={user?.avatar} className="w-12 rounded-full" />
                <h2 className="roboto-regular">{user.fullName}</h2>
              </div>
              <div className="text-[#3095e7] dark:text-[#3ea6ff]">
                <p className="roboto-medium text-[14px] cursor-pointer">
                  <p onClick={showModal}>Change Password</p>
                  <Modal
                    title="Change password?"
                    open={open}
                    closable={true}
                    footer={null}
                    onCancel={closeModal}
                    confirmLoading={isLoading}
                    className="flex flex-col justify-center items-center "
                  >
                    <Form
                      name="basic"
                      style={{
                        maxWidth: 600,
                      }}
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={handleChangePassword}
                      autoComplete="off"
                    >
                      <Form.Item
                        label="Old Password"
                        name="oldPassword"
                        rules={[
                          {
                            required: true,
                            message: "Please input your old password!",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>

                      <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                          {
                            required: true,
                            message: "Please input your new password!",
                          },
                          {
                            min: 6,
                            message: "Password must be at least 6 characters!",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>

                      <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={["newPassword"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your new password!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("newPassword") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("Passwords do not match!")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>

                      <Form.Item className="w-full flex justify-center">
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </Modal>{" "}
                </p>

                <Link
                  to={"/your-channel"}
                  className="roboto-medium text-[14px] cursor-pointer"
                >
                  Manage profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
