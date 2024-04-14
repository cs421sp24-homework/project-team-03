import { Locations } from "./types";

export const getAddressCoordinates = async (address: string) => {
  const MAP_API_KEY = 'AIzaSyD3WSswaxt-32s42qTRaXfvOVsKONzPZzg';
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
    //console.error('Error geocoding address:', error);
    return null;
  }
};

export const fetchGroceryStores = async (latitude?: number, longitude?: number): Promise<Locations[]> => {
  const MAP_API_KEY = 'AIzaSyB7cNWX7H_HmeOKF_NHQID2olOawRJ7o_s';

  const requestBody = {
    includedTypes: ["grocery_store"],
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        radius: 5000.0
      }
    }
  };

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': MAP_API_KEY,
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress' 
    },
    body: JSON.stringify(requestBody)
  };

    const response = await fetch('https://places.googleapis.com/v1/places:searchNearby', fetchOptions)
    const responseJson = await response.json();
  
    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} - ${
          responseJson.message || response.statusText
        }`,
      );
    }

    return formatPlacesData(responseJson);;


};

const formatPlacesData = (data: { places: { formattedAddress: any; displayName: { text: any; }; }[]; }) => {
  if (!data || !data.places || !Array.isArray(data.places)) {
    return [];
  }

  return data.places.map((place: { formattedAddress: string, displayName: {text: string}}) => ({
    formattedAddress: place.formattedAddress,
    displayName: place.displayName.text
  }));
};

