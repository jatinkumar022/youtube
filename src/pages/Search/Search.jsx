import React, { useState } from "react";
import { GoHistory } from "react-icons/go";
import VoiceToTextPopover from "../../components/common/VoiceToTextPopover";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router"; // For navigation
import { connect } from "react-redux";
import { getSuggestions } from "../../redux/slice/search/getSuggestionsSlice";

const Search = ({ callGetSuggestions }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate(); // For redirecting to search results page

  // Fetch search suggestions as the user types
  const fetchSuggestions = async (query) => {
    if (query.length > 1) {
      try {
        const response = await callGetSuggestions(query);
        // Safeguard for undefined or unexpected response structure

        if (response?.payload && Array.isArray(response?.payload?.data)) {
          setSuggestions(response?.payload?.data); // Assuming suggestions are in response.data.data
        } else {
          setSuggestions([]); // Clear suggestions if data is not an array
        }
      } catch (error) {
        showMessage("error", error.message);
        setSuggestions([]); // Clear suggestions on error
      }
    } else {
      setSuggestions([]); // Clear suggestions if query is too short
    }
  };

  // Handle search input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchSuggestions(value); // Fetch suggestions while typing
  };

  const handleSearch = () => {
    if (searchQuery?.trim()) {
      setSuggestions([]);
      navigate(`/search-results?query=${searchQuery}`);
    }
  };

  // Handle Enter key for search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle click on suggestion
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.title);
    handleSearch();
    setSuggestions([]);
    // Clear suggestions
  };

  return (
    <div className="p-3 overflow-x-hidden h-full relative">
      <div className="relative sm:hidden flex">
        {/* Search Input */}
        <div className="absolute top-1/2 left-6 transform -translate-y-1/2 text-gray-400">
          <IoIosSearch />
        </div>

        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Trigger search on Enter key
          className="w-full px-5 py-[8px] pl-10 text-sm rounded-l-full dark:text-white text-black bg-white dark:bg-black placeholder-gray-500 focus:outline-none focus:border-blue-300 dark:focus:border-blue-900 border-[1.5px] dark:border-[#222222]"
        />

        {/* Search Icon */}
        <button
          className="dark:bg-[#222222] bg-[#f2f2f2] px-4 rounded-r-full text-gray-400 hover:text-black dark:hover:text-white focus:outline-none"
          onClick={handleSearch} // Trigger search on button click
        >
          <IoIosSearch />
        </button>

        <div className="p-2 dark:bg-[#222222] hover:dark:bg-[#2b2c2c] bg-[#f2f2f2] hover:bg-[#eae9e9] cursor-pointer ml-3 rounded-full">
          <VoiceToTextPopover />
        </div>
      </div>

      {/* Search Suggestions */}
      {suggestions?.length > 0 && (
        <div className="px-3  absolute top-16 left-0 w-full bg-white dark:bg-black  dark:border-[#222222] max-h-60 overflow-auto z-10 text">
          {suggestions?.map((suggestion) => (
            <div
              key={suggestion?._id}
              className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#333333] flex items-center gap-2 rounded-lg"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <GoHistory className="mr-2" />
              <p className="truncate">{suggestion?.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetSuggestions: (query) => dispatch(getSuggestions(query)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
