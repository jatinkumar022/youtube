import React from "react";
import Login from "./LoginPage";
import { connect } from "react-redux";
import { logIn } from "../../redux/slice/users/loginSlice";
import { useForm } from "react-hook-form";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router";
import useMessage from "../../utils/useMessage";

const isEmail = (input) => {
  // Regular expression to match a valid email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(input);
};

const LoginPage = (props) => {
  const { showMessage } = useMessage();

  const { callLogIn, callLogInData } = props;
  const navigate = useNavigate();
  const cookie = new Cookies();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const isInputEmail = isEmail(data.usernameOrEmail);

      const updatedData = {
        ...data,
        [isInputEmail ? "email" : "username"]: data.usernameOrEmail,
      };
      delete updatedData.usernameOrEmail;

      const response = await callLogIn(updatedData);
      if (response.type === "logIn/fulfilled") {
        cookie.set("accessToken", response?.payload?.data?.accessToken);
        cookie.set("refreshToken", response?.payload?.data?.refreshToken);
        showMessage("success", "Login successful!", 2);
        navigate("/");
      }
      if (response.type === "logIn/rejected") {
        showMessage("error", response.error.message);
      }
    } catch (error) {
      showMessage("error", error.message);
    }
  };
  return (
    <>
      <Login
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
        handleLogin={handleLogin}
        loading={callLogInData.isLoading}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    callLogInData: state.logInData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callLogIn: (data) => dispatch(logIn(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
