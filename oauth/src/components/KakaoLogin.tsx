import { useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import useUserStore from "@/stores/user";
import { setCookie } from "@/utils/cookies";

import axios from "axios";

const KakaoLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn, setNickname, setProfileImage } = useUserStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const authAPI = axios.create({
        baseURL: "https://kauth.kakao.com",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      try {
        setIsLoading(true);

        // AccessToken과 RefreshToken 가져오기
        let response = await authAPI.post("/oauth/token", {
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_KAKAO_APP_KEY,
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          code: searchParams.get("code"),
        });

        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        setCookie("accessToken", accessToken, {
          path: "/",
          maxAge: 600,
          secure: true,
          sameSite: "strict",
        });
        setCookie("refreshToken", refreshToken, {
          path: "/",
          maxAge: 3600,
          secure: true,
          sameSite: "strict",
        });

        // 내 프로필 정보 가져오기
        authAPI.defaults.baseURL = "https://kapi.kakao.com";
        authAPI.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
        response = await authAPI.get("/v2/user/me");

        const profileInfo = response.data.properties;
        setNickname(profileInfo.nickname);
        setProfileImage(profileInfo.profile_image);

        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>로딩 중입니다.</div>;
  }

  return (
    <Navigate
      to="/"
      replace
    />
  );
};

export default KakaoLogin;
