import { HousingItem, Review as ReviewType } from "@/lib/types";
import Review from "./review";
import HousingExpanded from "./housing-expanded";
import Header from "./header";

type HousingWithReviewProps = {
    housingItem: HousingItem;
    reviews: ReviewType[];
};
  
const HousingItemWithReviews = ({ housingItem, reviews }: HousingWithReviewProps) => {
    return (
      <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-4xl">
        <div className="inline-block">
          <HousingExpanded housingItem={housingItem} />
        </div>
        <Header housingId={housingItem.id}/>
        <div className="w-full">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Review key={review.id} review={review} />
            ))
          ) : (
            <p className="text-center text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default HousingItemWithReviews;
  