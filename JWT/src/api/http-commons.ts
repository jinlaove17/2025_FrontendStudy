import axios from "axios";

const apiClient = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true, // 쿠키 전송 허용,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  return instance;
};

export default apiClient;
