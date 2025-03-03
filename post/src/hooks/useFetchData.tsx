import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const useFetchData = <T,>(
  fetchFn: () => Promise<AxiosResponse<T>>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetchFn();
        if (isMounted) {
          setData(response.data);

          // json-server의 전체 게시글 수(X-Total-Count) 저장
          const tc = response.headers["x-total-count"];
          if (tc) {
            setTotalCount(Number(tc));
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, isLoading, totalCount };
};

export default useFetchData;
