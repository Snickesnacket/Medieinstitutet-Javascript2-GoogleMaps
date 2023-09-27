import { doc, setDoc } from "firebase/firestore";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Restaurant } from "../types/Restaurant.types";
import { restuantCol } from "../services/firebase";

export const fetchAndGeocodeRestaurants = async (
  city: string,
  restaurants: Restaurant[]
) => {
  const cityRestaurants = restaurants.filter((r) => r.Ort === city);

  const updatePromises = cityRestaurants.map(async (restaurant) => {
    if (
      typeof restaurant.Latitude === "undefined" ||
      typeof restaurant.Longitude === "undefined"
    ) {
      const restaurantLocation = await getGeocode({
        address: `${restaurant.Gatuadress}, ${restaurant.Ort}`,
      });
      const { lat, lng } = await getLatLng(restaurantLocation[0]);

      // Update the restaurant's data in Firebase with the newly acquired latitude and longitude
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
