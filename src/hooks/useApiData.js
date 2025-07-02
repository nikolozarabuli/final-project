import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function useApiData(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiClient
      .get(endpoint)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
}

export default useApiData;