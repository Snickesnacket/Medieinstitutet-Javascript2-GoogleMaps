import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";
import "../assets/scss/App.scss";
import useRestaurants from "../hooks/useGetRestaurants";

interface InfoWindowData {
  id: number;
  Gatuadress: string;
  lat: number;
  lng: number;
}

export const HomePage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: String(import.meta.env.VITE_FIREBASE_GOOGLE_API_KEY),
  });
  const [mapRef, setMapRef] = useState<google.maps.Map | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [infoWindowData, setInfoWindowData] = useState<
    InfoWindowData | undefined
  >();

  const { data } = useRestaurants();
  console.log(data);

  if (!data) {
    return console.log("error");
  }

  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    data.forEach(({ Latitude: lat, Longitude: lng }) => {
      if (typeof lat === "number" && typeof lng === "number") {
        bounds.extend({ lat, lng });
      }
    });

    map.fitBounds(bounds);
  };

  const handleMarkerClick = (
    id: number,
    lat: number,
    lng: number,
    Gatuadress: string
  ) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, Gatuadress, lat, lng });
    setIsOpen(true);
  };

  return (
    <div className="Homepage">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onMapLoad}
          onClick={() => setIsOpen(false)}
        >
          {data.map(
            (
              { Gatuadress: Gatuadress, Latitude: lat, Longitude: lng },
              ind
            ) => (
              <MarkerF
                key={ind}
                position={{ lat, lng }}
                onClick={() => {
                  handleMarkerClick(ind, lat, lng, Gatuadress);
                }}
              >
                {isOpen && infoWindowData?.id === ind && (
                  <InfoWindow
                    onCloseClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <h3>{infoWindowData.Gatuadress}</h3>
                  </InfoWindow>
                )}
              </MarkerF>
            )
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default HomePage;

