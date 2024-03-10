import useQueryReviews from "@/hooks/use-query-reviews";
import Review from "./review";

const Reviews = ({ housingId }: { housingId: string }) => {
    const { reviews } = useQueryReviews(housingId);
  return (
    <div>
      {reviews.map((review) => (
        <Review review={review} key={review.id} />
      ))}
    </div>
  );
};

export default Reviews;