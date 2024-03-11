import { GoogleMap, InfoWindowF, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { HousingItem as HousingItemType } from "@/lib/types";
import useQueryHousingItems from "@/hooks/use-query-housing-items";
import { useState } from "react";
import HousingInfoWindow from "../catalog/housing-info-window";

const HousingMapContainer = () => {
  const { housingItems } = useQueryHousingItems();
  const navigate = useNavigate();
  const [hoveredHousing, setHoveredHousing] = useState<HousingItemType | null>(null);

  

  const handleMarkerClick = (item: HousingItemType) => {
    navigate(`/housings/${item.id}`);
  };

  const handleMarkerHover = (item: HousingItemType) => {
    setHoveredHousing(item);
  }

  return (
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "800px" }}
      center={{ lat: 39.330420, lng: -76.618050 }}
      zoom={13}
      options={{controlSize: 25}}
    >
      {housingItems.map((item: HousingItemType, index: number) => (
  
        item.latitude !== undefined &&
        item.longitude !== undefined && (
            <Marker
              key={index}
              position={{ lat: item.latitude, lng: item.longitude }}
              onClick={() => handleMarkerClick(item)}
              onMouseOver={() => handleMarkerHover(item)}
              // onMouseOut={() => setHoveredHousing(null)}
            >
              {hoveredHousing === item &&
                <InfoWindowF > 
                  <HousingInfoWindow housingItem={item} />
                </InfoWindowF>
              }
            </Marker>
        )
      ))}
    </GoogleMap>
  );
};

export default HousingMapContainer;
