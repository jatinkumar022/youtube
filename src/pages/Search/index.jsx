import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchResult";
import { useLocation } from "react-router";
import { connect } from "react-redux";
import { getSearchResults } from "../../redux/slice/search/getSearchResultsSlice";

const SearchResult = ({ callGetSearchResults }) => {
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalVideos, setTotalVideos] = useState(0);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    fetchVideos();
  }, [query]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await callGetSearchResults(query);

      const { videos, meta } = response.payload.data;
      setVideos(videos);
      setTotalVideos(meta.total);
    } catch (error) {
      showMessage("error", error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <SearchComponent
        videos={videos}
        loading={loading}
        totalVideos={totalVideos}
        query={query}
        fetchVideos={fetchVideos}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetSearchResults: (query) => dispatch(getSearchResults(query)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
