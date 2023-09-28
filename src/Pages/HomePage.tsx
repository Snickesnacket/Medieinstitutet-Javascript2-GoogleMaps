import { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Libraries,
  MarkerF,
} from "@react-google-maps/api";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { SearchComponent } from "../components/SearchComponent";
import { getCurrentPosition } from "../components/GetMyLocation";
import { getFilteredRestaurants } from "../components/FilterRestaurants";
import { MarkersComponent } from "../components/MarkersComponent";
import { RenderRestaurantsList } from "../components/RenderRestaurantList";
import useRestaurants from "../hooks/useGetRestaurants";
import useDirections from "../hooks/useDirection";
import { useLocationUpdater } from "../hooks/useLocationUpdater";
import { useFetchAndGeocodeRestaurants } from "../hooks/useUpdateGeorestaurants";
import { DefaultLocation, InfoWindowData, Item } from "../types/Google.types";
import { Restaurant } from "../types/Restaurant.types";
import { useSelectedValues } from "../contexts/SelectedValuesContext";

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
    city: String(searchParams.get("stad")) || DEFAULT_LOCATION.city,
  };
  const URLLocation = useLocation();
  const navigate = useNavigate();
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
  const { selectedCategory, selectedUtbud } = useSelectedValues();
  const [validFilteredRestaurants, setValidFilteredRestaurants] = useState<
    Restaurant[]
  >([]);
  const [selectedCity, setSelectedCity] = useState<string>(initialParams.city);
  const [zoom, setZoom] = useState(defaultZoom);
  const { data: restaurants } = useRestaurants();
  const fetchAndGeocode = useFetchAndGeocodeRestaurants();
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_FIREBASE_GOOGLE_API_KEY,
    libraries: libraries,
  });
  const { showDirections, directionsRenderer } = useDirections(isLoaded);

  useEffect(() => {
    const searchParams = new URLSearchParams(URLLocation.search);
    const lat = Number(searchParams.get("lat")) || DEFAULT_LOCATION.lat;
    const lng = Number(searchParams.get("lng")) || DEFAULT_LOCATION.lng;
    const city = String(searchParams.get("stad")) || DEFAULT_LOCATION.city;

    setLocation({ lat, lng, city });
    setSelectedCity(city);
  }, [URLLocation.search]);

  const updateLocationAndFetchRestaurants = useLocationUpdater(fetchAndGeocode);
  const handleOnSelect = async (item: Item) => {
    const results = await getGeocode({ address: item.name });
    const { lat, lng } = await getLatLng(results[0]);
    const updatedLocation = await updateLocationAndFetchRestaurants(lat, lng);
    setLocation(updatedLocation);
    setSelectedCity(updatedLocation.city);
    await fetchAndGeocode(updatedLocation.city);
  };
  const handleDefaultClick = () => {
    const defaultURL = `${window.location.origin}${window.location.pathname}?lat=${DEFAULT_LOCATION.lat}&lng=${DEFAULT_LOCATION.lng}&stad=${DEFAULT_LOCATION.city}`;
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
  const initializePage = () => {
    if (!initialParams.lat || !initialParams.lng) {
      const newURL = `${window.location.origin}${window.location.pathname}?lat=${DEFAULT_LOCATION.lat}&lng=${DEFAULT_LOCATION.lng}&stad=${DEFAULT_LOCATION.city}`;
      window.history.pushState({}, "", newURL);
      setZoom(defaultZoom);
    }
  };

  const handleOnMapLoad = (map: google.maps.Map) => {
    if (directionsRenderer) {
      directionsRenderer.setMap(map);
    }
  };

  useEffect(() => {
    const updatedValidRestaurants = getFilteredRestaurants(
      restaurants || [],
      selectedCity,
      selectedCategory,
      selectedUtbud
    );
    setValidFilteredRestaurants(updatedValidRestaurants);
  }, [restaurants, selectedCity, selectedCategory, selectedUtbud]);

  useEffect(initializePage, [initialParams.lat, initialParams.lng]);

  useEffect(() => {
    const updatedPath = `${URLLocation.pathname}?lat=${location.lat}&lng=${location.lng}&stad=${location.city}&category=${selectedCategory}&utbud=${selectedUtbud}`;
    navigate(updatedPath, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedUtbud]);

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
        onLoad={handleOnMapLoad}
      >
        <MarkersComponent
          validRestaurants={validFilteredRestaurants}
          handleMarkerClick={handleMarkerClick}
          handleInfoWindowClose={() => setIsOpen(false)}
          isOpen={isOpen}
          infoWindowData={infoWindowData}
        />
        {myPosition && <MarkerF position={myPosition} label="Me" />}
        <div className="inline-container">
          <SearchComponent handleOnSelect={handleOnSelect} />
        </div>
      </GoogleMap>
      <Button variant="secondary" onClick={handleDefaultClick}>
        Defaultläge
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
        Hämta min position
      </Button>

      <RenderRestaurantsList validRestaurants={validFilteredRestaurants} />
    </>
  );
};

export default Map;
