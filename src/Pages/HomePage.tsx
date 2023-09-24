import {
  GoogleMap,
  useJsApiLoader,
  Libraries,
  InfoWindow,
  MarkerF,
} from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { SearchComponent } from "../components/SearchComponent";

import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useLocation } from "react-router-dom";
import useRestaurants from "../hooks/useGetRestaurants";
import { InfoWindowData } from "../types/Google.types";
import { Restaurant } from "../types/Restaurant.types";

type DefaultLocation = { lat: number; lng: number };
const DEFAULT_LOCATION: DefaultLocation = { lat: 55.604981, lng: 13.003822 };
const libraries: Libraries = ["places"];
const defaultZoom = 13;

type Item = {
  id: string;
  name: string;
};

const Map = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const initialLat = Number(searchParams.get("lat")) || DEFAULT_LOCATION.lat;
  const initialLng = Number(searchParams.get("lng")) || DEFAULT_LOCATION.lng;
  const URLLocation = useLocation();
  const [location, setLocation] = useState<DefaultLocation>({
    lat: initialLat,
    lng: initialLng,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [infoWindowData, setInfoWindowData] = useState<InfoWindowData | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [zoom, setZoom] = useState(defaultZoom);
  const { data: restaurants } = useRestaurants();

  useEffect(() => {
    // Update the map location based on the URL
    const searchParams = new URLSearchParams(URLLocation.search);
    const lat = Number(searchParams.get("lat")) || DEFAULT_LOCATION.lat;
    const lng = Number(searchParams.get("lng")) || DEFAULT_LOCATION.lng;
    setLocation({ lat, lng });
  }, [URLLocation.search]);

  const handleOnSelect = async (item: Item) => {
    const results = await getGeocode({ address: item.name });
    const { lat, lng } = await getLatLng(results[0]);
    setSelectedCity(results[0].address_components[0].long_name);
    setLocation({ lat, lng });

    const newURL = `${window.location.origin}${window.location.pathname}?lat=${lat}&lng=${lng}`;
    window.history.pushState({}, "", newURL);
  };

  const handleMarkerClick = (restaurant: Restaurant) => {
    console.log(restaurants);
    setIsOpen(true);
    setInfoWindowData({
      id: restaurant._id,
      Namn: restaurant.Namn,
      Ort: restaurant.Ort,
      Gatuadress: restaurant.Gatuadress,
      Kategori: restaurant.Kategori,
      Utbud: restaurant.Utbud,
      lat: restaurant.Latitude,
      lng: restaurant.Longitude,
    });
  };

  // Get map and places!
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_FIREBASE_GOOGLE_API_KEY,
    libraries: libraries,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    console.log(map);
  }, []);

  useEffect(() => {
    // If lat or lng is not provided in the URL, set it to default and update the URL
    if (!initialLat || !initialLng) {
      const newURL = `${window.location.origin}${window.location.pathname}?lat=${DEFAULT_LOCATION.lat}&lng=${DEFAULT_LOCATION.lng}`;
      window.history.pushState({}, "", newURL);
      setZoom(defaultZoom);
    }
  }, [initialLat, initialLng]);

  useEffect(() => {
    console.log("restaurants", restaurants);
  }, [restaurants]);

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
      zoom={zoom}
      center={location}
      mapContainerClassName="map-container"
      onLoad={onLoad}
    >
      <p>Hello i am the data {restaurants?.length}</p>
      {restaurants
        ?.filter((restaurant) => {
          console.log(
            "firebase ort ",
            restaurant.Ort,
            "selectedCity",
            selectedCity
          );
          return restaurant.Ort === selectedCity;
        })
        .map((restaurant) => (
          <MarkerF
            key={restaurant._id}
            position={{ lat: restaurant.Latitude, lng: restaurant.Longitude }}
            onClick={() => handleMarkerClick(restaurant)}
          >
            {isOpen && infoWindowData?.id === restaurant._id && (
              <InfoWindow onCloseClick={() => setIsOpen(false)}>
                <h3>{infoWindowData.Namn}</h3>
                {/* Add other restaurant details here if needed */}
              </InfoWindow>
            )}
          </MarkerF>
        ))}
      <SearchComponent handleOnSelect={handleOnSelect} />
    </GoogleMap>
  );
};

export default Map;
