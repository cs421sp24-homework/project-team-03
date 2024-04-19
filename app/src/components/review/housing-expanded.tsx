import { HousingItem as HousingItemType } from "@/lib/types";
import StarRating from "../catalog/star-rating";
import { useStore } from "@/lib/store";
import HousingCarousel from "./housing-carousel";

type HousingItemProps = {
    housingItem: HousingItemType;
}

const HousingExpanded = (props: HousingItemProps) => {
    const { housingItem} = props;
    const additionalImages = [housingItem.imageURL, housingItem.imageURL];
    const user = useStore((state) => state.user);

    return (
        <div className="p-6 max-w-7xl mx-auto border border-slate-300 shadow-md bg-white rounded-lg">
            <div className="relative mx-6">
                <HousingCarousel housingImages={additionalImages} />
            </div>

            <div className="mt-4 text-left">
                <div className="text-xl font-bold">{housingItem.name}</div>
                <div className="text-lg">{housingItem.address}</div>
                <div className="flex justify-left my-2">
                    <StarRating rating={housingItem.avgRating} />
                    <span className="ml-2">{housingItem.reviewCount} reviews</span>
                </div>
                <div className="flex justify-left my-2">
                    <div className="text-lg font-bold">{housingItem.price}</div>
                    <div className="mx-2"> | </div>
                    <div>{housingItem.distance} miles from JHU Homewood Campus</div>
                </div>
            <div>
            {housingItem?.reviewCount > 0 &&
                housingItem?.aggregateReview && user && (
                <div className="max-w my-3 bg-blue-50 rounded-lg shadow border border-gray-200">
                    <div className="flex px-4 py-2 border-b border-gray-200">
                        <div>
                            <div className="mt-2 font-bold mb-2">Students say:</div>
                            <p>{housingItem.aggregateReview}</p>
                            <div className="mt-2 text-sm italic mb-4">
                                AI-generated from the text of customer reviews
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
            </div>
        </div>
    );
};

export default HousingExpanded;


