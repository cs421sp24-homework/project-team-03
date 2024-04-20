import { useState, useEffect } from "react";
import { GoogleMap, InfoWindowF, Marker } from "@react-google-maps/api";
import { Locations, HousingItem as HousingItemType } from "@/lib/types";
import HousingInfoWindow from "../catalog/housing-info-window";
import { fetchGroceryStores, getAddressCoordinates } from "@/lib/map";
import { useStore } from "@/lib/store";

const SingleHousingContainer = ({ item }: { item: HousingItemType }) => {
    const [hoveredHousing, setHoveredHousing] = useState<HousingItemType | null>(null);
    const [groceryStores, setGroceryStores] = useState<Locations[]>([]);
    const [hoveredStore, setHoveredStore] = useState<Locations | null>(null);
    const setStores = useStore((state) => state.setNearbyStores);
    const [selectedCategory, setSelectedCategory] = useState("supermarket");


    const handleMarkerHover = (item: HousingItemType) => {
        setHoveredHousing(item);
    };

    const handleStoreMarkerHover = (store: Locations) => {
        setHoveredStore(store);
    }

    const longitude = typeof item.longitude === 'string' ? parseFloat(item.longitude) : item.longitude;
    const latitude = typeof item.latitude === 'string' ? parseFloat(item.latitude) : item.latitude;

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const data = await fetchGroceryStores(selectedCategory, latitude, longitude);
                if (data) {
                    const coordinatesPromises = data.map(async (store) => {
                        const coordinates = await getAddressCoordinates(store.formattedAddress);
                        return {
                            ...store,
                            latitude: coordinates?.lat,
                            longitude: coordinates?.lng
                        };
                    });
                    const storesWithCoordinates = await Promise.all(coordinatesPromises);
                    setGroceryStores(storesWithCoordinates);
                    setStores(storesWithCoordinates);
                } else {
                    throw new Error('No results found');
                }
            } catch (error) {
                console.error("Error fetching nearby grocery stores:", error);
            }
        };
        fetchStores();
    }, [latitude, longitude, selectedCategory, setStores]);

    if (latitude !== undefined && longitude !== undefined) {
        return (
            <div> 
            <select
                id="select-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mb-4"
            >
                <option value="supermarket">Grocery Stores</option>
                <option value="restaurant">Restaurants</option>
                <option value="park">Parks</option>
                <option value="cafe">Cafe</option>
                <option value="bakery">Bakery</option>
            </select>
            <GoogleMap
                id={"housing-map-individual"}
                mapContainerStyle={{ height: "400px", width: "800px" }}
                center={{ lat: latitude, lng: longitude }}
                zoom={13}
                options={{ controlSize: 25 }}
            >
                <>
                    {groceryStores.map((store, index) => {
                        if (index === 1) {
                            return (
                                <Marker
                                    key={'housing-item-marker'}
                                    title={`marker-${item.id}`}
                                    position={{ lat: latitude, lng: longitude }}
                                    icon={{
                                        url: 'http://maps.gstatic.com/mapfiles/ms2/micons/red-pushpin.png',
                                        scaledSize: new window.google.maps.Size(40, 40)
                                    }}
                                    onMouseOver={() => handleMarkerHover(item)}
                                >
                                    {hoveredHousing === item &&
                                        <InfoWindowF>
                                            <HousingInfoWindow housingItem={item} />
                                        </InfoWindowF>
                                    }
                                </Marker>
                            );
                        }
                        if (typeof store.latitude === 'number' && typeof store.longitude === 'number') {
                            return (
                                <Marker
                                    key={index}
                                    position={{ lat: store.latitude, lng: store.longitude }}
                                    title={`marker-${store.displayName}`}
                                    icon={{
                                        url: 'http://maps.gstatic.com/mapfiles/ms2/micons/ltblue-dot.png',
                                        scaledSize: new window.google.maps.Size(40, 40)
                                    }}
                                    onMouseOver={() => handleStoreMarkerHover(store)}
                                >
                                    {hoveredStore === store &&
                                        <InfoWindowF>
                                            <div id={`info-window-${latitude}-${longitude}`}>
                                                <h3>{store.displayName}</h3>
                                                <p>Address: {store.formattedAddress}</p>
                                            </div>
                                        </InfoWindowF>
                                    }
                                </Marker>
                            );
                        }
                        return null;
                    })}
                </>
            </GoogleMap>

            </div>
        );
    } else {
        return null;
    }
};

export default SingleHousingContainer;
