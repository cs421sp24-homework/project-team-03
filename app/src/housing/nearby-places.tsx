import { useState } from "react";
import { Locations, HousingItem as HousingItemType } from "@/lib/types";

const NearbyPlaces = ({ item }: { item: HousingItemType }) => {
    const [groceryStores] = useState<Locations[]>([]);

  // Render the component UI similar to your reference image
  return (
    <div className="nearby-places-container">
        {groceryStores.map((store, index) => {
            if (typeof store.latitude === 'number' && typeof store.longitude === 'number') {
                return (
                    <div key={index} className="nearby-place-card">
                        <h3 className="place-name">{store.displayName}</h3>
                        <p className="place-address">{store.formattedAddress}</p>
                        <p className="place-distance">Distance: {store.distance.toFixed(2)} miles</p>
                        <p className="place-rating">Rating: {store.rating.toFixed(1)} stars</p>
                    </div>
                );
            } else {
                return null;
            }
        })}
    </div>
);
};
export default NearbyPlaces;
