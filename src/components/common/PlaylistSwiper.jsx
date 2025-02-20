import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { IoMdMore, IoMdPlay } from "react-icons/io";
import { useNavigate } from "react-router";
import { formatTime, timesAgo } from "../../utils/timeAgo";
import { defaultPlaylist } from "../../assets";

const PlaylistSwiperComponent = ({ playlist }) => {
  const navigate = useNavigate();
  let ownerNames;
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={16}
      slidesPerView={1}
      centeredSlides={false}
      style={{
        "--swiper-navigation-color": "#white",
        "--swiper-navigation-size": "20px",
        // Replace with your desired color
      }}
      navigation={{
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      }}
      breakpoints={{
        480: {
          slidesPerView: 1, // Mobile devices
        },

        500: {
          slidesPerView: 2, // Desktops
        },
        980: {
          slidesPerView: 3,
        },
      }}
      className="w-full md:max-[804px]:max-w-[650px]"
    >
      {playlist?.map((item) => (
        <SwiperSlide
          key={item?._id}
          className={`flex-shrink-0 w-auto md:max-w-[350px] mt-3 bg-white rounded-lg dark:bg-[#0b0b0b] transition-transform duration-300 `}
        >
          <div className="relative w-full h-0 pb-[56.25%]">
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
                <div
                  className="text-white text-sm  gap-2 items-center hidden group-hover:flex transition duration-300 cursor-pointer"
                  onClick={() => navigate(`/playlist/${item?._id}`)}
                >
                  <IoMdPlay size={18} />
                  Play all
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 flex flex-col gap-2">
            <div className="flex gap-3">
              {/* <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-zinc-900"></div> */}
              <div className="flex-1">
                <h3
                  className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1 cursor-pointer"
                  onClick={() => navigate(`/playlist/${item?._id}`)}
                >
                  {item?.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {item?.description}
                </p>

                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 h-4">
                  {item?.videos?.length > 0 &&
                    item.videos
                      .map((video) => video?.owner?.fullName)
                      .filter(Boolean) // Remove undefined/null values
                      .join(", ")}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {timesAgo(item?.createdAt)}
                </p>
              </div>

              <IoMdMore className="text-gray-500 dark:text-gray-300 mt-1" />
            </div>
          </div>
        </SwiperSlide>
      ))}
      {/* Custom navigation buttons */}
      <div className="swiper-button-prev text-white text-2xl absolute top-1/2 left-0 transform -translate-y-1/2">
        {/* Custom previous icon */}
      </div>
      <div className="swiper-button-next text-white text-2xl absolute top-1/2 right-0 transform -translate-y-1/2">
        {/* Custom next icon */}
      </div>
    </Swiper>
  );
};

export default PlaylistSwiperComponent;
