import { Restaurant } from "../types/Restaurant.types";
export const getFilteredRestaurants = (
  restaurants: Restaurant[],
  city: string,
  category?: string,
  supply?: string
): Restaurant[] => {
  // First, filter by city
  let filteredRestaurants = restaurants.filter(
    (restaurant) => restaurant.Ort === city
  );

  // Next, filter by category if it's provided
  if (category) {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) =>
        restaurant.Kategori.trim().toLowerCase() ===
        category.trim().toLowerCase()
    );
  }

  // Then, filter by supply if it's provided
  if (supply) {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) =>
        restaurant.Utbud.trim().toLowerCase() === supply.trim().toLowerCase()
    );
  }

  // Return the filtered results
  return filteredRestaurants;
};
