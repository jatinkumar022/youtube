import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import signInSlice from "../slice/users/signinSlice"
import logInSlice from "../slice/users/loginSlice"
import logoutSlice from "../slice/users/logoutSlice"

import getCurrentUserSlice from "../slice/users/getCurrentUserSlice"
import getChannelSlice from "../slice/users/getChannelSlice"
import changePasswordSlice from "../slice/users/changePasswordSlice"
import updateAvatarSlice from "../slice/users/updateAvatarSlice"
import updateUserSlice from "../slice/users/updateUserSlice"
import updateCoverImage from "../slice/users/updateCoverImage"

import uploadTweetSlice from "../slice/tweets/uploadTweetSlice"
import getTweetsSlice from "../slice/tweets/getTweetsSlice"
import getAllTweetsSlice from "../slice/tweets/getAllTweetsSlice"
import updateTweetSlice from "../slice/tweets/updateTweetSlice"
import deleteTweetSlice from "../slice/tweets/deleteTweetSlice"

import uploadVideoSlice from "../slice/videos/uploadVideoSlice"
import updateVideoSlice from "../slice/videos/updateVideoSlice"
import deleteVideoSlice from "../slice/videos/deleteVideoSlice"
import togglePublishSlice from "../slice/videos/togglePublishSlice"
import getAllVideosSlice from "../slice/videos/getAllVideoSlice"
import getVideoByIdSlice from "../slice/videos/getVideoByIdSlice"
import incrementVideoViewSlice from "../slice/videos/incrementVideoViewSlice"
import getWatchHistorySlice from "../slice/users/getWatchHistorySlice"

import getChannelStatsSlice from "../slice/dashboard/getChannelStatsSlice"
import getMyVideosSlice from "../slice/dashboard/getMyVideosSlice"

import addCommentSlice from "../slice/comments/addCommentSlice"
import updateCommentSlice from "../slice/comments/updateCommentSlice"
import deleteCommentSlice from "../slice/comments/deleteCommentSlice"
import getCommentsSlice from "../slice/comments/getCommentsSlice"

import likeVideoSlice from "../slice/likes/likeVideoSlice"
import likeCommentSlice from "../slice/likes/likeCommentSlice"
import likeTweetSlice from "../slice/likes/likeTweetSlice"
import getLikedVideosSlice from "../slice/likes/getLikedVideosSlice"
import isLikedVideoSlice from "../slice/likes/isLikedVideoSlice"
import isLikedTweetSlice from "../slice/likes/isLikedTweetSlice"
import isLikedCommentSlice from "../slice/likes/isLikedCommentSlice"

import toggleSubscribeSlice from "../slice/subscription/toggleSubscribeSlice"
import getSubscribedChannelsSlice from "../slice/subscription/getSubscribedChannelsSlice"
import getChannelVideosSlice from "../slice/videos/getChannelVideosSlice"

import addVideoToPlaylistSlice from "../slice/playlist/addVideoToPlaylistSlice"
import createPlaylistSlice from "../slice/playlist/createPlaylistSlice"
import deletePlaylistSlice from "../slice/playlist/deletePlaylistSlice"
import getPlaylistByIdSlice from "../slice/playlist/getPlaylistByIdSlice"
import getUserPlaylistsSlice from "../slice/playlist/getUserPlaylists"
import getChannelPlaylistsSlice from "../slice/playlist/getChannelPlaylistsSlice"
import removeVideoFromPlaylistSlice from "../slice/playlist/removeVideoFromPlaylistSlice"
import updatePlaylistSlice from "../slice/playlist/updatePlaylistSlice"


const store = configureStore({
  reducer: {

    signInData: signInSlice,
    logInData: logInSlice,
    logoutData: logoutSlice,
    // Users slices

    getCurrentUserData: getCurrentUserSlice,
    getChannelData: getChannelSlice,
    changePasswordData: changePasswordSlice,
    updateAvatarData: updateAvatarSlice,
    updateUserData: updateUserSlice,
    updateCoverData: updateCoverImage,

    // Tweets slices

    uploadTweetData: uploadTweetSlice,
    getTweetsData: getTweetsSlice,
    getAllTweetsData: getAllTweetsSlice,
    updateTweetData: updateTweetSlice,
    deleteTweetData: deleteTweetSlice,

    // Videos slices

    uploadVideoData: uploadVideoSlice,
    updateVideoData: updateVideoSlice,
    deleteVideoData: deleteVideoSlice,
    togglePublishData: togglePublishSlice,
    getVideoByIdData: getVideoByIdSlice,
    getAllVideosData: getAllVideosSlice,
    getChannelVideosData: getChannelVideosSlice,
    incrementVideoViewData: incrementVideoViewSlice,
    getWatchHistoryData: getWatchHistorySlice,
    // Dashboard slices

    getChannelStatsData: getChannelStatsSlice,
    getMyVideosData: getMyVideosSlice,

    // Comments slice 

    addCommentData: addCommentSlice,
    deleteCommentData: deleteCommentSlice,
    getCommentsData: getCommentsSlice,
    updateCommentData: updateCommentSlice,

    // Likes slice

    likeVideoData: likeVideoSlice,
    likeCommentData: likeCommentSlice,
    likeTweetData: likeTweetSlice,

    getLikedVideosData: getLikedVideosSlice,
    isLikedVideoData: isLikedVideoSlice,
    isLikedTweetData: isLikedTweetSlice,
    isLikedCommentData: isLikedCommentSlice,

    // Subscribe slice

    toggleSubscribeData: toggleSubscribeSlice,
    getSubscribedChannelsData: getSubscribedChannelsSlice,

    // Playlist slice

    addVideoToPlaylistData: addVideoToPlaylistSlice,
    createPlaylistData: createPlaylistSlice,
    deletePlaylistData: deletePlaylistSlice,
    getPlaylistByIdData: getPlaylistByIdSlice,
    getUserPlaylistsData: getUserPlaylistsSlice,
    getChannelPlaylistsData: getChannelPlaylistsSlice,
    removeVideoFromPlaylistData: removeVideoFromPlaylistSlice,
    updatePlaylistData: updatePlaylistSlice
  },

  middleware: (getDefaultMiddleware) => {
    return [thunk];
  },
});

export default store;