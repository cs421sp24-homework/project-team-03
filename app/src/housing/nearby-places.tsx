import { useStore } from "@/lib/store";


const NearbyPlaces = () => {
    const nearbyStores = useStore(state => state.nearbyStores); // Assuming 'groceryStores' is the correct state slice

    const generateStars = (rating: number) => {
        // Round the rating to the nearest half for simplicity
        const roundedRating = Math.round(rating * 2) / 2;
        let stars = '';
        for (let i = 0; i < 5; i++) {
          if (i < Math.floor(roundedRating)) {
            stars += '★'; // Filled star
          } else {
            stars += '☆'; // Empty star
          }
        }
        return stars;
      };

    const closestStores = [...nearbyStores].slice(0, 2);
    // Render the component UI
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Nearby Grocery Stores</h2>
          {closestStores.length > 0 ? (
            closestStores.map((store, index) => (
              <div key={index} className="flex mb-4 last:mb-0 items-center">
                {/* Circle with rating */}
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-800 mr-4">
                  {store.rating ? store.rating.toFixed(1) : 'N/A'}
                </div>
                {/* Store details */}
                <div className="flex-grow">
                  <h3 className="text-lg font-medium">{store.displayName}</h3>
                  <p className="text-gray-600">{store.formattedAddress}</p>
                  <p className="text-gray-600">
                    {generateStars(store.rating)} - {store.distance.toFixed(2)} miles away
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-600">No nearby stores found</div>
          )}
        </div>
      );
};

export default NearbyPlaces;
