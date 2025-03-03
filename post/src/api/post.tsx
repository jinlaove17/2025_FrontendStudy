import toQueryString from "../utils/toQueryString";
import apiClient from "./http";

export const getPosts = (queryParam: { _limit: number; _page: number }) => {
  const queryString = toQueryString(queryParam);
  console.log(`/posts?${queryString}`);
  return apiClient.get(`/posts?${queryString}`);
};
