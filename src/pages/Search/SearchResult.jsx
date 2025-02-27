import React from "react";
import { useNavigate } from "react-router";
import { formatTime, timesAgo } from "../../utils/timeAgo";
import ReactLoading from "react-loading";

const SearchComponent = ({ videos, loading, query }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="search-results relative">
        {/* Video List */}
        {loading ? (
          <div className="fixed inset-0 flex justify-center items-center">
            <ReactLoading type={"bars"} height={35} width={35} color="white" />
          </div>
        ) : (
          <>
            <div className="mb-6 mt-2">
              {/* Date Header */}
              <h2 className="text-lg  font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Search Results for "{query}"
              </h2>

              {videos?.map((item) => (
                <div className="grid gap-4">
                  <div className="p-4 bg-transparent rounded-lg shadow w-full  flex max-[800px]:flex-col gap-3 relative cursor-pointer">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 ">
                      <div className="relative aspect-[16/9] min-[800px]:max-w-xs">
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
                    <div className="p-3 flex flex-col gap-2">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-zinc-900  ">
                          <img
                            src={item?.owner?.avatar || ""}
                            alt=""
                            className="object-cover w-10 h-10 rounded-full bg-gray-300 dark:bg-zinc-900"
                          />
                        </div>
                        <div className="flex-1">
                          <h3
                            className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 roboto-medium"
                            onClick={() => navigate(`video/${item?._id}`)}
                          >
                            {item?.title}
                          </h3>
                          <p
                            className="text-xs text-gray-600 dark:text-gray-400 roboto-medium"
                            onClick={() =>
                              navigate(`/channel/${item?.owner?.username}`)
                            }
                          >
                            {item?.owner?.fullName}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 roboto-medium flex gap-2">
                            {item?.views} views • {timesAgo(item?.createdAt)}
                          </p>
                        </div>
                        {/* Popover Button */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchComponent;
