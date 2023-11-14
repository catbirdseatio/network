import React, { useState, useEffect } from "react";
import { useApi } from "../contexts/ApiProvider";

const useDataApi = (initalUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initalUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const api = useApi();

  useEffect(() => {
    (async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await api.get(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    })();
  }, [api, url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default useDataApi;