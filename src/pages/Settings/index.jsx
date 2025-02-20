import React, { useState } from "react";
import SettingsPage from "./Settings";
import { connect } from "react-redux";
import { changePassword } from "../../redux/slice/users/changePasswordSlice";

const Settings = (props) => {
  const [open, setOpen] = useState(false);
  const { callChangePassword, callChangePasswordData, callCurrentUserData } =
    props;

  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const handleChangePassword = async (values) => {
    const { oldPassword, newPassword } = values;
    const response = await callChangePassword({ oldPassword, newPassword });
  };
  return (
    <>
      <SettingsPage
        showModal={showModal}
        open={open}
        handleChangePassword={handleChangePassword}
        closeModal={closeModal}
        isLoading={callChangePasswordData.isLoading}
        user={callCurrentUserData.getCurrentUserData.user}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    callChangePasswordData: state.changePasswordData,
    callCurrentUserData: state.getCurrentUserData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callChangePassword: (data) => dispatch(changePassword(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
