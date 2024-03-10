import { reviews } from "@/lib/data";
import Review from "./review";

const Reviews = () => {
  return (
    <div>
      {reviews.map((review) => (
        <Review review={review} key={review.id} />
      ))}
    </div>
  );
};

export default Reviews;