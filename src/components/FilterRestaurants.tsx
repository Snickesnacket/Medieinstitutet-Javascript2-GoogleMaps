import { Restaurant } from "../types/Restaurant.types";

export const getFilteredRestaurants = (
  restaurants: Restaurant[],
  city: string,
  category?: string,
  supply?: string
): Restaurant[] => {
  let filteredRestaurants = restaurants.filter(
    (restaurant) => restaurant.Ort === city
  );

  if (category) {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => restaurant.Kategori === category
    );
  }

  if (supply) {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => restaurant.Utbud === supply
    );
  }

  return filteredRestaurants;
};
