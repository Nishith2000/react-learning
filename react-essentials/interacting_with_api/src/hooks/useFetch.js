import { useEffect, useState } from "react";

// functions that start with "use" are custom hooks
export function useFetch(fetchingFunc, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchingFunc();
        setFetchedData(data);
      } catch (err) {
        setError({ message: err.message || "Failed to fetch data" });
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchingFunc]);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}
