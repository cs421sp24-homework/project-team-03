import { HousingItem as HousingItemType } from "@/lib/types";
import StarRating from "../catalog/star-rating";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

type HousingItemProps = {
    housingItem: HousingItemType;
}

// const HousingExpanded = (props: HousingItemProps) => {
//     const { housingItem} = props;
//     const additionalImages = [housingItem.imageURL, housingItem.imageURL]
//     return (
//         <div className="p-6 max-w-7xl mx-auto border border-slate-300 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white rounded-lg">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                 <div className="lg:col-span-2">
//                     <Carousel showStatus={false} infiniteLoop={true} dynamicHeight={true}>
//                         <div>
//                             <img src={housingItem.imageURL} alt="Main Housing" />
//                         </div>
//                         {additionalImages.map((imgUrl, index) => (
//                             <div key={index}>
//                                 <img src={imgUrl} alt={`Additional Housing ${index}`} />
//                             </div>
//                         ))}
//                     </Carousel>
//                 </div>
//                 <div className="flex flex-col justify-between space-y-4">
//                     <div className="text-lg font-bold">{housingItem.name}</div>
//                     <div>{housingItem.address}</div>
//                     <div className="flex items-center">
//                         <StarRating rating={housingItem.avgRating} />
//                         <span className="ml-2">{housingItem.reviewCount} reviews</span>
//                     </div>
//                     <div className="font-bold">{housingItem.price}</div>
//                     <div>{housingItem.distance} miles from JHU Homewood</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HousingExpanded;

const HousingExpanded = (props: HousingItemProps) => {
    const { housingItem} = props;
    const additionalImages = [housingItem.imageURL, housingItem.imageURL]

    return (
        <div className="p-6 max-w-7xl mx-auto border border-slate-300 shadow-md bg-white rounded-lg">
            <div className="relative mx-6">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>
                            <img src={housingItem.imageURL} alt="Main Housing" style={{ maxHeight: '500px', width: 'auto', objectFit: 'contain', margin: 'auto' }} />
                        </CarouselItem>
                        {additionalImages.map((imgUrl, index) => (
                            <CarouselItem key={index}>
                                <img src={imgUrl} alt={`Additional Housing ${index}`} style={{ maxHeight: '500px', width: 'auto', objectFit: 'contain', margin: 'auto' }} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
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
            </div>
        </div>
    );
};

export default HousingExpanded;


