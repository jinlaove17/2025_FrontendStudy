import apiClient from "./http-commons";
import { User } from "../types";

import { Cookies } from "react-cookie";

const userAPI = apiClient();
const cookies = new Cookies();

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
    cookies.set("accessToken", response.data.accessToken, {
      path: "/",
      maxAge: 3600,
      secure: true,
      sameSite: "strict",
    });
  } catch (error) {
    console.error(error);
  }
};

const logoutUser = () => {
  cookies.remove("accessToken", { path: "/" });
};

export { cookies, registerUser, loginUser, logoutUser };
