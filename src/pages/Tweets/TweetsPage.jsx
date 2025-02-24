import { connect } from "react-redux";
import { TweetFeed } from "../../utils/TweetsUtils";
import { getAllTweets } from "../../redux/slice/tweets/getAllTweetsSlice";
import { getChannel } from "../../redux/slice/users/getChannelSlice";
import { useEffect, useState } from "react";
import { getComments } from "../../redux/slice/comments/getCommentsSlice";
import { updateComment } from "../../redux/slice/comments/updateCommentSlice";
import { deleteComment } from "../../redux/slice/comments/deleteCommentSlice";
import { addComment } from "../../redux/slice/comments/addCommentSlice";
import { isLikedTweet } from "../../redux/slice/likes/isLikedTweetSlice";
import { likeTweet } from "../../redux/slice/likes/likeTweetSlice";
import { updateTweet } from "../../redux/slice/tweets/updateTweetSlice";
import { deleteTweet } from "../../redux/slice/tweets/deleteTweetSlice";
import TweetpageLoader from "../../components/Loaders/TweetPageLoader";
import useMessage from "../../utils/useMessage";

const TweetsPage = (props) => {
  const {
    callGetTweets,
    callCurrentUserData,
    callAddComment,
    callGetComments,
    callUpdateComment,
    callDeleteComment,
    callUpdateTweet,
    callDeleteTweet,
    // likes
    callIsLikedTweet,
    callLikeTweet,
  } = props;
  const { showMessage } = useMessage();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const handleGetTweets = async () => {
      try {
        setLoading(true);
        const response = await callGetTweets();

        setTweets(response?.payload?.data?.tweets);
        setLoading(false);
      } catch (error) {
        showMessage("error", error, 2);

        setLoading(false);
      }
    };
    handleGetTweets();
  }, [callUpdateTweet, callDeleteTweet]);

  const handleGetTweets = async () => {
    try {
      setLoading(true);

      const response = await callGetTweets();

      setTweets(response?.payload?.data?.tweets);
      setLoading(false);
    } catch (error) {
      showMessage("error", error, 2);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => <TweetpageLoader />)
      ) : (
        <TweetFeed
          tweets={tweets}
          callCurrentUserData={callCurrentUserData}
          callAddComment={callAddComment}
          callGetComments={callGetComments}
          callUpdateComment={callUpdateComment}
          callDeleteComment={callDeleteComment}
          callIsLikedTweet={callIsLikedTweet}
          callLikeTweet={callLikeTweet}
          callUpdateTweet={callUpdateTweet}
          callDeleteTweet={callDeleteTweet}
          handleGetTweets={handleGetTweets}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    callCurrentUserData: state.getCurrentUserData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    callGetTweets: () => dispatch(getAllTweets()),
    callAddComment: (comment) => dispatch(addComment(comment)),
    callGetComments: (tweetId) => dispatch(getComments(tweetId)),
    callUpdateComment: (comment) => dispatch(updateComment(comment)),
    callDeleteComment: (commentId) => dispatch(deleteComment(commentId)),

    callIsLikedTweet: (tweetId) => dispatch(isLikedTweet(tweetId)),
    callLikeTweet: (tweetId) => dispatch(likeTweet(tweetId)),

    callUpdateTweet: (data) => dispatch(updateTweet(data)),
    callDeleteTweet: (tweet) => dispatch(deleteTweet(tweet)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TweetsPage);
