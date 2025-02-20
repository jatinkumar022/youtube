import React from "react";
import { Skeleton } from "antd";

// Helper function to check dark mode preference
const isDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const VideosLoader = () => {
  // Check if the user prefers dark mode
  const darkMode = isDarkMode();

  return (
    <div className="homepage-loader">
      <div className="w-full">
        <Skeleton.Node
          active
          style={{
            borderRadius: "19px",
            width: "221px",
            height: "129px",
            backgroundColor: darkMode ? "rgba(255, 255, 255, 0.05)" : "#e0e0e0", // Adjust color based on theme
          }}
        />
        <div className="mt-1 flex gap-3">
          <Skeleton.Avatar
            active
            style={{
              backgroundColor: darkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "#e0e0e0", // Adjust color based on theme
            }}
          />
          <div className="flex flex-col mt-1">
            <Skeleton.Input
              active
              style={{
                height: "10px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0", // Adjust color based on theme
              }}
            />
            <div className="flex gap-3">
              <Skeleton.Input
                active
                style={{
                  width: "51px",
                  minWidth: "51px",
                  height: "8px",
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0", // Adjust color based on theme
                }}
              />
              <Skeleton.Avatar
                active
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0", // Adjust color based on theme
                }}
              />
              <Skeleton.Input
                active
                style={{
                  width: "51px",
                  minWidth: "51px",
                  height: "8px",
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0", // Adjust color based on theme
                }}
              />
            </div>
            <style jsx>{`
              :where(
                  .css-dev-only-do-not-override-1kf000u
                ).ant-skeleton.ant-skeleton-active
                .ant-skeleton-title,
              :where(
                  .css-dev-only-do-not-override-1kf000u
                ).ant-skeleton.ant-skeleton-active
                .ant-skeleton-paragraph
                > li,
              :where(
                  .css-dev-only-do-not-override-1kf000u
                ).ant-skeleton.ant-skeleton-active
                .ant-skeleton-avatar,
              :where(
                  .css-dev-only-do-not-override-1kf000u
                ).ant-skeleton.ant-skeleton-active
                .ant-skeleton-button,
              :where(
                  .css-dev-only-do-not-override-1kf000u
                ).ant-skeleton.ant-skeleton-active
                .ant-skeleton-input,
              :where(
                  .css-dev-only-do-not-override-1kf000u
                ).ant-skeleton.ant-skeleton-active
                .ant-skeleton-image {
                background: linear-gradient(
                  90deg,
                  rgb(93 93 93 / 38%) 25%,
                  rgb(93 93 93 / 24%) 37%,
                  rgb(91 91 91 / 45%) 63%
                );
                background-size: 400% 100%;
                animation-name: css-dev-only-do-not-override-1kf000u-ant-skeleton-loading;
                animation-duration: 1.4s;
                animation-timing-function: ease;
                animation-iteration-count: infinite;
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosLoader;
