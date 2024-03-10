import { HousingItem } from "@/lib/types";
import HousingExpanded from "./housing-expanded";
import Header from "./header";
import Reviews from "./reviews";
import { useStore } from "@/lib/store";

type HousingProps = {
    housingItem: HousingItem;
};

const HousingItemWithReviews = ({ housingItem }: HousingProps) => {

  const user = useStore((state) => state.user);

     return (
    <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-4xl">
      <div className="inline-block">
        <HousingExpanded housingItem={housingItem} />
      </div>
      <Header housingId={housingItem.id} />
      <div className="w-full">
        {user ? (
          housingItem.reviewCount > 0 ? (
            <div>
              <Reviews housingId={housingItem.id} />
            </div>
          ) : (
            <p className="text-center text-gray-500">No reviews yet.</p>
          )
        ) : (
          <p className="text-center text-gray-500">
            You must be logged in to see reviews.
          </p>
        )}
      </div>
    </div>
  );
};
  
export default HousingItemWithReviews;
  