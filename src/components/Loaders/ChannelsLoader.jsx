import React from "react";
import { Skeleton } from "antd";

// Helper function to check dark mode preference
const isDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const ChannelsLoader = () => {
  // Check if the user prefers dark mode
  const darkMode = isDarkMode();

  return (
    <div className="lg:px-60 px-3 sm:px-5 pt-10 flex flex-col justify-center item center w-full gap-9 cursor-pointer">
      {/* Tweet Header */}
      <div className="flex justify-between">
        <div className="flex items-center gap-4 mb-4">
          <Skeleton.Avatar
            active
            style={{
              backgroundColor: darkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "#e0e0e0",
              // Adjust color based on theme
              height: "70px",
              width: "70px",
            }}
          />
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
              <Skeleton.Input
                active
                style={{
                  minWidth: "51px",
                  width: "142px",
                  height: "12px",
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0", // Adjust color based on theme
                }}
              />
            </h1>

            <div className="flex gap-3 ">
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
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Skeleton.Button
            active
            style={{
              backgroundColor: darkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "#e0e0e0",
              // Adjust color based on theme
              // height: "70px",
              minWidth: "100px",
              borderRadius: "50rem",
            }}
          />
        </div>
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
  );
};

export default ChannelsLoader;
