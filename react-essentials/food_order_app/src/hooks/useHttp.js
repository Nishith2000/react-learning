import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.message || "Something went wrong, failed to send request."
    );
  }
  return responseData;
}

function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(bodyReq) {
      setIsLoading(true);
      try {
        const data = await sendHttpRequest(url, { ...config, body: bodyReq });
        setData(data);
        setError();
      } catch (err) {
        setError(err.message || "Something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}

export default useHttp;
