import {
  GoogleMap,
  useJsApiLoader,
  Libraries,
  InfoWindow,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { SearchComponent } from "../components/SearchComponent";

import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useLocation } from "react-router-dom";
import useRestaurants from "../hooks/useGetRestaurants";
import { InfoWindowData } from "../types/Google.types";
import { Restaurant } from "../types/Restaurant.types";
import { Button, Card, Container, ListGroup, Row } from "react-bootstrap";
import { fetchAndGeocodeRestaurants } from "../hooks/useUpdateLocation";
import { getCurrentPosition } from "../components/GetMyLocation";

type DefaultLocation = { lat: number; lng: number; city: string };
const DEFAULT_LOCATION: DefaultLocation = {
  lat: 55.604981,
  lng: 13.003822,
  city: "Malmo",
};
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
  const initialCity = String(searchParams.get("city")) || DEFAULT_LOCATION.city;
  const URLLocation = useLocation();
  const [location, setLocation] = useState<DefaultLocation>({
    lat: initialLat,
    lng: initialLng,
    city: initialCity,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [infoWindowData, setInfoWindowData] = useState<InfoWindowData | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [zoom, setZoom] = useState(defaultZoom);
  const { data: restaurants } = useRestaurants();

  // Get map and places!
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_FIREBASE_GOOGLE_API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    // Update the map location based on the URL
    const searchParams = new URLSearchParams(URLLocation.search);
    const lat = Number(searchParams.get("lat")) || DEFAULT_LOCATION.lat;
    const lng = Number(searchParams.get("lng")) || DEFAULT_LOCATION.lng;
    const city = String(searchParams.get("city")) || DEFAULT_LOCATION.city;

    setLocation({ lat, lng, city });
    setSelectedCity(city);
  }, [URLLocation.search]);

  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (isLoaded) {
      // Initialize them once API is loaded
      setDirectionsService(new google.maps.DirectionsService());
      setDirectionsRenderer(new google.maps.DirectionsRenderer());
    }
  }, [isLoaded]);

  const showDirections = (
    start: google.maps.LatLngLiteral,
    end: google.maps.LatLngLiteral
  ) => {
    if (!directionsService || !directionsRenderer) {
      return;
    }
    const request: google.maps.DirectionsRequest = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING, // or WALKING, TRANSIT, BICYCLING
    };
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error("Directions request failed due to " + status);
      }
    });
  };

  const handleOnSelect = async (item: Item, clearSuggestions: () => void) => {
    const results = await getGeocode({ address: item.name });
    const { lat, lng } = await getLatLng(results[0]);
    const city = results[0].address_components[0].long_name;
    setSelectedCity(city);
    setLocation({ lat, lng, city });
    const newURL = `${window.location.origin}${window.location.pathname}?lat=${lat}&lng=${lng}&city=${city}`;
    window.history.pushState({}, "", newURL);
    if (restaurants) {
      await fetchAndGeocodeRestaurants(city, restaurants);
    }
    clearSuggestions();
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
    // If lat or lng is not provided in the URL, set it to default and update the URL
    if (!initialLat || !initialLng) {
      const newURL = `${window.location.origin}${window.location.pathname}?lat=${DEFAULT_LOCATION.lat}&lng=${DEFAULT_LOCATION.lng}&city=${DEFAULT_LOCATION.city}`;
      window.history.pushState({}, "", newURL);
      setZoom(defaultZoom);
    }
  }, [initialLat, initialLng]);

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
        {restaurants &&
          restaurants
            .filter((restaurant) => {
              return (
                restaurant.Ort === selectedCity &&
                typeof restaurant.Latitude !== "undefined" &&
                typeof restaurant.Longitude !== "undefined"
              );
            })
            .map((restaurant) => (
              <MarkerF
                key={restaurant._id}
                position={{
                  lat: restaurant.Latitude!,
                  lng: restaurant.Longitude!,
                }}
                onClick={() => handleMarkerClick(restaurant)}
              >
                {isOpen && infoWindowData?.id === restaurant._id && (
                  <InfoWindow onCloseClick={() => setIsOpen(false)}>
                    <h3>{infoWindowData.Namn}</h3>
                  </InfoWindow>
                )}
              </MarkerF>
            ))}
        <SearchComponent handleOnSelect={handleOnSelect} />
      </GoogleMap>
      <Button variant="secondary" onClick={handleDefaultClick}>
        Go back to default
      </Button>

      {/* <Button
        onClick={() => {
          getCurrentPosition()
            .then((pos) =>
              setLocation({ ...location, lat: pos.lat, lng: pos.lng })
            )
            .catch((error) => alert(error.message));
        }}
      >
        Get my position
      </Button> */}
      {restaurants && (
        <ListGroup className="mb-6">
          <Container>
            <Row>
              {restaurants
                .filter((restaurant) => {
                  return restaurant.Ort === selectedCity;
                })
                .map((restaurant) => (
                  <Card key={restaurant._id} className="m-2">
                    <Card.Body>
                      <Card.Title>{restaurant.Namn}</Card.Title>
                      <Card.Text>{restaurant.Beskrivning}</Card.Text>
                      <Card.Text>{restaurant.hemsida}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
            </Row>
          </Container>
        </ListGroup>
      )}
    </>
  );
};

export default Map;


