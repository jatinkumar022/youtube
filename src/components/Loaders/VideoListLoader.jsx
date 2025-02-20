import React from "react";
import { Skeleton } from "antd";

// Helper function to check dark mode preference
const isDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const VideoListLoader = () => {
  // Check if the user prefers dark mode
  const darkMode = isDarkMode();
  const skeletonStyles = {
    borderRadius: "19px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkMode ? "rgba(255, 255, 255, 0.05)" : "#e0e0e0",
    // Width and height based on screen size
    width: "90%",
    height: "20em",
    // Responsive sizing
  };

  return (
    <>
      <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md max-w-2xl mx-auto my-4 relative w-full min-[768px]:flex hidden">
        {/* Tweet Header */}
        <div className="flex  gap-4 ">
          <Skeleton.Node
            active
            style={{
              backgroundColor: darkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "#e0e0e0",
              // Adjust color based on theme
              height: "170px",
              width: "280px",
              borderRadius: "10px",
            }}
          />
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
              <Skeleton.Input
                active
                style={{
                  width: "281px",
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
                    width: "181px",
                    minWidth: "51px",
                    height: "8px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0", // Adjust color based on theme
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 ">
                <Skeleton.Avatar
                  active
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0", // Adjust color based on theme
                  }}
                />
                <Skeleton.Input
                  active
                  style={{
                    minWidth: "21px",
                    width: "81px",
                    height: "12px",
                    marginTop: "4px",
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
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md max-w-2xl mx-auto my-4 relative w-full min-[768px]:flex hidden">
        {/* Tweet Header */}
        <div className="flex  gap-4 ">
          <Skeleton.Node
            active
            style={{
              backgroundColor: darkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "#e0e0e0",
              // Adjust color based on theme
              height: "170px",
              width: "280px",
              borderRadius: "10px",
            }}
          />
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
              <Skeleton.Input
                active
                style={{
                  width: "281px",
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
                    width: "181px",
                    minWidth: "51px",
                    height: "8px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0", // Adjust color based on theme
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 ">
                <Skeleton.Avatar
                  active
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0", // Adjust color based on theme
                  }}
                />
                <Skeleton.Input
                  active
                  style={{
                    minWidth: "21px",
                    width: "81px",
                    height: "12px",
                    marginTop: "4px",
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
      </div>
      <div className=" ml-11 mb-4  flex-col rounded-2xl   min-[768px]:hidden flex ">
        <Skeleton.Node
          active
          style={{
            ...skeletonStyles,
            // Additional styles for responsiveness
            width: "90%", // You can modify width as per your screen size
            height: "calc(100vw * 0.5)", // Make height proportional to the screen width
          }}
        />
        <div className="mt-2 flex gap-3">
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

                @media (min-width: 768px) {
                  .dynamic-skeleton {
                    width: 70%; /* Adjust width for larger screens */
                    height: calc(100vw * 0.4); /* Adjust height dynamically */
                  }
                }
                @media (min-width: 1024px) {
                  .dynamic-skeleton {
                    width: 60%; /* Adjust for even larger screens */
                    height: calc(100vw * 0.3); /* Adjust height dynamically */
                  }
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoListLoader;
