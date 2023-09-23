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
  name: string;
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
  const [zoom, setZoom] = useState(8);
  const [mapsLibLoaded, setMapsLibLoaded] = useState<boolean>(false);
  const [selected, setSelected] = useState<LatLng | null>(null);
  const [selectedOrt, setSelectedOrt] = useState<string | null>(null);
  //fetch data from firebase
  const { data: restaurant } = useRestaurants();

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

  const handleOnSearch = (searchString: string) => {
    setValue(searchString);
  };

  const handleOnSelect = async (item: Item) => {
    const results = await getGeocode({ address: item.name });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setZoom(12);
    setSelectedOrt(item.name);

    if (mapRef && typeof lat === "number" && typeof lng === "number") {
      mapRef.panTo({ lat, lng });
    }
  };
  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
    if (selected) {
      map.panTo(selected);
    }

    const bounds = new google.maps.LatLngBounds();
    restaurant
      ?.filter((item) => item.Ort == selectedOrt)
      .map(({ Latitude: lat, Longitude: lng }) => {
        if (typeof lat === "number" && typeof lng === "number") {
          bounds.extend({ lat, lng });
        }
      });
    map.fitBounds(bounds);
  };
  useEffect(() => {
    if (isLoaded) {
      setMapsLibLoaded(true);
    }
  }, [isLoaded]);

  const {
    suggestions: { data },
    setValue,
  } = usePlacesAutocomplete();

  const suggestion = data ? data : [];

  useEffect(() => {
    if (Error) {
      console.error("usePlacesAutocomplete error:", Error);
    }
  }, [Error]);

  return (
    <div className="Homepage">
      {!mapsLibLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <GoogleMap
            zoom={zoom}
            mapContainerClassName="map-container"
            onLoad={onMapLoad}
            onClick={() => setIsOpen(false)}
          >
            {restaurant
              ?.filter((item) => !selectedOrt || item.Ort === selectedOrt)
              .map(
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
                name: s.description,
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
