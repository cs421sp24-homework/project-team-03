export const getAddressCoordinates = async (address: string) => {
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