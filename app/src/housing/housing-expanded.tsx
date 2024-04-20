import { useEffect, useState } from "react";
import { HousingItem as HousingItemType } from "@/lib/types";
import StarRating from "../components/catalog/star-rating";
import { useStore } from "@/lib/store";
import HousingCarousel from "./housing-carousel";
import SingleHousingContainer from "../components/map/single-housing-container";
import NearbyPlaces from "@/housing/nearby-places";
import { fetchHousingItem } from "@/lib/api";

type HousingItemProps = {
    housingItem: HousingItemType;
}

const HousingExpanded = (props: HousingItemProps) => {
    const { housingItem } = props;
    const id = housingItem.id
    const additionalImages = [housingItem.imageURL, housingItem.imageURL];
    const user = useStore((state) => state.user);
    const [reviewCount, setReviewCount] = useState(housingItem.reviewCount);
    const [avgRating, setAvgRating] = useState(housingItem.avgRating);
    const [aggregateReview, setAggregateReview] = useState(housingItem.aggregateReview);
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const getHousingItem = async () => {
          const housingData = await fetchHousingItem(id);
          setReviewCount(housingData.reviewCount);
          setAvgRating(housingData.avgRating)
          setAggregateReview(housingData.aggregateReview);
        };
        getHousingItem();
    });

    return (
        <div className="p-6 max-w-7xl mx-auto border border-slate-300 shadow-md bg-white rounded-lg">
            <div className="relative mx-6">
                <HousingCarousel housingImages={additionalImages} />
            </div>

            <div className="mt-4 text-left">
                <div className="text-xl font-bold">{housingItem.name}</div>
                <div className="text-lg">{housingItem.address}</div>
                <div className="flex justify-left my-2">
                    <StarRating rating={avgRating} />
                    <span className="ml-2">{reviewCount} reviews</span>
                </div>
                <div className="flex justify-left my-2">
                    <div className="text-lg font-bold">{housingItem.price}</div>
                    <div className="mx-2"> | </div>
                    <div>{housingItem.distance} miles from JHU Homewood Campus</div>
                </div>
                <div>
                    {reviewCount > 0 &&
                        aggregateReview && user && (
                        <div className="max-w my-3 bg-blue-50 rounded-lg shadow border border-gray-200">
                            <div className="flex px-4 py-2 border-b border-gray-200">
                                <div>
                                    <div className="mt-2 font-bold mb-2">Students say:</div>
                                    <p>{aggregateReview}</p>
                                    <div className="mt-2 text-sm italic mb-4">
                                        AI-generated from the text of customer reviews
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                    <button id="nearby-map-button" onClick={toggleExpanded} className="text-blue-500 underline py-4">
                        {expanded ? "Collapse Map" : "See Map and Nearby Locations"}
                    </button>
                <div className="flex justify-center"> 
                    {expanded && <SingleHousingContainer item={housingItem} />}
                </div>
                {expanded && <NearbyPlaces />}
                </div>
        </div>
    );
};

export default HousingExpanded;