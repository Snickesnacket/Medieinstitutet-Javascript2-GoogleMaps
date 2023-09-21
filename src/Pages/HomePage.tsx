import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";
import "../assets/scss/App.scss";

interface MarkerData {
  address: string;
  lat: number;
  lng: number;
}

interface InfoWindowData {
  id: number;
  address: string;
}

const HomePage: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: String(import.meta.env.VITE_FIREBASE_GOOGLE_API_KEY),
  });
  const [mapRef, setMapRef] = useState<google.maps.Map | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [infoWindowData, setInfoWindowData] = useState<
    InfoWindowData | undefined
  >();

  const markers: MarkerData[] = [
    { address: "Address1", lat: 18.5204, lng: 73.8567 },
    { address: "Address2", lat: 18.5314, lng: 73.8446 },
    { address: "Address3", lat: 18.5642, lng: 73.7769 },
  ];

  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (
    id: number,
    lat: number,
    lng: number,
    address: string
  ) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
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
          {markers.map(({ address, lat, lng }, ind) => (
            <MarkerF
              key={ind}
              position={{ lat, lng }}
              onClick={() => {
                handleMarkerClick(ind, lat, lng, address);
              }}
            >
              {isOpen && infoWindowData?.id === ind && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <h3>{infoWindowData.address}</h3>
                </InfoWindow>
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default HomePage;
