// useDirections.ts
import { useState, useEffect } from "react";

export const useDirections = (isLoaded: boolean) => {
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (isLoaded) {
      setDirectionsService(new google.maps.DirectionsService());
      setDirectionsRenderer(new google.maps.DirectionsRenderer());
    }
  }, [isLoaded]);

  const showDirections = (
    start: google.maps.LatLngLiteral,
    end: google.maps.LatLngLiteral
  ) => {
    if (!directionsService || !directionsRenderer) return;
    const request: google.maps.DirectionsRequest = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        alert("Sorry it was not possible to find the route");
      }
    });
  };

  return {
    showDirections,
    directionsRenderer,
    directionsService,
  };
};

export default useDirections;
