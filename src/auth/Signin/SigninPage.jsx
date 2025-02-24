import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";
import { lines, reelify, sparc, yt } from "../../assets";
import ReactLoading from "react-loading";
import { Link } from "react-router";
import { LuCircleCheck, LuUsers } from "react-icons/lu";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { MdOutlineVideoLabel } from "react-icons/md";

const Signin = (props) => {
  const { control, handleSubmit, errors, handleLogin, loading } = props;

  return (
    <div className="px-10 w-full h-full relative ">
      <div className="lg:flex  h-full w-full  items-center py-20 ">
        {/* Image with fade effect */}
        <img
          src={lines}
          alt="Fading effect"
          className="fading-image opacity-10 "
        />

        <div className="h-full w-full justify-between items-center hidden lg:flex flex-col px-5 ">
          <div className="h-full flex flex-col gap-10 py-10">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 bg-zinc-600 flex justify-center items-center  rounded-full">
                  <img src={sparc} />
                </div>
                <h2 className="text-lg  roboto-medium">Go ads free</h2>
              </div>
              <h1 className="text-3xl roboto-medium">
                Start your 30-days free trial
              </h1>
              <p className="text-xs flex gap-1 items-center roboto-regular text-[#686767]">
                <LuCircleCheck />
                No credit card required
              </p>
            </div>
            <div>
              <div className="flex flex-col gap-2 ">
                <LuUsers size={25} />

                <h2 className="text-lg  roboto-medium">
                  User Engagement Counts
                </h2>
              </div>

              <p className="text-xs flex gap-1 items-center roboto-regular text-[#686767] mt-1">
                Focus on likes, comments, and shares—these interactions boost
                visibility and help grow your audience.
              </p>
            </div>
            <div>
              <div className="flex flex-col gap-2 ">
                <MdOutlineVideoLabel size={25} />

                <h2 className="text-lg  roboto-medium">Resolution Matters</h2>
              </div>

              <p className="text-xs flex gap-1 items-center roboto-regular text-[#686767] mt-1">
                REELIFY supports resolutions from 144p to 8K, but 1080p is the
                most common standard for high-quality uploads.
              </p>
            </div>{" "}
            <div>
              <div className="flex flex-col gap-2 ">
                <HiOutlineVideoCamera size={30} />

                <h2 className="text-lg  roboto-medium">Video File Format</h2>
              </div>

              <p className="text-xs flex gap-1 items-center roboto-regular text-[#686767] mt-1">
                Use MP4 format with H.264 codec for optimal playback and
                compression quality on REELIFY.
              </p>
            </div>
          </div>
          <div className="flex gap-1 text-xs text-[#aaa] ">
            <p>Terms</p>·<p>Privacy</p>·<p>Docs</p>·<p>Help</p>
          </div>
        </div>

        <div className="h-full w-full justify-center items-center flex flex-col px-5 bg-[#88838321] rounded-3xl ">
          <div className="sm:w-420 md:w-[24rem] flex-center flex-col ">
            <div className="flex items-center gap-3 justify-center">
              <img src={reelify} alt="logo" className="w-12" />
              <h2 className="text-2xl ">Welcome to REELIFY</h2>
            </div>

            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-6 roboto-medium">
              Create an account
            </h2>

            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col gap-2 w-full mt-4"
            >
              <div className="mb-2">
                <label className="block text-gray-700 mb-2 text-sm roboto-medium">
                  Username:
                </label>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: "Username is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      variant=""
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 mb-2 text-sm roboto-medium">
                  Email:
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      variant=""
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg   focus:outline-none "
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 mb-2 text-sm roboto-medium">
                  Full name:
                </label>
                <Controller
                  name="fullName"
                  control={control}
                  rules={{ required: "Full name is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      variant=""
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 mb-2 text-sm roboto-medium ">
                  Password:
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  }}
                  render={({ field }) => (
                    <Input.Password
                      variant=""
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg   "
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                disabled={loading}
                type="submit"
                className="bg-black text-white h-10 rounded-md flex justify-center items-center  "
              >
                {loading ? (
                  <ReactLoading
                    type={"bars"}
                    height={25}
                    width={25}
                    color="white"
                  />
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
            <p className="text-small-regular text-light-2 text-center mt-4">
              Already have an account?
              <Link
                to="/login"
                className="text-[#2fa8ff] text-small-semibold ml-1 "
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Signin;
