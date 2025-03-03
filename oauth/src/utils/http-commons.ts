import axios from "axios";

import { getCookie } from "./cookies";

const apiClient = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true, // 쿠키 전송 허용
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  // 요청 인터셉터 추가
  // - 쿠키가 존재할 경우, 헤더의 Authorization에 Bearer AccessToken 값 추가
  instance.interceptors.request.use(
    (config) => {
      const accessToken = getCookie("accessToken");

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      // 변경된 설정 반환
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default apiClient;
