import type { Coordinates } from "../api/types";
import { useState, useEffect } from "react";

interface GeolocationState {
  cooridnates: Coordinates | null;
  error: string | null;
  isLoaading: boolean;
}

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationState>({
    //@ts-ignore
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {
    setLocation((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocation({
        //@ts-ignore
        coordinates: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        //@ts-ignore
        coordinates: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
        error: null,
        isLoading: false,
      });
    },
      (error) => {
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }
        setLocation({
          //@ts-ignore
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...location,
    getLocation,
  };
}

