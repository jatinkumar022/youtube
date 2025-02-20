import React from "react";
import { Skeleton } from "antd";

// Helper function to check dark mode preference
const isDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const TweetpageLoader = () => {
  // Check if the user prefers dark mode
  const darkMode = isDarkMode();

  return (
    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md max-w-xl mx-auto my-4 relative w-full">
      {/* Tweet Header */}
      <div className="flex items-center gap-4 mb-4">
        <Skeleton.Avatar
          active
          style={{
            backgroundColor: darkMode ? "rgba(255, 255, 255, 0.05)" : "#e0e0e0",
            // Adjust color based on theme
            height: "50px",
            width: "50px",
          }}
        />
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
            <Skeleton.Input
              active
              style={{
                height: "12px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0", // Adjust color based on theme
              }}
            />
          </h1>
          <div className="flex flex-col ">
            <div className="flex gap-3 -mt-1">
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
      <div className="flex flex-col mb-8">
        <Skeleton.Input
          active
          style={{
            // width: "51px",
            // minWidth: "51px",
            height: "8px",
            backgroundColor: darkMode ? "rgba(255, 255, 255, 0.05)" : "#e0e0e0", // Adjust color based on theme
          }}
        />

        <Skeleton.Input
          active
          style={{
            width: "358px",
            // minWidth: "51px",
            height: "8px",
            backgroundColor: darkMode ? "rgba(255, 255, 255, 0.05)" : "#e0e0e0", // Adjust color based on theme
          }}
        />
      </div>
      <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 absolute bottom-4">
        <div className="flex items-center gap-3">
          <button>
            {" "}
            <Skeleton.Avatar
              active
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0", // Adjust color based on theme
              }}
            />
          </button>
          <button>
            {" "}
            <Skeleton.Button
              active
              style={{
                width: "24px",
                // minWidth: " 30px",
                height: "24px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0", // Adjust color based on theme
              }}
            />
          </button>{" "}
          <button>
            {" "}
            <Skeleton.Button
              active
              style={{
                width: "24px",
                minWidth: " 30px",
                height: "24px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0", // Adjust color based on theme
              }}
            />
          </button>
        </div>
        <p className="text-xs roboto-regular"></p>
      </div>
    </div>
  );
};

export default TweetpageLoader;
