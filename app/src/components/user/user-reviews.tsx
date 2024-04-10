import { HousingItem, ReviewWithUserData } from "@/lib/types";
import StarRating from "../catalog/star-rating";
import { fetchHousingItem } from "@/lib/api";
import { useEffect, useState } from "react";

const UserReview = ({ review, housingId }: { review: ReviewWithUserData, housingId: string }) => {

  const [housing, setHousing] = useState<HousingItem | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const housingItem = await fetchHousingItem(housingId);
      setHousing(housingItem);
    };

    getUser();
  }, []);

  const {content, timestamp, rating} = review;
  const formattedTimestamp = timestamp ? new Date(timestamp).toLocaleString() : '';

  return (
    <div className="max-w my-3 bg-blue-50 rounded-lg shadow overflow-hidden border border-gray-200">
      <div className="flex items-center px-4 py-2 border-b border-gray-200">
        <div className="flex-none">
        </div>
        <div className="flex-grow text-black">
          {housing?.name && (
            <div id='housingName' className="inline-block align-baseline font-medium text-base">
              {housing.name}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex">
              <div className="">
                <div id='timestamp' className="inline-block align-baseline text-sm text-muted-foreground">
                  {formattedTimestamp}
                </div>
              </div>  
            </div>
            <div>
              <StarRating rating={rating} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3">
        <p>
          {content}
        </p>
      </div>
    </div>
  );
};

export default UserReview;
