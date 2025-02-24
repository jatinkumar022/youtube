import Container from "../../components/common/Container";
import VideoCard from "../../components/common/VideoCard";

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
