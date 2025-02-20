import React from "react";
import { Drawer } from "antd";
import { IoMdClose } from "react-icons/io";

const DrawerComponent = ({
  placement,
  open,
  children,
  setOpen,
  title,
  size,
}) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <Drawer
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
        size={size ? size : "default"}
        className="dark:bg-[#212121] dark:text-white "
        bodyStyle={{ padding: 0, overflow: "auto" }}
      >
        <div className="p-3">
          <div className="w-full flex justify-between">
            <h1 className="text-xl mb-3">{title}</h1>
            <button onClick={onClose} className="text-xl ">
              <IoMdClose />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </Drawer>
    </div>
  );
};
export default DrawerComponent;
