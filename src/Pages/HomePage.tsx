import {
  GoogleMap,
  useJsApiLoader,
  Libraries,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { SearchComponent } from "../components/SearchComponent";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useLocation } from "react-router-dom";
import useRestaurants from "../hooks/useGetRestaurants";
import { DefaultLocation, InfoWindowData, Item } from "../types/Google.types";
import { Restaurant } from "../types/Restaurant.types";
import { Button } from "react-bootstrap";
import { fetchAndGeocodeRestaurants } from "../hooks/useUpdateGeorestaurants";
import { getCurrentPosition } from "../components/GetMyLocation";
import useLocationUpdater from "../hooks/useLocationUpdater";
import { FilteredRestaurants } from "../components/FilterRestaurants";
import { MarkersComponent } from "../components/markers";
import { RenderRestaurantsList } from "../components/RenderRestaurantList";
import useDirections from "../hooks/useDirection";

const DEFAULT_LOCATION: DefaultLocation = {
  lat: 55.604981,
  lng: 13.003822,
  city: "Malmo",
};
const libraries: Libraries = ["places"];
const defaultZoom = 13;

const Map = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const initialParams = {
    lat: Number(searchParams.get("lat")) || DEFAULT_LOCATION.lat,
    lng: Number(searchParams.get("lng")) || DEFAULT_LOCATION.lng,
    city: String(searchParams.get("city")) || DEFAULT_LOCATION.city,
  };
  const URLLocation = useLocation();
  const [location, setLocation] = useState<DefaultLocation>({
    lat: initialParams.lat,
    lng: initialParams.lng,
    city: initialParams.city,
  });
  const [myPosition, setMyPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [infoWindowData, setInfoWindowData] = useState<InfoWindowData | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<string>(initialParams.city);
  const [zoom, setZoom] = useState(defaultZoom);
  const { data: restaurants } = useRestaurants();
  const validRestaurants = FilteredRestaurants(restaurants || [], selectedCity);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_FIREBASE_GOOGLE_API_KEY,
    libraries: libraries,
  });
  const { showDirections, directionsRenderer } = useDirections(isLoaded);

  useEffect(() => {
    const searchParams = new URLSearchParams(URLLocation.search);
    const lat = Number(searchParams.get("lat")) || DEFAULT_LOCATION.lat;
    const lng = Number(searchParams.get("lng")) || DEFAULT_LOCATION.lng;
    const city = String(searchParams.get("city")) || DEFAULT_LOCATION.city;

    setLocation({ lat, lng, city });
    setSelectedCity(city);
  }, [URLLocation.search]);

  const updateLocationAndFetchRestaurants = useLocationUpdater(
    restaurants || [],
    fetchAndGeocodeRestaurants
  );

  const handleOnSelect = async (item: Item) => {
    const results = await getGeocode({ address: item.name });
    const { lat, lng } = await getLatLng(results[0]);
    const updatedLocation = await updateLocationAndFetchRestaurants(lat, lng);
    setLocation(updatedLocation);
    setSelectedCity(updatedLocation.city);
  };
  const handleDefaultClick = () => {
    const defaultURL = `${window.location.origin}${window.location.pathname}?lat=${DEFAULT_LOCATION.lat}&lng=${DEFAULT_LOCATION.lng}&city=${DEFAULT_LOCATION.city}`;
    window.location.href = defaultURL;
  };
  const handleMarkerClick = async (restaurant: Restaurant) => {
    setIsOpen(true);
    setInfoWindowData({
      id: restaurant._id,
      Namn: restaurant.Namn,
      Ort: restaurant.Ort,
      Gatuadress: restaurant.Gatuadress,
      Kategori: restaurant.Kategori,
      Utbud: restaurant.Utbud,
      lat: restaurant.Latitude!,
      lng: restaurant.Longitude!,
    });
    try {
      const currentPosition = await getCurrentPosition();
      const restaurantPosition = {
        lat: restaurant.Latitude!,
        lng: restaurant.Longitude!,
      };
      showDirections(currentPosition, restaurantPosition);
    } catch (error) {
      console.error("Error getting user position:", error);
    }
  };

  useEffect(() => {
    if (!initialParams.lat || !initialParams.lng) {
      const newURL = `${window.location.origin}${window.location.pathname}?lat=${DEFAULT_LOCATION.lat}&lng=${DEFAULT_LOCATION.lng}&city=${DEFAULT_LOCATION.city}`;
      window.history.pushState({}, "", newURL);
      setZoom(defaultZoom);
    }
  }, [initialParams.lat, initialParams.lng]);

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
    <>
      <GoogleMap
        zoom={zoom}
        center={location}
        mapContainerClassName="map-container"
        onLoad={(map) => {
          if (directionsRenderer) {
            directionsRenderer.setMap(map);
          }
        }}
      >
        <MarkersComponent
          validRestaurants={validRestaurants}
          handleMarkerClick={handleMarkerClick}
          handleInfoWindowClose={() => setIsOpen(false)}
          isOpen={isOpen}
          infoWindowData={infoWindowData}
        />
        {myPosition && <MarkerF position={myPosition} label="Me" />}
        <SearchComponent handleOnSelect={handleOnSelect} />
      </GoogleMap>
      <Button variant="secondary" onClick={handleDefaultClick}>
        Go back to default
      </Button>

      <Button
        onClick={() => {
          getCurrentPosition()
            .then(async (pos) => {
              const updatedLocation = await updateLocationAndFetchRestaurants(
                pos.lat,
                pos.lng
              );
              setLocation(updatedLocation);
              setSelectedCity(updatedLocation.city);
              setMyPosition(pos);
            })
            .catch((error) => alert(error.message));
        }}
      >
        Get my position
      </Button>
      <RenderRestaurantsList validRestaurants={validRestaurants} />
    </>
  );
};

export default Map;
