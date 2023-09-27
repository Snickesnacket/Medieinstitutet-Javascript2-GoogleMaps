/* import { Marker as MarkerF, InfoWindow } from "@react-google-maps/api";

type MarkerProps = {
  restaurantData: Array<any>; // Define a more specific type if you have one.
  selectedOrt: string | null;
  handleMarkerClick: Function;
  isOpen: boolean;
  infoWindowData: any; // Define a more specific type if you have one.
  closeInfoWindow: Function;
};



export const Markers = ({ restaurantData, selectedOrt, handleMarkerClick, isOpen, infoWindowData, closeInfoWindow }) => {
  restaurantData,
  selectedOrt,
  handleMarkerClick,
  isOpen,
  infoWindowData,
  closeInfoWindow,
}) => {
  return (
    <>
      {restaurantData
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
              onClick={() =>
                handleMarkerClick(
                  ind,
                  lat,
                  lng,
                  Namn,
                  Gatuadress,
                  Ort,
                  Kategori,
                  Utbud
                )
              }
            >
              {isOpen && infoWindowData?.id === ind && (
                <InfoWindow onCloseClick={() => closeInfoWindow()}>
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
    </>
  );
};


 */
