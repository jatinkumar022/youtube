import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";

// Helper function to check dark mode preference
const isDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const VideoLoader = () => {
  // Check if the user prefers dark mode
  const darkMode = isDarkMode();
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1200);
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-3 px-5 flex gap-5 h-full w-full">
      <div className="w-full">
        <div className="relative w-full rounded-lg pb-2">
          <div className="relative aspect-[16/9] w-full md:w-auto rounded-xl bg-[#c2c2c2] dark:bg-[#2b2b2b]">
            <Skeleton.Node
              active
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "inherit",
              }}
            />
          </div>
        </div>
        <div className=" w-full h-full">
          <h1 className="font-semibold text-lg py-1 roboto-bold">
            <Skeleton.Input
              active
              style={{
                minWidth: "51px",
                width: "142px",
                height: "17px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
              }}
            />
          </h1>
          <div className="flex sm:items-center flex-col sm:flex-row py-4  justify-between gap-3">
            <div className="flex items-center gap-3 w-full ">
              <div className="flex-shrink-0 cursor-pointer">
                <Skeleton.Avatar
                  active
                  style={{
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0",

                    height: "70px",
                    width: "70px",
                  }}
                />
              </div>

              <div className="flex-1 flex items-center min-w-0 ">
                <div className="flex-1 min-w-0 cursor-pointer">
                  <h1 className="font-[500] truncate">
                    <Skeleton.Input
                      active
                      style={{
                        minWidth: "51px",
                        width: "142px",
                        height: "17px",
                        backgroundColor: darkMode
                          ? "rgba(255, 255, 255, 0.05)"
                          : "#e0e0e0",
                      }}
                    />
                  </h1>
                  <p className="text-[#606060] text-xs dark:text-[#aaa]">
                    <Skeleton.Input
                      active
                      style={{
                        minWidth: "51px",
                        width: "142px",
                        height: "17px",
                        backgroundColor: darkMode
                          ? "rgba(255, 255, 255, 0.05)"
                          : "#e0e0e0",
                      }}
                    />
                  </p>
                </div>

                <div className="flex-shrink-0 ml-4">
                  <button className="px-5 py-[8px] text-[14px] font-[600] rounded-full">
                    <Skeleton.Button
                      active
                      style={{
                        backgroundColor: darkMode
                          ? "rgba(255, 255, 255, 0.05)"
                          : "#e0e0e0",
                        minWidth: "200px",
                        borderRadius: "50rem",
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  gap-3 w-full">
            <div className="flex justify-center items-center h-9  text-[14px] font-[600]">
              <Skeleton.Button
                active
                style={{
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0",

                  minWidth: "100px",
                  width: "100%",
                  borderRadius: "50rem",
                }}
              />
              <Skeleton.Button
                active
                style={{
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0",

                  minWidth: "100px",
                  width: "100%",
                  borderRadius: "50rem",
                }}
              />
            </div>

            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",

                minWidth: "100px",
                width: "100%",
                borderRadius: "50rem",
              }}
            />
          </div>
          <div className="w-full text-[14px] relative mt-10 rounded-xl bg-[#f2f2f2]   dark:bg-[#272727] cursor-pointer p-2 px-4">
            <div className="font-[550] flex gap-2 flex-wrap items-center">
              <p>
                {" "}
                <Skeleton.Input
                  active
                  style={{
                    width: "51px",
                    minWidth: "51px",
                    height: "8px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0",
                  }}
                />
              </p>
              <p>
                {" "}
                <Skeleton.Input
                  active
                  style={{
                    width: "51px",
                    minWidth: "51px",
                    height: "8px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0",
                  }}
                />
              </p>
              <p className="text-[#606060] dark:text-[#aaa] truncate">
                {" "}
                <Skeleton.Input
                  active
                  style={{
                    width: "51px",
                    minWidth: "51px",
                    height: "8px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0",
                  }}
                />
              </p>
            </div>

            <Skeleton.Input
              active
              style={{
                width: "51px",
                minWidth: "51px",
                height: "8px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
              }}
            />
          </div>
        </div>
      </div>

      {isWideScreen ? (
        <div>
          <div className=" p-6 rounded-lg shadow-md max-w-2xl mx-auto my-4 relative w-full min-[768px]:flex hidden">
            <div className="flex  gap-4 ">
              <Skeleton.Node
                active
                style={{
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0",
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
                        : "#e0e0e0",
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
                          : "#e0e0e0",
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
                          : "#e0e0e0",
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
                          : "#e0e0e0",
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
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default VideoLoader;
