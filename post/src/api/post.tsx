import apiClient from "./http";

export const getPosts = () => {
  return apiClient.get("/posts");
};
