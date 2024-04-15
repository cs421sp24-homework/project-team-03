import { GooglePlacesAPIResponse, Locations } from "./types";

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
    includedTypes: ["supermarket"],
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        radius: 5000.0
      }
    },
    "rankPreference": "DISTANCE"
  };

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': MAP_API_KEY,
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating,places.location' 
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
    //console.log(responseJson);

    
  const formattedPlaces = formatPlacesData(responseJson, latitude, longitude);

  return formattedPlaces;

};


const formatPlacesData = (data: GooglePlacesAPIResponse, housingLat?: number, housingLon?: number) => {
  if (!data || !data.places || !Array.isArray(data.places)) {
    return [];
  }
  return data.places.map((place) => {
    // Calculate the distance for each place individually
    const distance = getDistanceFromLatLonInMiles(housingLat!, housingLon!, place.location.latitude, place.location.longitude);

    return {
      formattedAddress: place.formattedAddress,
      displayName: place.displayName.text,
      rating: place.rating,
      distance // Add distance for each place in the output
    };
  });
};

function getDistanceFromLatLonInMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const earthRadiusMiles = 3958.8; // Radius of the earth in miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusMiles * c; // Distance in miles
  return parseFloat(distance.toFixed(1));
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}



