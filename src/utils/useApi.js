import axios from "axios";
import { Cookies } from "react-cookie";
import { API_KEY } from "../enviroment";

const cookies = new Cookies();

// Create an axios instance with base configurations
const api = axios.create({
  baseURL: API_KEY,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper functions to manage tokens
const getToken = (type) => cookies.get(type);

const removeToken = (type) => cookies.remove(type, { path: "/" });

// Function to set or remove Authorization headers
const setAuthHeaders = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Request Interceptor: Add Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const accessToken = getToken("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token expiration and refresh token logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 (Unauthorized) errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getToken("refreshToken");

        if (!refreshToken) {
          console.error("Refresh token not available");
          alert("Refresh token not available");
        }

        // Request new access token
        const response = await axios.post(`${API_KEY}/users/refresh-token`, {
          refreshToken,
        });
        11;
        const newAccessToken = response?.data?.data?.accessToken;
        const newRefreshToken = response?.data?.data?.refreshToken;

        // Update cookies and Authorization headers with the new token
        cookies.set("accessToken", newAccessToken);
        cookies.set("refreshToken", newRefreshToken);
        setAuthHeaders(newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Clear tokens and redirect to login if refresh fails
        console.error("Failed to refresh token:", refreshError);
        removeTokensAndRedirect();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Utility function to clear tokens and redirect to the login page
const removeTokensAndRedirect = () => {
  ["accessToken", "refreshToken"].forEach(removeToken);
  window.location.href = "/login";
};

export { api };
