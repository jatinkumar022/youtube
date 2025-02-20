import React from "react";
import { Switch } from "antd";
import { BulbOutlined, MoonOutlined } from "@ant-design/icons";
import { useDarkMode } from "../../context/DarkModeContext";

const DarkModeSwitch = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  const handleToggle = (checked) => {
    setIsDarkMode(checked);
  };

  return (
    <Switch
      size="small"
      checked={isDarkMode}
      onChange={handleToggle}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<BulbOutlined />}
    />
  );
};

export default DarkModeSwitch;
