import { Restaurant } from "../types/Restaurant.types";

export const FilteredRestaurants = (
  restaurants: Restaurant[],
  city: string,
  category?: string,
  utbud?: string
): Restaurant[] => {
  const byCity = restaurants.filter((restaurant) => restaurant.Ort === city);
  console.log("Filtered by City:", byCity);

  const byCategory = category
    ? byCity.filter((restaurant) => restaurant.Kategori === category)
    : byCity;
  console.log("Filtered by Category:", byCategory);

  const byUtbud = utbud
    ? byCategory.filter((restaurant) => restaurant.Utbud === utbud)
    : byCategory;
  console.log("Filtered by Utbud:", byUtbud);

  const withLatitude = byUtbud.filter(
    (restaurant) => typeof restaurant.Latitude !== "undefined"
  );
  console.log("With Latitude:", withLatitude);

  const withLongitude = withLatitude.filter(
    (restaurant) => typeof restaurant.Longitude !== "undefined"
  );
  console.log("With Longitude:", withLongitude);

  return withLongitude;
};
