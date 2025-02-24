import React from "react";
import { format, isToday, isYesterday, compareDesc } from "date-fns"; // Added compareDesc for date sorting
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router";
import { formatTime, timesAgo } from "../../utils/timeAgo";

const HistoryComponent = ({ history }) => {
  const navigate = useNavigate();
  // Function to group history by date
  const groupByDate = (items) => {
    const grouped = items.reduce((acc, item) => {
      const dateKey = format(new Date(item.watchedAt), "yyyy-MM-dd");
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(item);
      return acc;
    }, {});

    return grouped;
  };

  // Render the grouped history
  const renderGroupedHistory = (groupedHistory) => {
    // Sort dates: Today first, then Yesterday, then descending
    const sortedDates = Object.keys(groupedHistory).sort((a, b) => {
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
            {groupedHistory[date].map((item) => (
              <div
                key={item?._id}
                className="p-4 bg-white rounded-lg shadow w-full dark:bg-[#222222] flex max-[1220px]:flex-col gap-3 relative cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 ">
                  <div className="relative aspect-[16/9] min-[1220px]:max-w-xs">
                    <img
                      src={item?.video?.thumbnail}
                      alt={item?.video?.title}
                      className="rounded-lg aspect-[16/9] w-full h-full object-cover"
                      onClick={() => navigate(`/video/${item._id}`)}
                    />
                    <p className="absolute bottom-1 right-1 bg-zinc-900 py-[2px] px-1 text-[13px] bg-opacity-70 rounded-md text-white">
                      {formatTime(item?.video?.duration)}
                    </p>
                  </div>
                </div>
                {/* Title and Channel Info */}
                <div className="p-3 flex flex-col gap-2">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-zinc-900  ">
                      <img
                        src={item?.video?.owner?.avatar || ""}
                        alt=""
                        className="object-cover w-10 h-10 rounded-full bg-gray-300 dark:bg-zinc-900"
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 roboto-medium"
                        onClick={() => navigate(`/video/${item?._id}`)}
                      >
                        {item?.video?.title}
                      </h3>
                      <p
                        className="text-xs text-gray-600 dark:text-gray-400 roboto-medium"
                        onClick={() =>
                          navigate(`/channel/${item?.owner?.username}`)
                        }
                      >
                        {item?.video?.owner?.fullName}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 roboto-medium">
                        {item?.video?.views} •{" "}
                        {timesAgo(item?.video?.createdAt)}
                      </p>
                    </div>
                    {/* Popover Button */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  const groupedHistory = groupByDate(history);

  return (
    <div className="max-[768px]:w-full max-[768px]:flex flex-col items-center md:max-w-3xl md:mx-auto p-4 rounded-lg shadow">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Watch History
      </h1>
      {Object.keys(groupedHistory)?.length > 0 ? (
        renderGroupedHistory(groupedHistory)
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          No Watch history available.
        </p>
      )}
    </div>
  );
};

export default HistoryComponent;
