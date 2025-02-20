import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Header from "../components/partials/Header";
import BottomBar from "../components/partials/BottomBar";
import Sidebar from "../components/partials/Sidebar";
import { useLocation, useNavigate } from "react-router";
import VideoUploadPage from "../components/upload/VideoUploadPage";
import { connect } from "react-redux";
import { getSubscribedChannels } from "../redux/slice/subscription/getSubscribedChannelsSlice";

const AppLayout = ({
  children,
  callGetSubscribedChannels,
  callGetSubscribedChannelsData,
}) => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isVideo, setIsVideo] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const innerContainerRef = useRef(null);
  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };
  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size > "640px" && location.pathname === "/search") {
      navigate("/");
    }
  }, [size]);

  useEffect(() => {
    if (location.pathname === "/video") {
      setIsVideo(true);
    }
    if (location.pathname !== "/video") {
      setIsVideo(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signin") {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        if (isAuth) {
          const response = await callGetSubscribedChannels();
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSubscriptions();
  }, [location.pathname]);

  useLayoutEffect(() => {
    if (innerContainerRef.current) {
      innerContainerRef.current.scrollTo({
        top: 0,
        left: 0,
      });
    }
  }, [location.pathname]);

  return (
    <div className="overflow-y-hidden">
      {(location.pathname === "/search" && size < "640px") || isAuth ? (
        <div className="-mt-14"></div>
      ) : (
        <Header
          isVideo={isVideo}
          onUploadClick={toggleModal}
          Subscriptions={
            callGetSubscribedChannelsData?.getSubscribedChannelsData?.data
          }
        />
      )}

      <div className="pt-[3.6rem] pb-[3.6rem] flex h-screen">
        {/* Sidebar - fixed layout */}
        {isVideo || isAuth ? <></> : <Sidebar className="flex-shrink-0" />}

        {/* Main Content */}
        <div
          className="flex-1 overflow-y-auto justify-center"
          ref={innerContainerRef}
        >
          {children}
        </div>
      </div>
      {isModalVisible && (
        <VideoUploadPage
          isVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
      <BottomBar />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    callGetSubscribedChannelsData: state.getSubscribedChannelsData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetSubscribedChannels: () => dispatch(getSubscribedChannels()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
