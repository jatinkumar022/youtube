import React, { useEffect } from "react";
import SubscriptionComponent from "./SubscriptionPage";
import SubscriptionChannel from "./SubscriptionChannel";
import { Dropdown, Menu } from "antd";
import { CheckOutlined, DownOutlined } from "@ant-design/icons";

import { useState } from "react";
import { useSearchParams } from "react-router";
import { connect } from "react-redux";
import { getSubscribedChannels } from "../../redux/slice/subscription/getSubscribedChannelsSlice";
import { getChannel } from "../../redux/slice/users/getChannelSlice";
import { toggleSubscribe } from "../../redux/slice/subscription/toggleSubscribeSlice";
import { getChannelVideos } from "../../redux/slice/videos/getChannelVideosSlice";
import ChannelsLoader from "../../components/Loaders/ChannelsLoader";
import VideosLoader from "../../components/Loaders/VideosLoader";
import Container from "../../components/common/Container";
import useMessage from "../../utils/useMessage";

const SubscriptionPage = (props) => {
  const {
    callGetSubscribedChannels,
    callGetSubscribedChannelsData,
    callGetChannel,
    callToggleSubscribe,
    callGetChannelVideos,
  } = props;
  const { showMessage } = useMessage();
  const [selected, setSelected] = useState("channels");
  const [searchParams] = useSearchParams();
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionVideos, setSubscriptionVideos] = useState([]);
  const [loadingChannels, setLoadingChannels] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const channels =
    callGetSubscribedChannelsData?.getSubscribedChannelsData?.data;

  const handleMenuClick = (e) => {
    setSelected(e.key);
  };
  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "videos" || type === "channels") {
      setSelected(type);
    }
  }, [searchParams]);

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          key: "channels",
          label: (
            <div className="flex items-center justify-between dark:bg-[#2c2c2c] bg-[#f2f2f2] dark:hover:bg-[#323131] text-black dark:text-white p-2">
              Channels
              {selected === "channels" && <CheckOutlined />}
            </div>
          ),
        },
        {
          key: "videos",
          label: (
            <div className="flex items-center justify-between dark:bg-[#2c2c2c] bg-[#f2f2f2] dark:hover:bg-[#323131] text-black dark:text-white p-2">
              Videos
              {selected === "videos" && <CheckOutlined />}
            </div>
          ),
        },
      ]}
    />
  );

  //  ====================

  useEffect(() => {
    const handleGetSubscribedChannels = async () => {
      setLoadingChannels(true);
      await callGetSubscribedChannels();
      setLoadingChannels(false);
    };
    handleGetSubscribedChannels();
  }, []);

  useEffect(() => {
    const getChannelInfo = async () => {
      setLoadingChannels(true);

      if (channels && channels.length > 0) {
        // Fetch channel data in parallel and wait for all results
        const channelPromises = channels.map(async (channel) => {
          const response = await callGetChannel(channel?.username);
          return response?.payload?.data; // Return the payload data from each call
        });

        // Wait for all channel data to be fetched
        const resolvedSubscriptions = await Promise.all(channelPromises);

        // Once all are fetched, update the subscriptions state
        setSubscriptions(resolvedSubscriptions);
        setLoadingChannels(false);
      }
    };

    getChannelInfo();
  }, [channels]); // Run effect when channels change

  const handleSubscribe = async (userId) => {
    const response = await callToggleSubscribe(userId);
    const getChannelInfo = async () => {
      if (channels && channels.length > 0) {
        // Fetch channel data in parallel and wait for all results
        const channelPromises = channels.map(async (channel) => {
          const response = await callGetChannel(channel?.username);
          return response?.payload?.data; // Return the payload data from each call
        });

        // Wait for all channel data to be fetched
        const resolvedSubscriptions = await Promise.all(channelPromises);

        // Once all are fetched, update the subscriptions state
        setSubscriptions(resolvedSubscriptions);
      }
    };

    getChannelInfo();
  };

  useEffect(() => {
    const getSubscriptionVideos = async () => {
      try {
        setLoadingVideos(true);
        let allVideos = [];

        for (let subscription of subscriptions) {
          if (subscription?._id) {
            const response = await callGetChannelVideos(subscription?._id);
            if (response?.payload?.data?.videos) {
              allVideos = [...allVideos, ...response?.payload?.data?.videos]; // Combine videos from each subscription
            }
          }
        }

        const shuffledVideos = allVideos.sort(() => Math.random() - 0.5);

        setSubscriptionVideos(shuffledVideos);
        setLoadingVideos(false);
      } catch (error) {
        showMessage("error", error.message, 2);

        setLoadingVideos(false);
      }
    };

    if (subscriptions.length > 0) {
      getSubscriptionVideos();
    }
  }, [subscriptions]);

  return (
    <>
      <div className="flex justify-between items-center p-7">
        {selected === "channels" ? (
          <h2 className="md:text-3xl text-lg sm:text-2xl font-semibold ">
            All Subscriptions
          </h2>
        ) : (
          <h2 className="md:text-3xl text-lg sm:text-2xl font-semibold">
            Latest Videos
          </h2>
        )}
        <div>
          <Dropdown overlay={menu} trigger={["click"]}>
            <button
              className={`flex px-4 p-2 gap-4 rounded-md items-center justify-between bg-[#f7f3f3] dark:bg-[#272727]  dark:hover:bg-[#323131] text-black dark:text-white }`}
            >
              {selected === "channels" ? "Channels" : "Videos"}
              <DownOutlined className="sm:ml-2" />
            </button>
          </Dropdown>
        </div>
      </div>

      {selected === "channels" ? (
        loadingChannels ? (
          Array.from({ length: 10 }).map((_, index) => <ChannelsLoader />)
        ) : (
          <SubscriptionChannel
            subscriptions={subscriptions}
            handleSubscribe={handleSubscribe}
          />
        )
      ) : loadingVideos ? (
        <Container>
          {Array.from({ length: 10 }).map((_, index) => (
            <VideosLoader />
          ))}
        </Container>
      ) : (
        <SubscriptionComponent subscriptionVideos={subscriptionVideos} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    callGetAllVideosData: state.getAllVideosData,
    callGetSubscribedChannelsData: state.getSubscribedChannelsData,
    callGetChannelData: state.getChannelData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetSubscribedChannels: () => dispatch(getSubscribedChannels()),
    callGetChannel: (username) => dispatch(getChannel(username)),
    callToggleSubscribe: (userId) => dispatch(toggleSubscribe(userId)),
    callGetChannelVideos: (channelId) => dispatch(getChannelVideos(channelId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPage);
