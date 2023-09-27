import { Restaurant } from "../types/Restaurant.types";

export const filteredRestaurants = (restaurants: Restaurant[], city: string) =>
  restaurants.filter(
    (restaurant) =>
      restaurant.Ort === city &&
      typeof restaurant.Latitude !== "undefined" &&
      typeof restaurant.Longitude !== "undefined"
  );
