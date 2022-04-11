import useSWR from "swr";
import api from "../services/api";

export function useUser(url) {
  const { data, error, ...use } = useSWR(url, async url => {
    const response = await api(url);

    return response.data;
  });

  return { ...use, data, error };
}