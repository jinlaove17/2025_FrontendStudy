import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키 설정
const setCookie = (name: string, value: string, options?: object) => {
  cookies.set(name, value, { ...options });
};

// 쿠키 읽기
const getCookie = (name: string): string | undefined => {
  return cookies.get(name);
};

// 쿠키 삭제
const removeCookie = (name: string) => {
  cookies.remove(name);
};

export { setCookie, getCookie, removeCookie };
