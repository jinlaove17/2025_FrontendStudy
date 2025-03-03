import toQueryString from "../utils/toQueryString";
import apiClient from "./http";

export const getPosts = (queryParam: {
  title_like?: string;
  author_like?: string;
  _limit: number;
  _page: number;
}) => {
  const queryString = toQueryString(queryParam);
  return apiClient.get(`/posts?${queryString}`);
};
