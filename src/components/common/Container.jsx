import React from "react";

const Container = ({ children }) => {
  return (
    <>
      <div className="p-4 bg-white dark:bg-black">
        {/* Flex Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-3 gap-y-8 justify-items-center">
          {children}
        </div>
      </div>
    </>
  );
};

export default Container;
