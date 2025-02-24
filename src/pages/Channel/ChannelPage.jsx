import React, { useState } from "react";
import { Link } from "react-router";
import SwiperComponent from "../../components/common/Swiper";
import { LuShare } from "react-icons/lu";
import TabComponent from "../../components/common/Tab";
import Container from "../../components/common/Container";
import VideoCard from "../../components/common/VideoCard";
import PlaylistCard from "../../components/common/PlaylistCard";
const ChannelComponent = (props) => {
  const {
    items,
    playlistItem,
    channelData,
    Video,
    latestVideos,
    mostViewedVideos,
    handleSubscribe,
  } = props;
  const [activeTab, setActiveTab] = useState("1");

  // Function to change the tab
  const goToVideosTab = () => {
    setActiveTab("2"); // "2" is the key for the "Videos" tab
  };
  const home = (
    <>
      <div className="p-4 border-b border-[#aaa] dark:border-[#aaaaaa96]">
        <div className=" lg:w-full flex flex-col justify-start min-[300px]:items-center lg:items-start">
          <div className="w-full ">
            {latestVideos?.length > 0 ? (
              <>
                <div className="flex justify-between w-full">
                  <h1 className="text-2xl font-semibold">For You</h1>

                  <div className="flex items-center gap-3">
                    <Link
                      className="p-1 text-base h-10 px-5 border border-[#272727] hover:bg-[#272727] rounded-full flex items-center justify-center"
                      onClick={goToVideosTab}
                    >
                      View All
                    </Link>
                  </div>
                </div>
                {/* Card start */}

                <SwiperComponent Video={latestVideos} />
              </>
            ) : (
              <>
                <h1 className="text-lg  font-semibold">For You</h1>
                <p className="text-base text-[#aaa]">
                  Videos for you will show up here.
                  <Link className="text-blue-500">Browse videos</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-[#aaa]  dark:border-[#aaaaaa96]">
        <div className=" lg:w-full flex flex-col justify-start min-[300px]:items-center lg:items-start">
          <div className="w-full ">
            {Video?.length > 0 ? (
              <>
                <div className="flex justify-between w-full">
                  <h1 className="text-2xl font-semibold">Videos</h1>

                  <div className="flex items-center gap-3">
                    <Link
                      className="p-1 text-base h-10 px-5 border border-[#272727] hover:bg-[#272727] rounded-full flex items-center justify-center"
                      onClick={goToVideosTab}
                    >
                      View All
                    </Link>
                  </div>
                </div>
                {/* Card start */}

                <SwiperComponent Video={Video} />
              </>
            ) : (
              <>
                <h1 className="text-lg  font-semibold">Videos</h1>
                <p className="text-base text-[#aaa]">
                  Videos will show up here.
                  <Link className="text-blue-500">Browse videos</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 ">
        <div className=" lg:w-full flex flex-col justify-start min-[300px]:items-center lg:items-start">
          <div className="w-full ">
            {mostViewedVideos?.length > 0 ? (
              <>
                <div className="flex justify-between w-full">
                  <h1 className="text-2xl font-semibold">Popular videos</h1>

                  <div className="flex items-center gap-3">
                    <Link
                      className="p-1 text-base h-10 px-5 border border-[#272727] hover:bg-[#272727] rounded-full flex items-center justify-center"
                      onClick={goToVideosTab}
                    >
                      View All
                    </Link>
                  </div>
                </div>
                {/* Card start */}

                <SwiperComponent Video={mostViewedVideos} />
              </>
            ) : (
              <>
                <h1 className="text-lg  font-semibold">Popular videos</h1>
                <p className="text-base text-[#aaa]">
                  Popular videos will show up here.
                  <Link className="text-blue-500">Browse Popular videos</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const videos = (
    <Container>
      {Video?.map((item) => (
        <VideoCard item={item} key={item?._id} />
      ))}
    </Container>
  );

  const playlist = (
    <Container>
      {playlistItem?.map((item, index) => (
        <PlaylistCard key={index} item={item} />
      ))}
    </Container>
  );
  const about = (
    <>
      <div className="p-3">
        <div className="flex">
          <div>
            <p className="mb-1 text-base font-semibold leading-none text-gray-900 dark:text-white">
              <a href="#" className="hover:underline">
                {channelData?.username}
              </a>
            </p>
            <p className="mb-3 text-sm font-normal"> {channelData?.fullName}</p>
            <p className="mb-4 text-sm">About channel.</p>
            <ul className="text-sm">
              <li className="flex items-center mb-2">
                <span className="me-2 font-semibold text-gray-400">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 21 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6.487 1.746c0 4.192 3.592 1.66 4.592 5.754 0 .828 1 1.5 2 1.5s2-.672 2-1.5a1.5 1.5 0 0 1 1.5-1.5h1.5m-16.02.471c4.02 2.248 1.776 4.216 4.878 5.645C10.18 13.61 9 19 9 19m9.366-6h-2.287a3 3 0 0 0-3 3v2m6-8a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </span>
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {channelData?.email}
                </a>
              </li>
              <li className="flex items-start mb-2">
                <span className="me-2 font-semibold text-gray-400">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                  </svg>
                </span>
                <span className="-mt-1">
                  {channelData?.subscribersCount} people Subscribed this channel
                </span>
              </li>
            </ul>
            <div className="flex mb-3 -space-x-3 rtl:space-x-reverse">
              <img
                className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                src={channelData?.avatar}
                alt=""
              />
              <img
                className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                src={channelData?.avatar}
                alt=""
              />
              <img
                className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                src={channelData?.avatar}
                alt=""
              />
              <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-400 border-2 border-white rounded-full hover:bg-gray-500 dark:border-gray-800 cursor-default">
                +3
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="p-4 min-[500px]:p-10  min-[600px]:px-32 min-[800px]:px-18 ">
        {channelData?.coverImage ? (
          <div
            className="w-full relative  mb-8"
            style={{
              paddingTop: "calc(100% * 94 / 569)", // Maintain aspect ratio 94:569
              height: 0,
            }}
          >
            <img
              src={channelData?.coverImage}
              className="absolute top-0 left-0 w-full h-full rounded-xl object-cover "
            />
          </div>
        ) : (
          ""
        )}

        <div className=" lg:w-full flex flex-col justify-start">
          <div className="flex flex-col gap-3  w-full ">
            <div className="flex items-center gap-4">
              <div className="">
                <img
                  src={channelData?.avatar}
                  className="rounded-full w-[70px] min-[500px]:w-[143px]"
                />
              </div>
              <div className="flex flex-col gap-1 min-[500px]:gap-2 w-full mt-4">
                <h1 className="text-xl min-[500px]:text-2xl font-[650]">
                  {channelData?.fullName}
                </h1>
                <div className="flex text-xs min-[500px]:text-sm font-semibold text-[#525252] dark:text-[#aaa] gap-1">
                  <p> {channelData?.username} </p>
                </div>
                <div className="flex text-xs min-[500px]:text-sm font-semibold text-[#525252] dark:text-[#aaa] gap-1">
                  <p>{channelData?.subscribersCount} Subscribers </p>
                  <p>•</p>
                  <p>{channelData?.channelsSubscribedToCount} Subscribed</p>
                </div>
                <div className="min-[750px]:flex gap-1 hidden mt-4">
                  {channelData?.isSubscribed ? (
                    <button
                      className="p-2 w-40 rounded-full dark:bg-[#272727] bg-[#f2f2f2] hover:dark:bg-[#2f2f2f] text-sm font-medium flex items-center justify-center gap-2"
                      onClick={() => handleSubscribe(channelData?._id)}
                    >
                      Subscribed
                    </button>
                  ) : (
                    <button
                      className="p-2 w-40 rounded-full dark:bg-[#ffffff] bg-[#000000] hover:dark:bg-[#e2e2e2] hover:bg-[#181818] text-white dark:text-black text-sm font-medium flex items-center justify-center gap-2"
                      onClick={() => handleSubscribe(channelData?._id)}
                    >
                      Subscribe
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-1 w-full min-[750px]:hidden  ">
              {channelData?.isSubscribed ? (
                <button
                  className="p-2  w-full rounded-full dark:bg-[#272727] bg-[#f2f2f2] hover:dark:bg-[#2f2f2f] text-sm font-medium flex items-center justify-center gap-2"
                  onClick={() => handleSubscribe(channelData?._id)}
                >
                  Subscribed
                </button>
              ) : (
                <button
                  className="p-2 w-full rounded-full dark:bg-[#ffffff] bg-[#000000] hover:dark:bg-[#e2e2e2] hover:bg-[#181818] text-white dark:text-black text-sm font-medium flex items-center justify-center gap-2"
                  onClick={() => handleSubscribe(channelData?._id)}
                >
                  Subscribe
                </button>
              )}

              <button className="p-2  w-full rounded-full dark:bg-[#272727] bg-[#f2f2f2] hover:dark:bg-[#2f2f2f] text-sm font-medium flex items-center justify-center gap-2">
                <LuShare size={17} />
                Share
              </button>
            </div>
          </div>
        </div>
        <>
          <TabComponent
            home={home}
            videos={videos}
            playlist={playlist}
            about={about}
            activeKey={activeTab}
            onTabChange={setActiveTab}
          />
        </>
      </div>
    </>
  );
};

export default ChannelComponent;
