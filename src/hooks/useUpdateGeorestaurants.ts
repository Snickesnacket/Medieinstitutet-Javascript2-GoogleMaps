import { doc, setDoc } from "firebase/firestore";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useSelectedValues } from "../contexts/SelectedValuesContext";
import { restuantCol } from "../services/firebase";
import { Restaurant } from "../types/Restaurant.types";
import useRestaurants from "./useGetRestaurants";

export const useFetchAndGeocodeRestaurants = () => {
  const { selectedCategory, selectedUtbud } = useSelectedValues();
  const allCityRestaurants = useRestaurants();

  const geocodeAndFetch = async (city: string): Promise<Restaurant[]> => {
    let cityRestaurants: Restaurant[] = [];

    if (allCityRestaurants && allCityRestaurants.data) {
      cityRestaurants = allCityRestaurants.data.filter(
        (restaurant) =>
          (typeof restaurant.Latitude === "undefined" ||
            typeof restaurant.Longitude === "undefined") &&
          restaurant.Ort === city &&
          restaurant.Utbud === selectedUtbud &&
          restaurant.Kategori === selectedCategory
      );
    }

    const updatePromises = cityRestaurants.map(async (restaurant) => {
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
    });

    await Promise.all(updatePromises);

    return cityRestaurants;
  };

  return geocodeAndFetch;
};
