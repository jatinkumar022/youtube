import React from "react";
import Signin from "./SigninPage";
import { signIn } from "../../redux/slice/users/signinSlice";
import { connect } from "react-redux";
import { generateAvatar } from "../../utils/getAvatarStyle";
import { useForm } from "react-hook-form";
import { logIn } from "../../redux/slice/users/loginSlice";
import { useNavigate } from "react-router";
import { Cookies } from "react-cookie";

const SigninPage = (props) => {
  const { callSignIn, callSignInData, callLogIn } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const cookie = new Cookies();

  const handleLogin = async (data) => {
    try {
      const loginData = {};
      loginData.email = data.email;
      loginData.password = data.password;

      const avatar = await generateAvatar(data.fullName); // Get avatar URL based on full name
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("avatar", avatar);

      // Call the signIn action, passing FormData instead of plain JSON
      const response = await callSignIn(formData);
      if (response.type === "signIn/fulfilled") {
        try {
          const loginRes = await callLogIn(loginData);
          if (loginRes.type === "logIn/fulfilled") {
            alert("Login success");
            cookie.set("accessToken", loginRes?.payload?.data?.accessToken);
            cookie.set("refreshToken", loginRes?.payload?.data?.refreshToken);
            navigate("/");
          }
        } catch (error) {
          console.log("Error while login:", error);
        }
      }
    } catch (error) {
      console.error("Error while sigh up:", error);
    }
  };

  return (
    <>
      <Signin
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
        handleLogin={handleLogin}
        loading={callSignInData.isLoading}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    callSignInData: state.signInData,
    callLogInData: state.logInData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callSignIn: (data) => dispatch(signIn(data)),
    callLogIn: (data) => dispatch(logIn(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
