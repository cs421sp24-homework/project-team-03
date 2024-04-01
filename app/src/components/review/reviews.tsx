import useQueryReviews from "@/hooks/use-query-reviews";
import Review from "./review";
import React from "react";

const Reviews = ({ housingId, query }: { housingId: string, query?: string }) => {
    const { reviews } = useQueryReviews(housingId, query);
  return (
      <div>
          {reviews.map((review) => (
              <Review review={review} key={review.id} />
          ))}
      </div>
  );
});

export default Reviews;