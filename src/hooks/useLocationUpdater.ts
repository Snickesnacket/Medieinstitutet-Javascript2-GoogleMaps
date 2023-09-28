import { getGeocode } from "use-places-autocomplete";
import { Restaurant } from "../types/Restaurant.types";

type AddressComponent = {
  long_name: string;
  types: string[];
};

type GeocodeResult = {
  address_components: AddressComponent[];
};

export const useLocationUpdater = (
  restaurants: Restaurant[],
  fetchAndGeocodeRestaurants: (
    city: string,
    restaurants: Restaurant[]
  ) => Promise<void>
): ((
  lat: number,
  lng: number
) => Promise<{ lat: number; lng: number; city: string }>) => {
  const getCityName = (addressComponents: AddressComponent[]): string => {
    let cityName = "";

    for (const component of addressComponents) {
      if (component.types.includes("locality")) {
        cityName = component.long_name;
      }
    }

    if (!cityName) {
      for (const component of addressComponents) {
        if (component.types.includes("postal_town")) {
          cityName = component.long_name;
        }
      }
    }

    return cityName;
  };

  const updateLocationAndFetchRestaurants = async (
    lat: number,
    lng: number
  ): Promise<{ lat: number; lng: number; city: string }> => {
    const results: GeocodeResult[] = await getGeocode({
      location: { lat, lng },
    });

    const cityName = getCityName(results[0].address_components);

    const newURL = `${window.location.origin}${window.location.pathname}?lat=${lat}&lng=${lng}&city=${cityName}`;
    window.history.pushState({}, "", newURL);

    if (restaurants) {
      await fetchAndGeocodeRestaurants(cityName, restaurants);
    }

    return { lat, lng, city: cityName };
  };

  return updateLocationAndFetchRestaurants;
};
