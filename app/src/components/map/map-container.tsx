import { GoogleMap, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { HousingItem } from "@/lib/types";
import useQueryHousingItems from "@/hooks/use-query-housing-items";

const MapContainer = () => {
  const { housingItems } = useQueryHousingItems();
  const navigate = useNavigate();

  const handleMarkerClick = (item: HousingItem) => {
    navigate(`/housings/${item.id}`);
  };

  return (
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "800px" }}
      center={{ lat: 39.330420, lng: -76.618050 }}
      zoom={13}
    >
      {housingItems.map((item: HousingItem, index: number) => (
        item.latitude !== undefined &&
        item.longitude !== undefined && (
          <Marker
            key={index}
            position={{ lat: item.latitude, lng: item.longitude }}
            onClick={() => handleMarkerClick(item)}
          />
        )
      ))}
    </GoogleMap>
  );
};

export default MapContainer;
