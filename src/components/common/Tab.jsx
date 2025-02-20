import React from "react";
import { Tabs } from "antd";

const ChannelTabs = ({
  home,
  videos,
  playlist,
  about,
  activeKey,
  onTabChange,
}) => {
  const tabItems = [
    {
      key: "1",
      label: "Home",
      children: home,
    },
    {
      key: "2",
      label: "Videos",

      children: videos,
    },
    {
      key: "3",
      label: "Playlists",

      children: playlist,
    },
    {
      key: "4",
      label: "About",

      children: about,
    },
  ];

  return (
    <div className="py-5">
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        indicator={<div className="ant-tabs-ink-bar" />}
        renderTabBar={(props, DefaultTabBar) => (
          <div className="w-full">
            <DefaultTabBar {...props} />
          </div>
        )}
        closeIcon={true}
        activeKey={activeKey}
        onChange={onTabChange}
        className="text-gray-900 dark:text-white sticky"
      >
        {/* Custom Tab Styles */}
      </Tabs>
    </div>
  );
};

export default ChannelTabs;
