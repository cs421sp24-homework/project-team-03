import { useState, useEffect } from "react";
import { GoogleMap, InfoWindowF, Marker } from "@react-google-maps/api";
import { HousingItem as HousingItemType } from "@/lib/types";
import HousingInfoWindow from "../catalog/housing-info-window";
import { fetchGroceryStores } from "@/lib/map";

const SingleHousingContainer = ({ item }: { item: HousingItemType }) => {
    const [hoveredHousing, setHoveredHousing] = useState<HousingItemType | null>(null);
    const [groceryStores, setGroceryStores] = useState<any[]>([]);

    const handleMarkerHover = (item: HousingItemType) => {
        setHoveredHousing(item);
    };

    const longitude = typeof item.longitude === 'string' ? parseFloat(item.longitude) : item.longitude;
    const latitude = typeof item.latitude === 'string' ? parseFloat(item.latitude) : item.latitude;

    useEffect(() => {
        const fetchStores = async () => {
            try {
                    const data = await fetchGroceryStores(item.address);
                    console.log("Data from fetchGroceryStores:", data);
                    setGroceryStores(data.results);
            } catch (error) {
                console.error("Error fetching nearby grocery stores:", error);
            }
        };
        fetchStores();
    }, [item.address]);

    if (latitude !== undefined && longitude !== undefined) {
        return (
            <GoogleMap
                id={"housing-map-individual"}
                mapContainerStyle={{ height: "400px", width: "800px" }}
                center={{ lat: latitude, lng: longitude }}
                zoom={13}
                options={{ controlSize: 25 }}
            >
                <Marker
                    title={`marker-${item.id}`}
                    position={{ lat: latitude, lng: longitude }}
                    onMouseOver={() => handleMarkerHover(item)}
                >
                    {hoveredHousing === item &&
                        <InfoWindowF>
                            <HousingInfoWindow housingItem={item} />
                        </InfoWindowF>
                    }
                </Marker>
                {groceryStores.map((store, index) => (
                <Marker
                    key={index}
                    position={{ lat: store.geometry.location.lat, lng: store.geometry.location.lng }}
                    title={store.name}
                />
            ))}
            </GoogleMap>
        );
    } else {
        return null;
    }
};

export default SingleHousingContainer;
