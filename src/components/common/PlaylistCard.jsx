import React from "react";
import { useNavigate } from "react-router";
import { IoMdPlay } from "react-icons/io";
import { defaultPlaylist } from "../../assets";
const PlaylistCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex flex-col justify-start items-stretch w-full max-w-[450px] sm:max-w-[400px] md:max-w-[300px] lg:max-w-[390px] 2xl:max-w-[490px] 3xl:max-w-[590px] bg-white rounded-lg  dark:bg-[#0b0b0b] overflow-hidden transition-transform duration-300 cursor-pointer"
        onClick={() => navigate(`/playlist/${item?._id}`)}
      >
        <div className="relative w-full h-0 pb-[56.25%] group">
          {item.videos?.length > 0 ? (
            <img
              src={item?.videos[0]?.thumbnail}
              // alt={item?.name}
              className="absolute top-0 left-0 rounded-lg w-full h-full object-cover  group-hover:brightness-50 transition duration-300"
            />
          ) : (
            <img
              src={defaultPlaylist}
              // alt={item?.name}
              className="absolute top-0 left-0 rounded-lg w-full h-full object-cover  group-hover:brightness-50 transition duration-300"
            />
          )}

          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center rounded-lg ">
            <div className="text-white text-sm  gap-2 items-center hidden group-hover:flex transition duration-300">
              <IoMdPlay size={18} />
              Play all
            </div>
          </div>
        </div>

        <div className="p-3 flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
            {item?.name}
          </h3>
          {item.videos?.length > 0 ? (
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 h-4">
              {item?.videos?.length > 0 &&
                item.videos
                  .map((video) => video?.owner?.fullName)
                  .filter(Boolean) // Remove undefined/null values
                  .join(", ")}
            </p>
          ) : (
            <p className="text-xs text-gray-600 dark:text-gray-400 ">
              No Videos
            </p>
          )}

          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 mt-3">
            {item?.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default PlaylistCard;
