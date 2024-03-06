import { useStore } from '@/lib/store';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { HousingItem } from '@/lib/types';

const MapContainer = () => {
  const MAP_API_KEY = "AIzaSyAu9JTvSmCucLYTHPSX9ryl0RXSPbPbWLQ"; 
  const housingItems = useStore((state) => state.housingItems);
  const navigate = useNavigate();

  const handleMarkerClick = (item: HousingItem) => {
    navigate(`/housings/${item.id}`); // Navigate to housing details page
  };

  return (
    <LoadScript googleMapsApiKey={MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "800px" }}
        center={{ lat: 39.330420, lng: -76.618050 }}
        zoom={13}
      >
        {housingItems.map((item, index) => (
          // Check if latitude and longitude are defined
          item.latitude !== undefined && item.longitude !== undefined && (
            <Marker
              key={index}
              position={{ lat: item.latitude, lng: item.longitude }}
              onClick={() => handleMarkerClick(item)} // Handle click event
            />
          )
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
