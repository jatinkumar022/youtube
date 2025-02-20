import React from "react";

const Search = () => {
  return (
    <div className="dark:bg-[#212121] dark:text-white p-1 rounded-md ">
      <div className="p-3 hover:bg-[#f2f2f2] cursor-pointer w-full hover:dark:bg-[#2a2c2c]  flex items-center gap-3 rounded-lg ">
        <div className="flex justify-between gap-20 items-center">
          <div className="flex gap-3">
            <div>
              <img src={avatar1} className="w-12 rounded-full" />
            </div>
            <div>
              <p className="text-base font-normal"> For you: Channel Name</p>
              <p className="text-sm font-normal text-[#aaa]">
                For you: Channel Name
              </p>
            </div>
          </div>
          <div>
            <img src={thumbnail} className="w-24 rounded-md " />
          </div>
        </div>
      </div>

      <div className="p-3 hover:bg-[#f2f2f2] cursor-pointer w-full hover:dark:bg-[#2a2c2c]  flex items-center gap-3 rounded-lg ">
        <div className="flex justify-between gap-20 items-center">
          <div className="flex gap-3">
            <div>
              <img src={avatar1} className="w-12 rounded-full" />
            </div>
            <div>
              <p className="text-base font-normal"> For you: Channel Name</p>
              <p className="text-sm font-normal text-[#aaa]">
                For you: Channel Name
              </p>
            </div>
          </div>
          <div>
            <img src={thumbnail} className="w-24 rounded-md " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
