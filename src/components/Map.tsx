import { GoogleMap, useJsApiLoader, Libraries } from "@react-google-maps/api";
import { useCallback } from "react";

type defaultLocation = { lat: number; lng: number };
const DEFAULT_LOCATION: defaultLocation = { lat: 55.604981, lng: 13.003822 };
const libraries: Libraries = ["places"];

const Map = () => {
  // Get searchParams from the current URL
  const searchParams = new URLSearchParams(window.location.search);
  let lat = Number(searchParams.get("lat"));
  let lng = Number(searchParams.get("lng"));

  // If lat or lng is not provided in the URL, set it to default and update the URL
  if (!lat || !lng) {
    lat = DEFAULT_LOCATION.lat;
    lng = DEFAULT_LOCATION.lng;
    // Update the URL to reflect the default location
    const newURL = `${window.location.origin}${window.location.pathname}?lat=${lat}&lng=${lng}`;
    window.history.pushState({}, "", newURL);
  }

  const centerLocation: defaultLocation = { lat, lng };

  // Get map and places!
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_FIREBASE_GOOGLE_API_KEY,
    libraries: libraries,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setZoom(10);
  }, []);

  if (!isLoaded)
    return (
      <div>
        <p>LOADING....</p>
      </div>
    );

  if (loadError)
    return (
      <div>
        <p>{loadError.message}</p>
      </div>
    );

  return (
    <GoogleMap
      zoom={12}
      center={centerLocation}
      mapContainerClassName="map-container"
      onLoad={onLoad}
    ></GoogleMap>
  );
};

export default Map;
