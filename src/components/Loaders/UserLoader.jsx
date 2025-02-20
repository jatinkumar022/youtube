import { Skeleton } from "antd";
import React from "react";
const isDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const UserLoader = () => {
  const darkMode = isDarkMode();
  return (
    <>
      <div className="p-4 min-[500px]:p-10  min-[600px]:px-32 min-[800px]:px-18 ">
        <div className=" lg:w-full flex flex-col justify-start">
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
                    height: "100px",
                    width: "100px",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 min-[500px]:gap-2 w-full">
                <h1 className="">
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
                <div className="flex gap-1">
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
                <div className="gap-1 sm:flex hidden">
                  <div className="flex justify-center items-center h-9  text-[14px] font-[600]">
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
            </div>{" "}
            <div className="gap-1 sm:hidden flex">
              <div className="flex justify-center items-center h-9  text-[14px] font-[600]">
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
        </div>
      </div>
      <div className="p-4 min-[500px]:p-10  min-[600px]:px-32 min-[800px]:px-18  ">
        <div className=" lg:w-full flex flex-col justify-start min-[300px]:items-center lg:items-start">
          <div className="w-full ">
            <>
              <h1>
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
              </h1>
              <p>
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
                <div>
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
                </div>
              </p>
            </>
          </div>
        </div>
      </div>

      <div className="p-4 min-[500px]:p-10  min-[600px]:px-32 min-[800px]:px-18  ">
        <div className=" lg:w-full flex flex-col justify-start min-[300px]:items-center lg:items-start">
          <div className="w-full ">
            <div className="flex justify-between w-full">
              <h1 className="text-2xl font-semibold">
                {" "}
                <Skeleton.Input
                  active
                  style={{
                    width: "181px",
                    minWidth: "51px",
                    height: "18px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0", // Adjust color based on theme
                  }}
                />
              </h1>

              <div className="flex items-center gap-3">
                <div className=" flex items-center justify-center">
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

                <Skeleton.Button
                  active
                  style={{
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0",
                    // Adjust color based on theme
                    // height: "70px",
                    minWidth: "80px",
                    borderRadius: "50rem",
                  }}
                />
              </div>
            </div>
            {/* Card start */}
            <div className="flex gap-5 mt-2 lg">
              <Skeleton.Node
                active
                style={{
                  borderRadius: "19px",
                  width: "221px",
                  height: "129px",
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0", // Adjust color based on theme
                }}
              />{" "}
              <span className="min-[681px]:flex hidden">
                <Skeleton.Node
                  active
                  style={{
                    borderRadius: "19px",
                    width: "221px",
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
                    width: "221px",
                    height: "129px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0", // Adjust color based on theme
                  }}
                />
              </span>
              <span className="min-[1173px]:flex hidden">
                <Skeleton.Node
                  active
                  style={{
                    borderRadius: "19px",
                    width: "221px",
                    height: "129px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0", // Adjust color based on theme
                  }}
                />
              </span>
              <span className="min-[1405px]:flex hidden">
                <Skeleton.Node
                  active
                  style={{
                    borderRadius: "19px",
                    width: "221px",
                    height: "129px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0", // Adjust color based on theme
                  }}
                />
              </span>
              <span className="min-[1669px]:flex hidden">
                <Skeleton.Node
                  active
                  style={{
                    borderRadius: "19px",
                    width: "221px",
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
      </div>

      <div className="p-4 min-[500px]:p-10  min-[600px]:px-32 min-[800px]:px-18  ">
        <div className=" lg:w-full flex flex-col justify-start min-[300px]:items-center lg:items-start">
          <div className="w-full ">
            <div className="flex justify-between w-full">
              <h1 className="text-2xl font-semibold">
                {" "}
                <Skeleton.Input
                  active
                  style={{
                    width: "181px",
                    minWidth: "51px",
                    height: "18px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0", // Adjust color based on theme
                  }}
                />
              </h1>

              <div className="flex items-center gap-3">
                <div className=" flex items-center justify-center">
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

                <Skeleton.Button
                  active
                  style={{
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0",
                    // Adjust color based on theme
                    // height: "70px",
                    minWidth: "80px",
                    borderRadius: "50rem",
                  }}
                />
              </div>
            </div>
            {/* Card start */}
            <div className="flex gap-5 mt-2 lg">
              <Skeleton.Node
                active
                style={{
                  borderRadius: "19px",
                  width: "221px",
                  height: "129px",
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#e0e0e0", // Adjust color based on theme
                }}
              />{" "}
              <span className="min-[681px]:flex hidden">
                <Skeleton.Node
                  active
                  style={{
                    borderRadius: "19px",
                    width: "221px",
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
                    width: "221px",
                    height: "129px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0", // Adjust color based on theme
                  }}
                />
              </span>
              <span className="min-[1173px]:flex hidden">
                <Skeleton.Node
                  active
                  style={{
                    borderRadius: "19px",
                    width: "221px",
                    height: "129px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0", // Adjust color based on theme
                  }}
                />
              </span>
              <span className="min-[1405px]:flex hidden">
                <Skeleton.Node
                  active
                  style={{
                    borderRadius: "19px",
                    width: "221px",
                    height: "129px",
                    backgroundColor: darkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#e0e0e0", // Adjust color based on theme
                  }}
                />
              </span>
              <span className="min-[1669px]:flex hidden">
                <Skeleton.Node
                  active
                  style={{
                    borderRadius: "19px",
                    width: "221px",
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
      </div>
    </>
  );
};

export default UserLoader;
