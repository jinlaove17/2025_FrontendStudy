import apiClient from "./http-commons";

const dramaAPi = apiClient();

const getDramas = async () => {
  try {
    const response = await dramaAPi.get("/posts");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getDramas };
