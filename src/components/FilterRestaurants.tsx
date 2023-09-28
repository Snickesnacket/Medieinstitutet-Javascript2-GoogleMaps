import { Restaurant } from "../types/Restaurant.types";

export const getFilteredRestaurants = (
  restaurants: Restaurant[],
  city: string,
  category?: string,
  utbud?: string
): Restaurant[] => {
  let filteredRestaurants = restaurants.filter(
    (restaurant) => restaurant.Ort === city
  );

  console.log("categori och utbud:", !!utbud, !!category);
  if (category) {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => restaurant.Kategori === category
    );
    console.log("Filtered by Category:", filteredRestaurants);
  }

  if (utbud) {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => restaurant.Utbud === utbud
    );
    console.log("Filtered by Utbud:", filteredRestaurants);
  }

  return filteredRestaurants;
};
