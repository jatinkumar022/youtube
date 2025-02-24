import { useNavigate } from "react-router";
import { formatSubscribers } from "../../utils/subscriberCount";

const SubscriptionChannel = (props) => {
  const { subscriptions, handleSubscribe } = props;
  const navigate = useNavigate();

  return (
    <div className="lg:px-60 px-3 sm:px-5 pt-10 flex flex-col justify-center item center w-full gap-9 cursor-pointer">
      {subscriptions?.map((item) => (
        <div
          key={item?._id}
          className="flex items-center justify-between w-full cursor-pointer"
        >
          <div
            className="flex items-center   gap-4"
            onClick={() => navigate(`/channel/${item?.username}`)}
          >
            <div className="w-14 max-w-24 min-[380px]:w-24">
              <img
                src={item?.avatar}
                alt=""
                className=" w-full rounded-full border"
              />
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="md:text-2xl text-lg font-semibold">
                {item?.fullName}
              </h1>
              <div className="md:text-sm text-xs flex font-medium text-zinc-400 gap-3">
                <p>@{item?.username}</p>
                <p>•</p>
                <p className="truncate">
                  {formatSubscribers(item?.subscribersCount)} subscribers
                </p>
              </div>
            </div>
          </div>

          <div>
            {item?.isSubscribed ? (
              <button
                className="dark:bg-[#272829]   hover:dark:bg-[#202121] bg-[#f2f2f2] hover:bg-[#eae9e9]  text-black  dark:text-white md:p-4 md:px-6 p-2 px-4  rounded-full font-semibold"
                onClick={() => handleSubscribe(item?._id, item?.username)}
              >
                Subscribed
              </button>
            ) : (
              <button
                className="dark:bg-[#272829]   hover:dark:bg-[#202121] bg-[#f2f2f2] hover:bg-[#eae9e9]  text-black  dark:text-white md:p-4 md:px-6 p-2 px-4   rounded-full font-semibold"
                onClick={() => handleSubscribe(item?._id, item?.username)}
              >
                Subscribe
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionChannel;
