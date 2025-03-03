import apiClient from "../utils/http-commons";
import { User } from "../types";
import { removeCookie, setCookie } from "@/utils/cookies";

const userAPI = apiClient();

const registerUser = async (user: User) => {
  try {
    const response = await userAPI.post("/register", user);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const loginUser = async (user: User) => {
  try {
    const response = await userAPI.post("/login", user);
    setCookie("accessToken", response.data.accessToken, {
      path: "/",
      maxAge: 600,
      secure: true,
      sameSite: "strict",
    });
  } catch (error) {
    console.error(error);
  }
};

const logoutUser = () => {
  removeCookie("accessToken");
  removeCookie("refreshToken");
};

export { registerUser, loginUser, logoutUser };
