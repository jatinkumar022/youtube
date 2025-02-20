import { Skeleton } from "antd";
import React from "react";
const isDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const YourChannelLoader = () => {
  const darkMode = isDarkMode();
  return (
    <>
      <div className="p-4 mt-10 min-[600px]:px-32 min-[800px]:px-18 min-[1350px]:px-52">
        <div className="lg:w-full lg:hidden flex flex-col justify-start ">
          {/* Cover Image */}
          <Skeleton.Node
            active
            style={{
              borderRadius: "19px",
              width: "100%",
              height: "129px",
              backgroundColor: darkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "#e0e0e0", // Adjust color based on theme
            }}
          />
        </div>
        <div className="lg:w-full hidden lg:flex flex-col justify-start ">
          {/* Cover Image */}
          <Skeleton.Node
            active
            style={{
              borderRadius: "19px",
              width: "100%",
              height: "199px",
              backgroundColor: darkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "#e0e0e0", // Adjust color based on theme
            }}
          />
        </div>
        {/* User Information Section */}
        <div className="lg:w-full flex flex-col justify-start mt-6 p-6 rounded-lg bg-gradient-to-r from-[#dbdbdbaa] to-[#f1f1f1aa] dark:from-[#313131] dark:to-[#161515]">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-6 relative">
              {/* Avatar Image */}
              <div className="relative flex md:hidden group overflow-hidden rounded-full w-[100px] min-[500px]:w-[170px]">
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
                {/* Avatar Edit Button (Appears on hover) */}
              </div>
              <div className="relative hidden md:flex group overflow-hidden rounded-full w-[100px] min-[500px]:w-[170px]">
                <Skeleton.Avatar
                  active
                  style={{
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0",
                    // Adjust color based on theme
                    height: "100px",
                    width: "100px",
                  }}
                />
                {/* Avatar Edit Button (Appears on hover) */}
              </div>

              {/* Editable User Details */}
              <div className="flex flex-col gap-2 w-full">
                <>
                  <h1 className="text-xl min-[500px]:text-2xl font-semibold dark:text-[#dbdada] text-[#494949] ">
                    <Skeleton.Input
                      active
                      style={{
                        minWidth: "51px",
                        width: "142px",
                        height: "17px",
                        backgroundColor: darkMode
                          ? "rgba(255, 255, 255, 0.05)"
                          : "#e0e0e0", // Adjust color based on theme
                      }}
                    />
                  </h1>
                  <div className="flex text-sm min-[500px]:text-base font-semibold text-gray-400 dark:text-gray-500 gap-1">
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
                            : "#e0e0e0", // Adjust color based on theme
                        }}
                      />
                    </p>
                  </div>
                </>

                {/* Edit Button */}
                <div className="flex gap-1">
                  <Skeleton.Button
                    active
                    style={{
                      backgroundColor: darkMode
                        ? "rgba(255, 255, 255, 0.05)"
                        : "#e0e0e0",
                      // Adjust color based on theme
                      // height: "70px",
                      minWidth: "200px",
                      borderRadius: "50rem",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 p-4 bg-white dark:bg-[#1f1f1f] rounded-lg shadow-lg mt-5">
          <div className="flex flex-col items-center p-5 bg-gray-100 dark:bg-[#2a2a2a] rounded-lg">
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                // height: "70px",
                minWidth: "100px",
                width: "100%",
                borderRadius: "50rem",
              }}
            />
            <Skeleton.Input
              active
              style={{
                width: "51px",
                minWidth: "51px",
                height: "8px",
                marginTop: "10px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0", // Adjust color based on theme
              }}
            />
          </div>

          <div className="flex flex-col items-center p-5 bg-gray-100 dark:bg-[#2a2a2a] rounded-lg">
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                // height: "70px",
                minWidth: "100px",
                width: "100%",
                borderRadius: "50rem",
              }}
            />
            <Skeleton.Input
              active
              style={{
                width: "51px",
                minWidth: "51px",
                height: "8px",
                marginTop: "10px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0", // Adjust color based on theme
              }}
            />
          </div>

          <div className="flex flex-col items-center p-5 bg-gray-100 dark:bg-[#2a2a2a] rounded-lg">
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                // height: "70px",
                minWidth: "100px",
                width: "100%",
                borderRadius: "50rem",
              }}
            />
            <Skeleton.Input
              active
              style={{
                width: "51px",
                minWidth: "51px",
                height: "8px",
                marginTop: "10px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0", // Adjust color based on theme
              }}
            />
          </div>

          <div className="flex flex-col items-center p-5 bg-gray-100 dark:bg-[#2a2a2a] rounded-lg">
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                // height: "70px",
                minWidth: "100px",
                width: "100%",
                borderRadius: "50rem",
              }}
            />
            <Skeleton.Input
              active
              style={{
                width: "51px",
                minWidth: "51px",
                height: "8px",
                marginTop: "10px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0", // Adjust color based on theme
              }}
            />
          </div>
        </div>
        {/* Channel Information Section */}
        <div className="lg:w-full flex flex-col justify-start mt-6 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-[#0f0f0f] bg-white p-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="min-w-9">
                <Skeleton.Avatar
                  active
                  style={{
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0",
                    // Adjust color based on theme
                    height: "20px",
                    width: "20px",
                  }}
                />
              </div>
              <div className="">
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
              </div>
            </div>
            <div className="">
              <Skeleton.Input
                active
                style={{
                  minWidth: "51px",
                  width: "82px",
                  height: "12px",
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0", // Adjust color based on theme
                }}
              />

              <span>
                {" "}
                <Skeleton.Input
                  active
                  style={{
                    minWidth: "51px",
                    width: "82px",
                    height: "12px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0", // Adjust color based on theme
                  }}
                />
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h1>
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
            <div className=" mt-5  flex gap-3">
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
            </div>
            <div className="text-sm roboto-medium flex gap-3">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourChannelLoader;
