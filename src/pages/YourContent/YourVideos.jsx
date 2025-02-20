import React, { useState } from "react";
import { format, isToday, isYesterday, compareDesc } from "date-fns"; // Added compareDesc for date sorting
import { useNavigate } from "react-router";
import { TbWorld, TbWorldOff } from "react-icons/tb";

import { formatTime, timeAgo } from "../../utils/timeAgo";

const VideoComponent = ({ Video }) => {
  const navigate = useNavigate();

  // Function to group Video by date

  const separateDateAndTime = (isoString) => {
    const [date, time] = isoString.split("T");
    return { date, time: time.split(".")[0] };
  };
  const groupByDate = (items) => {
    const grouped = items?.reduce((acc, item) => {
      const dateKey = format(
        new Date(separateDateAndTime(item?.createdAt)?.date),
        "yyyy-MM-dd"
      );
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(item);
      return acc;
    }, {});

    return grouped;
  };

  // Render the grouped Video
  const renderGroupedVideo = (groupedVideo) => {
    // Sort dates: Today first, then Yesterday, then descending
    const sortedDates = Object.keys(groupedVideo).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);

      if (isToday(dateA)) return -1;
      if (isToday(dateB)) return 1;

      if (isYesterday(dateA)) return -1;
      if (isYesterday(dateB)) return 1;

      return compareDesc(dateA, dateB); // Descending order for other dates
    });

    return sortedDates.map((date) => {
      let title;
      const itemDate = new Date(date);
      if (isToday(itemDate)) title = "Today";
      else if (isYesterday(itemDate)) title = "Yesterday";
      else title = format(itemDate, "MMMM d, yyyy");

      return (
        <div key={date} className="mb-6 ">
          {/* Date Header */}
          <h2 className="text-lg  font-semibold text-gray-700 dark:text-gray-200 mb-4">
            {title}
          </h2>
          {/* Cards for the Date */}
          <div className="grid gap-4">
            {groupedVideo[date].map((item) => (
              <div
                key={item?.id}
                className="p-4 bg-white rounded-lg shadow w-full dark:bg-[#222222] flex max-[1220px]:flex-col gap-3 relative cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 ">
                  <div className="relative aspect-[16/9] min-[1220px]:max-w-xs">
                    <img
                      src={item?.thumbnail}
                      alt={item?.title}
                      className="rounded-lg aspect-[16/9] w-full h-full object-cover"
                      onClick={() => navigate(`/video/${item._id}`)}
                    />
                    <p className="absolute bottom-1 right-1 bg-zinc-900 py-[2px] px-1 text-[13px] bg-opacity-70 rounded-md text-white">
                      {formatTime(item?.duration)}
                    </p>
                  </div>
                </div>
                {/* Title and Channel Info */}
                <div className="flex-1 min-w-0">
                  <h1
                    className="text-pretty font-medium text-gray-800 dark:text-gray-200 break-words roboto-medium"
                    onClick={() => navigate(`/video/${item._id}`)}
                  >
                    {item?.title}
                  </h1>
                  <div className="flex gap-1 text-[#5e5c5c] dark:text-[#c5c3c3] mt-2">
                    <p className="flex gap-2 items-center roboto-regular">
                      {item?.isPublished ? (
                        <>
                          <TbWorld /> public
                        </>
                      ) : (
                        <>
                          <TbWorldOff /> Private
                        </>
                      )}
                    </p>
                    <p>•</p>
                    <p className="roboto-regular">{item?.views} views</p>
                  </div>
                  <p className="text-[#5e5c5c] dark:text-[#c5c3c3] roboto-regular">
                    Last updated: {timeAgo(item?.updatedAt)}{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  const groupedVideo = groupByDate(Video);

  return (
    <div className="max-[768px]:w-full max-[768px]:flex flex-col items-center md:max-w-3xl md:mx-auto p-4 rounded-lg shadow">
      {groupedVideo !== undefined ? (
        <>
          {Object?.keys(groupedVideo)?.length > 0 ? (
            renderGroupedVideo(groupedVideo)
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No search Video available.
            </p>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default VideoComponent;
