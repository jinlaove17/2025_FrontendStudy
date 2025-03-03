import { Cookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

const setCookie = (name: string, value: string, options?: CookieSetOptions) => {
  const defaultOptions: CookieSetOptions = {
    path: "/", // 기본적으로 모든 경로에서 쿠키 접근 가능
    secure: true, // HTTPS 환경에서만 전송(배포 시 필수)
    sameSite: "strict", // CSRF 방지를 위해 strict 모드 설정
    ...options,
  };

  cookies.set(name, value, defaultOptions);
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
