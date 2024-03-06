import { useStore } from '@/lib/store';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
  const MAP_API_KEY = "AIzaSyAu9JTvSmCucLYTHPSX9ryl0RXSPbPbWLQ"; // Replace with your actual API key
  const housingItems = useStore((state) => state.housingItems);

  return (
    <LoadScript googleMapsApiKey={MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "800px" }}
        center={{ lat: 39.330420, lng: -76.618050 }} // Default center if no housing items
        zoom={13} // Initial zoom level
      >
        {housingItems.map((item, index) => (
        // Check if latitude and longitude are defined
        item.latitude !== undefined && item.longitude !== undefined && (
            <Marker
            key={index}
            position={{ lat: item.latitude, lng: item.longitude }}
            />
        )
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;

