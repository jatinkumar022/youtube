import Container from "../../components/common/Container";
import VideoCard from "../../components/common/VideoCard";
import Img from "../../assets/thumbnails/3.jpg";
import channel from "../../assets/thumbnails/channel.jpg";
import sample from "../../assets/video/sample.mp4";

const SubscriptionComponent = ({ subscriptionVideos }) => {
  return (
    <div>
      <div>
        <Container>
          {subscriptionVideos?.map((item, index) => (
            <VideoCard item={item} key={index} />
          ))}
        </Container>
      </div>
    </div>
  );
};

export default SubscriptionComponent;
