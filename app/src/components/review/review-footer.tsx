import { ReviewWithUserData } from "@/lib/types";
import { useStore } from "@/lib/store";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import ReviewActions from "./review-actions";
import { useEffect, useState } from "react";
import { getLikedBy, undoUpvoteReview, upvoteReview } from "@/lib/api";

const ReviewFooter = ({ review }: { review: ReviewWithUserData }) => {
  const {user} = review;
  const userLogged = useStore((state) => state.user);
  const [liked, setLiked] = useState(false);
  const {upvoteCount} = review;

  useEffect(() => {
    const fetchLikedBy = async () => {
        try {
            // Fetch the likedBy array
            const likedBy = await getLikedBy(review.id, review.housingId);
            // Check if the user's ID is included in the likedBy array
            if (userLogged && likedBy.includes(userLogged.id)) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        } catch (error) {
            return null;
        }
    };
    // Call the fetchLikedBy function
    fetchLikedBy();
}, [review.id, review.housingId, userLogged]);

    const handleLike = async () => {
      // Toggle liked state using the functional form of setState
      setLiked(prevLiked => !prevLiked);
      try {
          // Call the appropriate API function based on the liked state
          if (!liked) {
              // If the review is not liked, upvote it
              await upvoteReview(review.id, review.housingId);
          } else {
              // If the review is already liked, undo the upvote
              await undoUpvoteReview(review.id, review.housingId);
          }
          setLiked(!liked);
      } catch (error) {
          // If API call fails, revert the liked state
          setLiked(prevLiked => !prevLiked);
          return null;
      }
  };
  
  
    return (
        <div className="px-2 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-black p-2">Was this helpful?</span>
          <Button id="upvote-button" variant={"ghost"} className="hover:bg-blue-100" onClick={handleLike}>
              {/* Change arrow color based on liked state */}
              <ArrowUpIcon className={`ml-1 h-5 w-5 ${liked ? 'text-blue-500' : 'text-gray-500'}`} /> {`(${upvoteCount})`}
          </Button>
        </div>
        <div>
          {(user.id === userLogged?.id) && (
          <div className="ml-auto">
          <ReviewActions review={review} />
          </div>
        )}
        </div>
      </div>
    );
  };
  export default ReviewFooter;