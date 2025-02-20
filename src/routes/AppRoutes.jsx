import React from "react";
import Homepage from "../pages/Home";
import { Route, Routes } from "react-router";
import VideoPage from "../pages/Video";
import TweetsPage from "../pages/Tweets/TweetsPage";
import SubscriptionPage from "../pages/Subscription";
import UserPage from "../pages/You";
import HistoryPage from "../pages/History";
import PlaylistPage from "../pages/Playlist";
import ViewPlaylistPage from "../pages/ViewPlaylist";
import WatchLaterPage from "../pages/WatchLater";
import ChannelPage from "../pages/Channel";
import Search from "../pages/Search/Search";
import Settings from "../pages/Settings";
import LoginPage from "../auth/Login";
import SigninPage from "../auth/Signin";
import YourContent from "../pages/YourContent";
import PrivateRoute from "./PrivateRoute";
import YourChannel from "../pages/YourChannel";
import LikedVideos from "../pages/LikedVideos";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/video/:videoId"
          element={
            <PrivateRoute>
              <VideoPage />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/tweet"
          element={
            <PrivateRoute>
              <TweetsPage />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/your-channel"
          element={
            <PrivateRoute>
              <YourChannel />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <PrivateRoute>
              <SubscriptionPage />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/library"
          element={
            <PrivateRoute>
              <UserPage />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <HistoryPage />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <PrivateRoute>
              <PlaylistPage />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/playlist/:playlistId"
          element={
            <PrivateRoute>
              <ViewPlaylistPage />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/watchlater"
          element={
            <PrivateRoute>
              <WatchLaterPage />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/liked-videos"
          element={
            <PrivateRoute>
              <LikedVideos />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/channel/:username"
          element={
            <PrivateRoute>
              <ChannelPage />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Search />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/your-content"
          element={
            <PrivateRoute>
              <YourContent />{" "}
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
