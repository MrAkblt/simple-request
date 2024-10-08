import { useState, useEffect } from 'react';
import requestHelpers from './macros';

export function useRequest<T = unknown>(url: string, options = {}) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await requestHelpers.get(url, options);
        setData(response.data);
      } catch (err: any) {
        console.error(err.message);
        setErrorMessage(err.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, errorMessage };
}
