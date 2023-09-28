import { Restaurant } from "../types/Restaurant.types";
import { InfoWindowData } from "../types/Google.types";
import { InfoWindow, MarkerF } from "@react-google-maps/api";

interface Iprops {
  validRestaurants: Restaurant[];
  handleMarkerClick: (restaurant: Restaurant) => void;
  handleInfoWindowClose: () => void;
  isOpen: boolean;
  infoWindowData: InfoWindowData | null;
}
export const MarkersComponent: React.FC<Iprops> = ({
  validRestaurants,
  handleMarkerClick,
  handleInfoWindowClose,
  isOpen,
  infoWindowData,
}) => {
  return (
    <>
      {validRestaurants.map((restaurant: Restaurant) => {
        return (
          <MarkerF
            key={restaurant._id}
            position={{
              lat: restaurant.Latitude!,
              lng: restaurant.Longitude!,
            }}
            onClick={() => handleMarkerClick(restaurant)}
          >
            {isOpen && infoWindowData?.id === restaurant._id && (
              <InfoWindow onCloseClick={handleInfoWindowClose}>
                <h3>{infoWindowData.Namn}</h3>
              </InfoWindow>
            )}
          </MarkerF>
        );
      })}
    </>
  );
};