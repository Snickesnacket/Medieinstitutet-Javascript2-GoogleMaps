/* import { createContext, useEffect, useState } from "react";
import { InfoWindowData, LatLng } from "../types/Google.types";
import { useNavigate, useSearchParams } from "react-router-dom";

type GoogleContextType = {

}

export const GoogleContext = createContext<GoogleContextType | null>(null);

type GoogleContextProps = {
  children: React.ReactNode;
};

const GoogleContextProvider: React.FC<GoogleContextProps> = ({ children }) => {
const [mapRef, setMapRef] = useState<google.maps.Map | undefined>();
const [infoWindowData, setInfoWindowData] = useState<InfoWindowData | null>(null);
const [zoom, setZoom] = useState(8);
const [selected, setSelected] = useState<LatLng | null>(null);
const [searchParams, setSearchParams] = useSearchParams();
 const [selectedOrt, setSelectedOrt] = useState<string | null>(
    searchParams.get("query") || null
  );
const navigate = useNavigate();
}

  useEffect(() => {
    if (isLoaded) {
      const currentQuery = searchParams.get("query");
      if (currentQuery && currentQuery !== selectedOrt) {
        setSelectedOrt(currentQuery); // Update the state with the new query
      }
      if (currentQuery || selectedOrt) {
        // This ensures logic runs even on mount with a query param
        (async () => {
          const targetOrt = currentQuery || selectedOrt;
          const results = await getGeocode({ address: targetOrt });
          const { lat, lng } = await getLatLng(results[0]);
          setSelected({ lat, lng });
          setZoom(12);
          if (mapRef) {
            mapRef.panTo({ lat, lng });
          }
        })();
      } else if (selected) {
        setMapToLocation(selected);
      }
    }
  }, [selectedOrt, selected, isLoaded, searchParams, mapRef]);

  return (
    <GoogleContext.Provider
      value={{
        
      }}
    >
      {loading ? <div id="initial-loader">loadin....</div> : <>{children}</>}
    </GoogleContext.Provider>
  );
};

export default GoogleContextProvider;
function getGeocode(arg0: { address: any; }) {
    throw new Error("Function not implemented.");
}

function getLatLng(arg0: any): { lat: any; lng: any; } | PromiseLike<{ lat: any; lng: any; }> {
    throw new Error("Function not implemented.");
}

 */
