import React, { useState, useEffect } from "react";
import { useApi } from "../contexts/ApiProvider";

const useDataApi = (initalUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initalUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const api = useApi();

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    setData(initialData);

    try {
      const result = await api.get(url);
      console.log(result.data)
      setData(result.data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData()
  }, [api, url]);

  return [{ data, isLoading, isError }, setUrl, fetchData];
};

export default useDataApi;