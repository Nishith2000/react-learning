import { useCallback, useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

export default function AvailablePlaces({ onSelectPlace }) {

  const fetchSortedPlaces = useCallback(async function fetchSortedPlaces() {
    const availablePlaces = await fetchAvailablePlaces();
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(
          availablePlaces,
          position.coords.latitude,
          position.coords.longitude
        );
        console.log(sortedPlaces);
        resolve(sortedPlaces);
      });
    });
  }, []);

  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <Error title="Error ocurred" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
