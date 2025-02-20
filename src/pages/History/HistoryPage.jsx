import React from "react";
import { format, isToday, isYesterday, compareDesc } from "date-fns"; // Added compareDesc for date sorting
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router";

const HistoryComponent = ({ history }) => {
  const navigate = useNavigate();

  // Function to group history by date
  const groupByDate = (items) => {
    const grouped = items.reduce((acc, item) => {
      const dateKey = format(new Date(item.date), "yyyy-MM-dd");
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
                key={item.id}
                className="p-4 bg-white rounded-lg shadow dark:bg-[#222222] max-[768px]:max-w-80 flex max-[768px]:flex-col gap-3 relative cursor-pointer"
                onClick={() => navigate("/video")}
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0">
                  <div className="relative w-fit">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="rounded-lg object-cover"
                    />
                    <p className="absolute bottom-1 right-1 bg-zinc-900 py-[2px] px-1 text-[10px] bg-opacity-70 rounded-md text-white">
                      11:20
                    </p>
                  </div>
                </div>

                {/* Title and Channel Info */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-pretty font-medium text-gray-800 dark:text-gray-200 break-words">
                    {item.title}
                  </h1>
                  <div className="flex gap-1 text-[#aaa]">
                    <p>{item.channel}</p>
                    <p>•</p>
                    <p>{item.views}</p>
                  </div>
                </div>

                {/* Remove Icon */}
                <div className="absolute right-3 bottom-3 p-2 hover:dark:bg-[#353535] rounded-full cursor-pointer hover:bg-[#f6f1f1]">
                  <RxCross1 />
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
        Search History
      </h1>
      {Object.keys(groupedHistory).length > 0 ? (
        renderGroupedHistory(groupedHistory)
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          No search history available.
        </p>
      )}
    </div>
  );
};

export default HistoryComponent;
