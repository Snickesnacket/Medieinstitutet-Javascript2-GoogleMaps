import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Libraries } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import useRestaurants from "../hooks/useGetRestaurants";
import { InfoWindowData, LatLng } from "../types/Google.types";
import "../assets/scss/App.scss";
import { useEffect, useRef, useState } from "react";

type Item = {
  id: string;
  query: string;
};

export const HomePage = () => {
  const libraries = useRef<Libraries>(["places"]);
  if (libraries) {
    console.log("hello");
  }

  //loading google map library
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_FIREBASE_GOOGLE_API_KEY,
    libraries: libraries.current,
  });

  //reference to map instance
  const [mapRef, setMapRef] = useState<google.maps.Map | undefined>();
  //reference to the infoWindow
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //data displayed in the info window
  const [infoWindowData, setInfoWindowData] = useState<InfoWindowData | null>(
    null
  );

  const [mapsLibLoaded, setMapsLibLoaded] = useState<boolean>(false);
  const [selected, setSelected] = useState<LatLng | null>(null);
  //fetch data from firebase
  const { data: restaurant } = useRestaurants();

  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
    if (selected) {
      map.panTo(selected);
    }
    const bounds = new google.maps.LatLngBounds();
    restaurant?.forEach(({ Latitude: lat, Longitude: lng }) => {
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
    Namn: string,
    Gatuadress: string,
    Ort: string,
    Kategori: string,
    Utbud: string
  ) => {
    if (typeof lat === "number" && typeof lng === "number") {
      mapRef?.panTo({ lat, lng });
      setInfoWindowData({
        id,
        Namn,
        Ort,
        Gatuadress,
        Kategori,
        Utbud,
        lat,
        lng,
      });
      setIsOpen(true);
    }
  };

  const handleOnSearch = (searchString: string, results: Item[]) => {
    console.log(searchString, results);
  };

  const handleOnSelect = async (item: Item) => {
    const results = await getGeocode({ address: item.query });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });

    if (mapRef && typeof lat === "number" && typeof lng === "number") {
      mapRef.panTo({ lat, lng });
    }
  };
  useEffect(() => {
    if (isLoaded) {
      setMapsLibLoaded(true);
    }
  }, [isLoaded]);

  const autocomplete = usePlacesAutocomplete();
  const suggestion = autocomplete ? autocomplete.suggestions.data : [];

  return (
    <div className="Homepage">
      {!mapsLibLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <GoogleMap
            mapContainerClassName="map-container"
            onLoad={onMapLoad}
            onClick={() => setIsOpen(false)}
          >
            {restaurant?.map(
              (
                {
                  Gatuadress,
                  Latitude: lat,
                  Longitude: lng,
                  Namn,
                  Ort,
                  Kategori,
                  Utbud,
                },
                ind
              ) => (
                <MarkerF
                  key={ind}
                  position={{ lat, lng }}
                  onClick={() => {
                    handleMarkerClick(
                      ind,
                      lat,
                      lng,
                      Namn,
                      Gatuadress,
                      Ort,
                      Kategori,
                      Utbud
                    );
                  }}
                >
                  {isOpen && infoWindowData?.id === ind && (
                    <InfoWindow
                      onCloseClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      <>
                        <h3>{infoWindowData.Namn}</h3>
                        <p>{infoWindowData.Gatuadress}</p>
                        <p>{infoWindowData.Ort}</p>
                      </>
                    </InfoWindow>
                  )}
                </MarkerF>
              )
            )}
          </GoogleMap>

          <div style={{ width: 400 }}>
            <ReactSearchAutocomplete
              items={suggestion.map((s) => ({
                id: s.place_id,
                query: s.description,
              }))}
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              autoFocus
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
