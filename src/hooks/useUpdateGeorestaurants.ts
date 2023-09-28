import { doc, setDoc } from "firebase/firestore";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Restaurant } from "../types/Restaurant.types";
import { restuantCol } from "../services/firebase";

export const fetchAndGeocodeRestaurants = async (
  city: string,
  restaurants: Restaurant[]
) => {
 const cityRestaurants = restaurants
   .filter(
     (restaurant) =>
       typeof restaurant.Latitude === "undefined" ||
       typeof restaurant.Longitude === "undefined"
   )
   .filter((restaurant) => restaurant.Ort === city);
 console.log(cityRestaurants, city);

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
     console.log(restaurantRef);
     return setDoc(
       restaurantRef,
       { Latitude: lat, Longitude: lng },
       { merge: true }
     );
   }
 });

  await Promise.all(updatePromises);
};
