import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { getCurrentUser } from "../redux/slice/users/getCurrentUserSlice";
import useMessage from "../utils/useMessage";

const PrivateRoute = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { callGetCurrentUser, currentUserData, isUserLoading, children } =
    props;
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  useEffect(() => {
    // Check if user data already exists in Redux state
    if (!currentUserData.data) {
      // If user data doesn't exist, make an API call to get the current user
      const checkAuth = async () => {
        try {
          const response = await callGetCurrentUser();

          if (response.type === "getCurrentUser/fulfilled") {
            // If successful, set authenticated state
            setIsAuthenticated(true);
          } else {
            navigate("/login");
          }
        } catch (error) {
          setIsAuthenticated(false);
          showMessage("error", error, 2);

          navigate("/login"); // Redirect to login if authentication fails
        }
      };
      checkAuth();
    } else {
      // If user data already exists in Redux, set authenticated state
      setIsAuthenticated(true);
      navigate("/login"); // Redirect to login if authentication fails
    }
  }, []);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  // Render children if authenticated, or null otherwise
  return isAuthenticated ? children : null;
};

const mapStateToProps = (state) => {
  return {
    currentUserData: state.getCurrentUserData, // Access user data from Redux
    isUserLoading: state.getCurrentUserData?.isLoading, // Loading state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callGetCurrentUser: () => dispatch(getCurrentUser()), // Action to fetch current user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
