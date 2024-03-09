import { GoogleMap, InfoWindowF, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { HousingItem } from "@/lib/types";
import useQueryHousingItems from "@/hooks/use-query-housing-items";
import { useState } from "react";

const HousingMapContainer = () => {
  const { housingItems } = useQueryHousingItems();
  const navigate = useNavigate();
  const [hoveredHousing, setHoveredHousing] = useState<HousingItem | null>(null);

  const handleMarkerClick = (item: HousingItem) => {
    navigate(`/housings/${item.id}`);
  };

  const handleMarkerHover = (item: HousingItem) => {
    setHoveredHousing(item);
  }

  return (
    <GoogleMap
      mapContainerStyle={{ height: "400px", width: "800px" }}
      center={{ lat: 39.330420, lng: -76.618050 }}
      zoom={13}
      onMouseOver={(e)=>console.log(e)}
    >
      {housingItems.map((item: HousingItem, index: number) => (
        item.latitude !== undefined &&
        item.longitude !== undefined && (
            <Marker
              key={index}
              position={{ lat: item.latitude, lng: item.longitude }}
              onClick={() => handleMarkerClick(item)}
              onMouseOver={() => handleMarkerHover(item)}
              onMouseOut={() => setHoveredHousing(null)}
            >
              {hoveredHousing === item &&
                <InfoWindowF> 
                  <div>
                    {item.name}
                  </div>
                </InfoWindowF>
              }
            </Marker>
        )
      ))}
    </GoogleMap>
  );
};

export default HousingMapContainer;
