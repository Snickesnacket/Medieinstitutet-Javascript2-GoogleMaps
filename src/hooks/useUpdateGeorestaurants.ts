import { doc, setDoc } from "firebase/firestore";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Restaurant } from "../types/Restaurant.types";
import { restuantCol } from "../services/firebase";
import { useSelectedValues } from "../contexts/SelectedValuesContext";

export const useFetchAndGeocodeRestaurants = () => {
  const { selectedCategory, selectedUtbud } = useSelectedValues();

  const geocodeAndFetch = async (city: string, restaurants: Restaurant[]) => {
    const cityRestaurants = restaurants
      .filter(
        (restaurant) =>
          typeof restaurant.Latitude === "undefined" ||
          typeof restaurant.Longitude === "undefined"
      )
      .filter((restaurant) => restaurant.Ort === city)
      .filter((restaurant) => restaurant.Utbud === selectedUtbud)
      .filter((restaurant) => restaurant.Kategori === selectedCategory);

    const updatePromises = cityRestaurants.map(async (restaurant) => {
      if (
        typeof restaurant.Latitude === "undefined" ||
        typeof restaurant.Longitude === "undefined"
      ) {
        const restaurantLocation = await getGeocode({
          address: `${restaurant.Gatuadress}, ${restaurant.Ort}`,
        });
        const { lat, lng } = await getLatLng(restaurantLocation[0]);
        const restaurantRef = doc(restuantCol, restaurant._id);
        return setDoc(
          restaurantRef,
          { Latitude: lat, Longitude: lng },
          { merge: true }
        );
      }
    });
    await Promise.all(updatePromises);
  };

  return geocodeAndFetch;
};
