import { useEffect } from "react";
import { fetchHousingItems } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";

function useQueryHousingItems() {
  const { toast } = useToast();
  const housingItems = useStore((state) => state.housingItems);
  const setHousingItems = useStore((state) => state.setHousingItems);

    const loadHousingItems = async () => {
        try {
            const fetchedHousingItems = await fetchHousingItems();

            for (const item of fetchedHousingItems) {
              const { address } = item;
              const coordinates = await getAddressCoordinates(address);
              if (coordinates) {
                item.latitude = coordinates.lat;
                item.longitude = coordinates.lng;
              }
            }

            setHousingItems(fetchedHousingItems);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed to fetch housing items",
                description:
                (error as Error).message ||
                "There was an error loading the housing items. Please try again later.",
            });
        }
    };

  useEffect(() => {
    loadHousingItems();
  }, []);

  return { housingItems };
}

const getAddressCoordinates = async (address: string) => {
  const MAP_API_KEY = 'AIzaSyAu9JTvSmCucLYTHPSX9ryl0RXSPbPbWLQ';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${MAP_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
};

export default useQueryHousingItems;