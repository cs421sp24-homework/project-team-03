import { useEffect } from "react";
import { fetchGroceryStores } from "@/lib/map";
import { HousingItem as HousingItemType } from "@/lib/types";

const NearbyPlaces = ({ item }: { item: HousingItemType }) => {
//   const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
        try {
            const data = await fetchGroceryStores(item.address);
            console.log("Data from fetchGroceryStores:", data);
            // setGroceryStores(data.results);
        } catch (error) {
            console.error("Error fetching nearby grocery stores:", error);
        }
    };
    fetchStores();
}, [item.address]);

  // Render the component UI similar to your reference image
  return (
    <div className="nearby-places">
      <h2>Nearby Places</h2>
    </div>
  );
};

    //   {/* {places.map((place, index) => (
    //     <div key={index} className="place">
    //       <div className="place-info">
    //         <h3>{place.name}</h3>
    //         <p>Rating: {place.rating || 'N/A'}</p>
    //         <p>Distance: {/* Calculate distance from the location */} mi</p>
    //         </div>
    //         <div className="place-type">
    //           <p>Type: {place.types.includes('cafe') ? 'Cafe' : 'Grocery Store'}</p>
    //         </div>
    //       </div>
    //     ))} */}
export default NearbyPlaces;
