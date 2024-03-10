import { ReviewWithUserData } from "@/lib/types";
import PostAvatar from "../post/post-avatar";
import PostHeader from "../post/post-header";
import StarRating from "../catalog/star-rating";
import { Link } from "react-router-dom";
import ReviewFooter from "./review-footer";

const Review = ({ review }: { review: ReviewWithUserData }) => {
    const {content, timestamp, rating, user} = review;
    const avatar = user?.avatar;
    const firstName = user?.firstName;
    const lastName = user?.lastName;
    const jhed = user?.email.split("@")[0]; // Extract jhed from email
    return (
      <div className="max-w mx-2 my-3 bg-blue-50 rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="flex items-center px-4 py-2 border-b border-gray-200">
          <div className="flex-none">
            <Link to={`/users/${jhed}`}>
                <PostAvatar imageUrl={avatar} displayName={`${firstName} ${lastName}`} />
            </Link>
          </div>
          <div className="flex-grow ml-4 text-black">
            <div className="flex items-center justify-between">
              <div>
                <PostHeader name={`${firstName} ${lastName}`} timestamp={timestamp} />
              </div>
              <StarRating rating={rating} />
            </div>
          </div>
        </div>
        <div className="px-4 py-3">
          <p>
            {content}
          </p>
        </div>
        <ReviewFooter review={review}/>
      </div>
    );
  };
  
  export default Review;
  
  
  
  