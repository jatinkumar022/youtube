import { Skeleton } from "antd";
import React from "react";
const isDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const ChannelLoader = () => {
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
              height: "89px",
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
        <div className=" lg:w-full flex flex-col justify-start -mt-8">
          <div className="flex flex-col gap-3  w-full ">
            <div className="flex items-center gap-4">
              <div className="">
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
              </div>
              <div className="flex flex-col gap-1 min-[500px]:gap-2 w-full mt-20">
                <h1 className="text-xl min-[500px]:text-2xl font-[650]">
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
                <div className="flex text-xs min-[500px]:text-sm font-semibold text-[#525252] dark:text-[#aaa] gap-1">
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
                <div className="flex text-xs min-[500px]:text-sm font-semibold text-[#525252] dark:text-[#aaa] gap-1">
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
                  <p>
                    {" "}
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
                  </p>
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
                <div className="min-[750px]:flex gap-1 hidden mt-4">
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
            <div className="flex gap-1 w-full min-[750px]:hidden  ">
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
        <div className="w-full mt-10">
          <div className="flex gap-4">
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                height: "10px",
                minWidth: "70px",
                borderRadius: "50rem",
              }}
            />
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                height: "10px",
                minWidth: "70px",
                borderRadius: "50rem",
              }}
            />
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                height: "10px",
                minWidth: "70px",
                borderRadius: "50rem",
              }}
            />
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                height: "10px",
                minWidth: "70px",
                borderRadius: "50rem",
              }}
            />
          </div>

          <p className="text-gray-500 dark:text-gray-400">
            <hr className="h-px  bg-gray-200 border-0 dark:bg-zinc-700" />
          </p>

          <div className="flex items-center justify-between mt-5">
            <Skeleton.Input
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                height: "30px",
                minWidth: "70px",
                borderRadius: "50rem",
              }}
            />
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                height: "40px",
                minWidth: "70px",
                borderRadius: "50rem",
              }}
            />
          </div>
          <div className="flex gap-5 mt-2 lg">
            <Skeleton.Node
              active
              style={{
                borderRadius: "19px",
                width: "211px",
                height: "129px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0", // Adjust color based on theme
              }}
            />{" "}
            <span className="min-[550px]:flex hidden">
              <Skeleton.Node
                active
                style={{
                  borderRadius: "19px",
                  width: "211px",
                  height: "129px",
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0", // Adjust color based on theme
                }}
              />
            </span>
            <span className="min-[965px]:flex hidden">
              <Skeleton.Node
                active
                style={{
                  borderRadius: "19px",
                  width: "211px",
                  height: "129px",
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0", // Adjust color based on theme
                }}
              />
            </span>
          </div>
        </div>

        <div className="w-full mt-10">
          <div className="flex gap-4">
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                height: "10px",
                minWidth: "70px",
                borderRadius: "50rem",
              }}
            />
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                height: "10px",
                minWidth: "70px",
                borderRadius: "50rem",
              }}
            />
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                height: "10px",
                minWidth: "70px",
                borderRadius: "50rem",
              }}
            />
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                height: "10px",
                minWidth: "70px",
                borderRadius: "50rem",
              }}
            />
          </div>

          <p className="text-gray-500 dark:text-gray-400">
            <hr className="h-px  bg-gray-200 border-0 dark:bg-zinc-700" />
          </p>

          <div className="flex items-center justify-between mt-5">
            <Skeleton.Input
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                height: "30px",
                minWidth: "70px",
                borderRadius: "50rem",
              }}
            />
            <Skeleton.Button
              active
              style={{
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0",
                // Adjust color based on theme
                height: "40px",
                minWidth: "70px",
                borderRadius: "50rem",
              }}
            />
          </div>
          <div className="flex gap-5 mt-2 lg">
            <Skeleton.Node
              active
              style={{
                borderRadius: "19px",
                width: "211px",
                height: "129px",
                backgroundColor: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#e0e0e0", // Adjust color based on theme
              }}
            />{" "}
            <span className="min-[550px]:flex hidden">
              <Skeleton.Node
                active
                style={{
                  borderRadius: "19px",
                  width: "211px",
                  height: "129px",
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0", // Adjust color based on theme
                }}
              />
            </span>
            <span className="min-[965px]:flex hidden">
              <Skeleton.Node
                active
                style={{
                  borderRadius: "19px",
                  width: "211px",
                  height: "129px",
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0", // Adjust color based on theme
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelLoader;
